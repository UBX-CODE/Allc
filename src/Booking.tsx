import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Phone, Mail, MessageSquare, Check, CreditCard, AlertCircle } from 'lucide-react';
import { auth, db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js';

interface BookingProps {
  onBack: () => void;
}

const services = [
  { id: 'indiv', name: 'Individual Consultation', price: 5000 },
  { id: 'metab', name: 'Metabolic Health Check', price: 12000 },
  { id: 'longv', name: 'Longevity Program', price: 45000 },
  { id: 'hormn', name: 'Hormonal Optimization', price: 18000 },
];

const Booking: React.FC<BookingProps> = ({ onBack }) => {
  const [selectedDate, setSelectedDate] = useState(16);
  const [selectedTime, setSelectedTime] = useState('12:00 PM');
  const [selectedService, setSelectedService] = useState(services[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      setName(auth.currentUser.displayName || '');
      setEmail(auth.currentUser.email || '');
    }
  }, []);

  const dates = [
    { day: 'Mon', date: 15, month: 'Sep' },
    { day: 'Tue', date: 16, month: 'Sep' },
    { day: 'Wed', date: 17, month: 'Sep' },
    { day: 'Thu', date: 18, month: 'Sep' },
    { day: 'Fri', date: 19, month: 'Sep' },
    { day: 'Sat', date: 20, month: 'Sep' },
    { day: 'Sun', date: 21, month: 'Sep' },
    { day: 'Mon', date: 22, month: 'Sep' },
  ];

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
  ];

  const handleBooking = async () => {
    if (!auth.currentUser) {
      setError('Please sign in to book an appointment.');
      return;
    }

    if (!name || !phone || !email) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const appointmentData = {
        userId: auth.currentUser.uid,
        name,
        phone,
        email,
        service: selectedService.name,
        price: selectedService.price,
        date: `2026-09-${selectedDate}`,
        time: selectedTime,
        message,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      // 1. Create appointment in Firestore
      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);

      // 2. Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService.name,
          price: selectedService.price,
          appointmentData: {
            ...appointmentData,
            appointmentId: docRef.id,
            createdAt: new Date().toISOString(), // Stripe metadata only supports strings
          },
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // 3. Redirect to Stripe Checkout
      window.location.href = session.url;

    } catch (err: any) {
      console.error('Booking Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 lg:p-12 pt-32">
      <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-brand-dark/5">
        
        {/* Left Sidebar */}
        <div className="lg:w-1/3 bg-brand-dark p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <button 
              onClick={onBack}
              className="mb-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold"
            >
              <ChevronLeft size={18} />
              Back to Home
            </button>
            <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">
              Schedule <br />
              <span className="text-brand-orange italic font-light">a Tour</span>
            </h1>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Experience our state-of-the-art longevity clinic and meet our expert team.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="w-full aspect-square bg-white/5 rounded-[32px] flex items-center justify-center p-8 border border-white/10">
              <div className="relative w-full h-full">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar size={64} className="text-brand-orange opacity-80" />
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Clock size={32} className="text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full" />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 lg:p-16 space-y-12">
          
          {/* Service Selection */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Select Service</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s)}
                  className={`
                    p-4 rounded-2xl border text-left transition-all flex flex-col gap-1
                    ${selectedService.id === s.id 
                      ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                      : 'bg-white border-gray-100 text-brand-dark hover:border-brand-orange/30 hover:bg-brand-orange/5'}
                  `}
                >
                  <span className="text-xs font-bold">{s.name}</span>
                  <span className={`text-sm font-bold ${selectedService.id === s.id ? 'text-white' : 'text-brand-orange'}`}>
                    Rs. {s.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Select Date</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {dates.map((d, i) => {
                const isSelected = selectedDate === d.date;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(d.date)}
                    className={`
                      flex-shrink-0 w-20 py-4 rounded-2xl border transition-all flex flex-col items-center gap-1
                      ${isSelected 
                        ? 'bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-105' 
                        : 'bg-white border-gray-100 text-gray-400 hover:border-brand-orange/30 hover:bg-brand-orange/5'}
                    `}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest">{d.month}</span>
                    <span className="text-xl font-bold">{d.date}</span>
                    <span className="text-[10px] font-medium">{d.day}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-dark">Select Time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlots.map((time, i) => {
                const isSelected = selectedTime === time;
                const isBooked = i === 5 || i === 12; // Just for visual variety
                return (
                  <button
                    key={time}
                    disabled={isBooked}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 rounded-xl text-xs font-bold transition-all border
                      ${isBooked ? 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed' : 
                        isSelected 
                          ? 'bg-brand-orange border-brand-orange text-white shadow-md' 
                          : 'bg-white border-gray-100 text-brand-dark hover:border-brand-orange/30 hover:bg-brand-orange/5'}
                    `}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <User size={12} /> Name
              </label>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Phone size={12} /> Phone number
              </label>
              <input 
                type="tel" 
                placeholder="+91 98765 43210" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Mail size={12} /> Email
              </label>
              <input 
                type="email" 
                placeholder="example@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <MessageSquare size={12} /> Message (Optional)
              </label>
              <textarea 
                placeholder="Hi there! I'm excited to schedule a tour..." 
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-brand-orange text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand-orange/20 group disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              <>
                <CreditCard size={20} />
                Pay & Confirm Appointment
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-gray-400 font-medium">
            Secure payment powered by Stripe. Your data is protected.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Booking;

