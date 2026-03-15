import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ChevronLeft, 
  CheckCircle2, 
  Clock4, 
  XCircle, 
  CreditCard,
  User,
  Activity,
  ArrowRight,
  Filter
} from 'lucide-react';
import { auth, db } from './firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

interface Appointment {
  id: string;
  service: string;
  price: number;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid';
  name: string;
  createdAt: Timestamp;
}

interface DashboardProps {
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(docs);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'pending': return <Clock4 size={16} className="text-amber-500" />;
      case 'cancelled': return <XCircle size={16} className="text-rose-500" />;
      default: return <Clock4 size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cancelled': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-brand-dark/40 hover:text-brand-dark transition-colors text-sm font-bold"
            >
              <ChevronLeft size={18} />
              Back to Home
            </button>
            <h1 className="text-5xl font-bold text-brand-dark tracking-tight">
              Your <span className="text-brand-orange italic font-light">Wellness</span> Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-brand-dark/5 shadow-sm">
            {(['all', 'upcoming', 'past'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all
                  ${filter === f 
                    ? 'bg-brand-dark text-white shadow-lg' 
                    : 'text-brand-dark/40 hover:text-brand-dark'}
                `}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[32px] p-8 border border-brand-dark/5 animate-pulse h-64" />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border border-brand-dark/5 shadow-sm">
            <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar size={32} className="text-brand-orange" />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-2">No appointments yet</h3>
            <p className="text-brand-dark/40 max-w-xs mx-auto mb-8">
              Start your journey towards a healthier life by booking your first consultation.
            </p>
            <button 
              onClick={onBack}
              className="bg-brand-dark text-white px-8 py-4 rounded-full font-bold hover:bg-brand-orange transition-all"
            >
              Book Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {appointments.map((apt, i) => (
                <motion.div
                  key={apt.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[32px] p-8 border border-brand-dark/5 shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${getStatusColor(apt.status)}`}>
                      {getStatusIcon(apt.status)}
                      {apt.status}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest">Price</p>
                      <p className="text-sm font-bold text-brand-orange">Rs. {apt.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-orange transition-colors">
                    {apt.service}
                  </h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-brand-dark/60">
                      <Calendar size={16} className="text-brand-orange" />
                      <span className="text-sm font-medium">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-dark/60">
                      <Clock size={16} className="text-brand-orange" />
                      <span className="text-sm font-medium">{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-dark/60">
                      <User size={16} className="text-brand-orange" />
                      <span className="text-sm font-medium">{apt.name}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest">
                      ID: {apt.id.slice(0, 8)}
                    </span>
                    <button className="text-brand-dark/40 hover:text-brand-dark transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
