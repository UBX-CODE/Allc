/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Star, 
  ChevronRight, 
  ArrowUpRight, 
  Plus, 
  Minus,
  CheckCircle2,
  Heart,
  Stethoscope,
  Activity,
  UserCircle,
  Mail,
  Play,
  User as UserIcon,
  Home,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Users,
  Briefcase,
  Utensils,
  Clock,
  Info,
  Tag,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Booking from './Booking';
import DoctorProfile from './DoctorProfile';
import Dashboard from './Dashboard';
import Auth from './components/Auth';
import { auth } from './firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import docImg from './doc.png';

// --- Components ---

const Navbar = ({ onBook, user, onAuth, onSignOut, onDashboard }: { onBook: () => void, user: User | null, onAuth: () => void, onSignOut: () => void, onDashboard: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Success Stories', href: '#testimonials' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-sm py-6 border-b border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-dark tracking-tight font-sans flex items-center gap-1">
              ALLC<span className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1"></span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-sm font-semibold text-brand-dark/70 hover:text-brand-dark transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange border border-brand-orange/20 overflow-hidden"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={20} />
                  )}
                </motion.button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      className="absolute right-0 mt-4 w-64 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 ring-1 ring-black/5"
                    >
                      <div className="mb-6 pb-6 border-b border-gray-50 text-left">
                        <p className="font-bold text-brand-dark truncate">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          onDashboard();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 text-sm font-bold text-brand-dark hover:text-brand-orange transition-colors mb-4"
                      >
                        <Activity size={18} />
                        My Appointments
                      </motion.button>
                      <motion.button 
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          onSignOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAuth}
                className="bg-transparent border border-brand-dark text-brand-dark px-8 py-2.5 rounded-full text-sm font-bold hover:bg-brand-dark hover:text-white transition-all shadow-sm"
              >
                Sign In
              </motion.button>
            )}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 border border-brand-dark rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white cursor-pointer transition-all shadow-sm"
            >
              <Mail size={18} />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-dark">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="lg:hidden absolute top-24 left-6 right-6 bg-white rounded-[32px] p-8 shadow-2xl space-y-6 border border-gray-100"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileTap={{ x: 5 }}
                className="block text-xl font-bold text-brand-dark hover:text-brand-orange transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBook}
              className="w-full bg-brand-orange text-white px-6 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20"
            >
              Book Appointment
              <ArrowUpRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBook, onViewServices }: { onBook: () => void, onViewServices: () => void }) => {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-20 overflow-hidden bg-brand-bg">
      {/* Background Heartbeat Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
          <path 
            d="M0 400L100 400L120 350L140 450L160 400L400 400L420 300L440 500L460 400L800 400L820 320L840 480L860 400L1100 400L1120 380L1140 420L1160 400L1440 400" 
            stroke="#FF7A3D" 
            strokeWidth="2"
            strokeDasharray="10 10"
          />
        </svg>
      </div>

      {/* Decorative Orbs - Mobile & Desktop */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-[40%] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-10%] w-[30%] h-[30%] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-8 items-center">
          
          {/* Left Column (Desktop Only) */}
          <div className="hidden lg:flex flex-col gap-16">
            <div className="space-y-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-brand-bg overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Patient" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-brand-bg bg-brand-orange flex items-center justify-center text-white text-xs font-bold">
                  +2k
                </div>
              </div>
              <p className="text-sm font-bold text-brand-dark">Happy Patients</p>
            </div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white p-6 rounded-[32px] shadow-xl max-w-[240px] border border-brand-dark/5"
            >
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange mb-4">
                <Activity size={20} />
              </div>
              <h4 className="font-bold text-brand-dark mb-2">Metabolic Wellness</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Optimizing hormonal health through evidence-based lifestyle interventions.</p>
            </motion.div>
          </div>

          {/* Center Column (Responsive) */}
          <div className="text-center space-y-8 lg:space-y-12 relative py-10 lg:py-0">
            {/* Mobile Floating Badges */}
            <div className="lg:hidden absolute -top-1 left-1/2 -translate-x-1/2 whitespace-nowrap">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="flex -space-x-3 mb-2"
               >
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-sm">
                     <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="Patient" className="w-full h-full object-cover" />
                   </div>
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-orange flex items-center justify-center text-white text-[8px] font-bold shadow-sm">
                   +2k
                 </div>
               </motion.div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/10 rounded-full text-brand-orange text-[10px] lg:text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
              Elegant mission to wellness
            </div>

            <div className="relative">
              <h1 className="text-5xl sm:text-7xl lg:text-[84px] font-serif text-brand-dark leading-[1.1] lg:leading-[1] tracking-tight">
                Transform your <br className="lg:hidden" />
                <span className="italic font-normal text-brand-orange">health</span> <br />
                with precision medicine
              </h1>
              
              {/* Mobile Only Experience Badge */}
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 12 }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
                className="lg:hidden absolute -top-6 -right-4 w-14 h-14 bg-[#F4FF99] rounded-full flex flex-col items-center justify-center text-brand-dark shadow-xl border-2 border-white z-10"
              >
                <span className="text-xs font-bold leading-tight">15+</span>
                <span className="text-[5px] font-black uppercase text-center px-1">Years</span>
              </motion.div>
            </div>

            <p className="text-base lg:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed px-4 lg:px-0">
              Personalised, Clinical, Evidence Based Wellness For Long Term Vitality. Join us on a journey to optimal health.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 lg:px-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBook}
                className="w-full sm:w-auto bg-brand-dark text-white px-10 py-4 lg:py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-all shadow-lg shadow-brand-dark/10"
              >
                Book Appointment
                <ArrowUpRight size={20} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onViewServices}    
                className="w-full sm:w-auto bg-white text-brand-dark px-10 py-4 lg:py-4 rounded-full font-bold border border-brand-dark/10 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                Explore Services
              </motion.button>
            </div>
          </div>

          {/* Right Column (Desktop Only) */}
          <div className="hidden lg:flex flex-col items-end gap-16">
            <div className="w-64 aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl rotate-3 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600" 
                className="w-full h-full object-cover" 
                alt="Exercise" 
              />
            </div>

            <div className="relative">
              <div className="w-32 h-32 bg-[#F4FF99] rounded-full flex flex-col items-center justify-center text-brand-dark shadow-xl border-4 border-white rotate-12">
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center text-white">
                  <ArrowUpRight size={18} />
                </div>
                <span className="text-3xl font-bold">15+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4">Years of Experience</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const About = ({ onBook, onKnowMore }: { onBook: () => void, onKnowMore: () => void }) => {
  return (
    <section id="about" className="py-24 bg-brand-bg relative overflow-hidden border-t border-brand-dark/5">
      {/* Background Decorative Elements - Mobile and Desktop */}
      <div className="lg:hidden absolute top-0 right-[-10%] w-[50%] h-[30%] bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="lg:hidden absolute bottom-20 left-[-10%] w-[40%] h-[30%] bg-brand-dark/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative py-12 lg:py-0">
              {/* Professional Background Elements - Mobile Only */}
              <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[320px] h-[320px] bg-brand-orange/[0.03] rounded-full border border-brand-orange/10" />
                <div className="absolute w-[240px] h-[240px] bg-brand-dark/[0.02] rounded-full translate-x-10 -translate-y-10" />
              </div>

              {/* Professional Status Badge for Mobile */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:hidden absolute top-4 right-0 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-brand-dark/5 flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-dark leading-none">Evidence Based</p>
                  <p className="text-[8px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Clinical Care</p>
                </div>
              </motion.div>

              <div className="relative z-10 rounded-full lg:rounded-[40px] overflow-hidden shadow-2xl aspect-square lg:aspect-[4/5] w-56 h-56 lg:w-[440px] lg:h-auto mx-auto border-4 border-white lg:border-0">
                <img 
                  src={docImg} 
                  alt="Dr. Divya Gautam" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Mobile Expertise Badge */}
              <div className="lg:hidden absolute -top-4 left-6 w-20 h-20 bg-brand-dark rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 border-white z-20">
                <Stethoscope size={20} className="text-brand-orange mb-1" />
                <span className="text-[8px] font-black uppercase tracking-tighter">Medical</span>
                <span className="text-[8px] font-black uppercase tracking-tighter text-brand-orange">Expert</span>
              </div>
            </div>

            {/* Qualifications Card */}
            <div className="relative lg:absolute mt-8 lg:mt-0 lg:-bottom-10 lg:-right-10 bg-brand-orange text-white p-6 lg:p-8 rounded-[32px] shadow-xl w-[240px] lg:max-w-[280px] z-20 mx-auto lg:mx-0">
              <h4 className="font-bold text-base lg:text-lg mb-3 lg:mb-4">Qualifications</h4>
              <ul className="text-[10px] lg:text-[10px] space-y-1.5 lg:space-y-2 text-white/90 font-medium">
                <li>• MBBS</li>
                <li>• Diploma in Obstetrics & Gynaecology (D.G.O)</li>
                <li>• PGDLM, CMC Vellore</li>
                <li>• Cert. Nutrition & Fitness, INFS</li>
                <li>• Cert. Exercise Science, INFS</li>
                <li>• Cert. Pregnancy & Postpartum Nutrition, INFS</li>
              </ul>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">About Dr. Divya Gautam</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-8 leading-tight">
              A Holistic Approach to <br />
              <span className="italic font-light text-brand-orange">Lifestyle</span> Medicine
            </h2>
            <p className="text-gray-500 text-base lg:text-lg mb-8 leading-relaxed px-2 lg:px-0">
              Dr. Divya started her journey in 2010 and gained a profound clinical insight into the way the human body works, heals, and adapts to disease. Along with conventional medical practices, she had been passionate about the holistic management of lifestyle diseases.
            </p>
            <p className="text-gray-500 text-base lg:text-lg mb-8 leading-relaxed px-2 lg:px-0">
              She follows an evidence-based, systematic, and scientific approach to the curative and preventive aspects of lifestyle diseases. She has been supporting and guiding people in reversing lifestyle diseases, optimizing metabolic and hormonal wellness, and embracing healthy habits that safeguard their future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 px-4 lg:px-0">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBook}
                className="w-full sm:w-auto bg-brand-dark text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-all shadow-lg shadow-brand-dark/10"
              >
                Book Appointment
                <ArrowUpRight size={20} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onKnowMore}
                className="w-full sm:w-auto border border-gray-200 text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-sm"
              >
                Get to Know More
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChoose = () => {
  const points = [
    {
      title: "Root Cause Focus",
      desc: "Our approach is grounded in evidence-based lifestyle medicine, focused on identifying and correcting the root cause of disease rather than offering temporary fixes.",
      icon: <Activity size={24} />
    },
    {
      title: "Proven Results",
      desc: "Lifestyle Medicine has a proven history of delivering meaningful results across individuals and communities for long-term health promotion.",
      icon: <CheckCircle2 size={24} />
    },
    {
      title: "Holistic Well-being",
      desc: "We integrate physical, mental, social, spiritual, and environmental well-being, recognising true longevity is shaped by more than medical reports.",
      icon: <Heart size={24} />
    },
    {
      title: "Practical & Sustainable",
      desc: "We follow core principles like role modelling and behaviour change, ensuring every plan is practical, sustainable, and suited to real life.",
      icon: <UserCircle size={24} />
    }
  ];

  return (
    <section id="why-choose" className="py-24 bg-brand-bg overflow-hidden border-t border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-8 leading-tight">
              Why Choose <span className="italic font-light">Asian Lifestyle</span> Longevity Clinic
            </h2>
            <div className="space-y-6 text-gray-500 text-lg leading-relaxed mb-10">
              <p>
                At Asian Lifestyle Longevity Clinic, care goes beyond symptom management. Our approach is grounded in evidence-based lifestyle medicine, focused on identifying and correcting the root cause of disease rather than offering temporary fixes.
              </p>
              <p>
                Lifestyle Medicine has a proven history of delivering meaningful results not only at an individual level, but also across communities making it one of the most effective models for disease prevention and long-term health promotion.
              </p>
              <p className="font-medium text-brand-dark">
                Our goal is to shape lives that are not just longer, but disease-free, drug-free, jubilant, and full of vitality and vigour.
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-dark text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-brand-orange transition-all shadow-lg shadow-brand-dark/10"
            >
              Start Your Journey
              <ArrowUpRight size={20} />
            </motion.button>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {points.map((point, i) => (
              <div 
                key={i} 
                className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] shadow-sm border border-brand-dark/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                  {point.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-dark mb-3 leading-tight">{point.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AppointmentCTA = ({ onBook }: { onBook: () => void }) => {
  return (
    <section id="appointment" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
        <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-6 block">Ready to Transform?</span>
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-12 leading-tight">
          For Appointment <span className="italic font-light">Booking</span>
        </h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBook}
          className="bg-white text-brand-dark px-1 py-1 rounded-full flex items-center gap-6 pr-1 mx-auto shadow-2xl shadow-brand-orange/20"
        >
          <span className="pl-6 md:pl-8 font-bold text-base md:text-lg">Book Appointment Now</span>
          <div className="bg-brand-orange p-4 rounded-full text-white">
            <ArrowUpRight size={32} />
          </div>
        </motion.button>
      </div>
    </section>
  );
};

const Services = ({ onBook }: { onBook: () => void }) => {
  const services = [
    {
      title: 'Individual Consultation',
      desc: 'Expert guidance tailored to meet your unique metabolic and hormonal health needs.',
      icon: <UserIcon size={24} />,
      color: 'bg-brand-dark',
      lightColor: 'bg-brand-dark/5'
    },
    {
      title: 'Long-Term Wellness',
      desc: 'Sustained evidence-based plans for long-term vitality and disease prevention.',
      icon: <Activity size={24} />,
      color: 'bg-brand-orange',
      lightColor: 'bg-brand-orange/10'
    },
    {
      title: 'Couple Plans',
      desc: 'Synchronized wellness strategies perfectly balanced for partners and couples.',
      icon: <Heart size={24} />,
      color: 'bg-brand-dark',
      lightColor: 'bg-brand-dark/5'
    },
    {
      title: 'Family Plans',
      desc: 'Comprehensive clinical care designed to enhance the lives of your entire family.',
      icon: <Home size={24} />,
      color: 'bg-brand-orange',
      lightColor: 'bg-brand-orange/10'
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">
            Our <span className="relative inline-block">
              Services
              <span className="absolute inset-x-0 bottom-2 h-4 bg-brand-orange/10 -z-10 rounded-lg"></span>
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Our mission is to drive progress and enhance the lives of our patients by delivering 
            superior clinical services that exceed expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 px-4 md:px-0">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-dark/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group flex flex-col items-center text-center">
              <div className={`w-14 h-14 ${service.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4 leading-tight">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBook}
          className="bg-brand-orange text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 mx-auto transition-all shadow-lg shadow-brand-orange/20"
        >
          Hire Us Today
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </section>
  );
};

const Pricing = ({ onBook }: { onBook: () => void }) => {
  const pricingCategories = [
    {
      title: "Individual Consultation",
      icon: <UserIcon size={24} />,
      plans: [
        { service: "Individual Consultation", desc: "Mode: Online / Offline", duration: "60 min", price: "Rs. 5,000" }
      ]
    },
    {
      title: "Family Consultation Plans",
      icon: <Users size={24} />,
      plans: [
        { service: "Single Family Consultation", desc: "Mode: Online / Offline", duration: "60 min", price: "Rs. 15,000" }
      ],
      note: "Family Plans Are Customizable As Per Individual And Collective Family Needs, Goals, And Health Priorities."
    }
  ];

  const longTermPlans = [
    { duration: "3 MONTH", price: "Rs. 20,000" },
    { duration: "6 MONTH", price: "Rs. 35,000", original: "Rs. 40,000" },
    { duration: "12 MONTH", price: "Rs. 50,000", original: "Rs. 80,000" }
  ];

  const couplePlans = [
    { duration: "3 MONTH", price: "Rs. 30,000" },
    { duration: "6 MONTH", price: "Rs. 52,500" },
    { duration: "12 MONTH", price: "Rs. 75,000" }
  ];

  return (
    <section id="pricing" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">
            Investment in Longevity
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">
            Our <span className="italic font-light">Pricing</span> Plans
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Choose a plan that best fits your journey towards optimal health and sustainable longevity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {pricingCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="bg-brand-bg rounded-3xl md:rounded-[40px] p-6 md:p-10 border border-brand-dark/5 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-brand-dark">{cat.title}</h3>
              </div>
              <div className="space-y-6 flex-grow">
                {cat.plans.map((plan, pIdx) => (
                  <div key={pIdx} className="bg-white rounded-3xl p-6 shadow-sm border border-brand-dark/5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-brand-dark mb-1">{plan.service}</h4>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{plan.desc}</p>
                      </div>
                      <span className="text-xl font-bold text-brand-orange">{plan.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{plan.duration}</span>
                    </div>
                  </div>
                ))}
                {cat.note && (
                  <div className="flex gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-brand-orange/10">
                    <Info size={18} className="text-brand-orange shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-500 leading-relaxed italic">{cat.note}</p>
                  </div>
                )}
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBook}
                className="mt-8 w-full bg-brand-dark text-white py-4 rounded-full font-bold hover:bg-brand-orange transition-all flex items-center justify-center gap-2 group shadow-lg shadow-brand-dark/10"
              >
                Book Consultation
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </div>
          ))}
        </div>

        {/* Long-Term & Couple Plans */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Long Term Wellness */}
          <div className="bg-brand-dark rounded-[40px] p-10 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-orange">
                <Activity size={24} />
              </div>
              <h3 className="text-2xl font-bold">Long-Term Wellness Plans</h3>
            </div>
            <p className="text-white/60 text-sm mb-8">Individual plans focused on sustainable lifestyle and structured guidance.</p>
            <div className="space-y-4">
              {longTermPlans.map((plan, idx) => (
                <div key={idx} className="bg-white/5 rounded-3xl p-6 border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-1 block">{plan.duration}</span>
                    <h4 className="font-bold">Individual Wellness</h4>
                  </div>
                  <div className="text-right">
                    {plan.original && (
                      <span className="block text-xs text-white/40 line-through mb-1">{plan.original}</span>
                    )}
                    <span className="text-xl font-bold text-brand-orange">{plan.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBook}
              className="mt-8 w-full bg-brand-orange text-white py-4 rounded-full font-bold hover:bg-white hover:text-brand-dark transition-all shadow-lg shadow-brand-orange/20"
            >
              Get Started
            </motion.button>
          </div>

          {/* Couple Consultation */}
          <div className="bg-brand-bg rounded-[40px] p-10 border border-brand-dark/5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark">Couple Consultation Plans</h3>
            </div>
            <p className="text-gray-500 text-sm mb-8">Synchronized wellness strategies for partners and couples.</p>
            <div className="space-y-4">
              {couplePlans.map((plan, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-brand-dark/5 shadow-sm flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-1 block">{plan.duration}</span>
                    <h4 className="font-bold text-brand-dark">Couple Wellness</h4>
                  </div>
                  <span className="text-xl font-bold text-brand-orange">{plan.price}</span>
                </div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBook}
              className="mt-8 w-full bg-brand-dark text-white py-4 rounded-full font-bold hover:bg-brand-orange transition-all shadow-lg shadow-brand-dark/10"
            >
              Book Couple Plan
            </motion.button>
          </div>
        </div>

        {/* Specialized Programs */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Corporate Wellness",
              icon: <Briefcase size={20} />,
              price: "Customized",
              desc: "Monthly / Quarterly / Yearly programs tailored for corporate teams."
            },
            {
              title: "Group Consultation",
              icon: <Users size={20} />,
              price: "₹999 / Person",
              desc: "Ideal for group wellness sessions and educational workshops."
            },
            {
              title: "Culinary Workshops",
              icon: <Utensils size={20} />,
              price: "₹999 / Person",
              desc: "Learn the art of healthy cooking for sustainable longevity."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-[32px] border border-brand-dark/5 shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-dark mx-auto mb-6">
                {item.icon}
              </div>
              <h4 className="font-bold text-brand-dark mb-2">{item.title}</h4>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">{item.desc}</p>
              <div className="text-brand-orange font-bold">{item.price}</div>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-brand-bg rounded-[40px] p-12 border border-brand-dark/5">
          <div className="flex items-center gap-3 mb-8">
            <Tag size={20} className="text-brand-orange" />
            <h3 className="text-xl font-bold text-brand-dark">Important Notes</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "All Plans Are Designed To Support Sustainable Lifestyle And Longevity Goals.",
              "Long-Term Plans Include Structured Guidance, Follow-Ups, And Personalised Support.",
              "Prices Are Inclusive Of Consultation Time And Expert Guidance.",
              "Advance Booking Is Recommended For All Sessions."
            ].map((note, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange text-[10px] font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ item: any }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const isLong = item.text.length > maxLength;

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[32px] text-left shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h4 className="font-bold text-brand-dark">{item.name}</h4>
          <div className="flex gap-0.5 text-brand-dark">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <p className="text-brand-dark font-medium mb-4 leading-relaxed">
          {isExpanded || !isLong ? item.text : `${item.text.substring(0, maxLength)}...`}
        </p>
        {isLong && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-brand-orange text-xs font-bold mb-6 hover:underline uppercase tracking-widest"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
      <span className="text-gray-400 text-sm">{item.role}</span>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ms. Madhusmita',
      role: 'Age 43',
      text: '“I found Dr. Divya Gautam while searching online for a good gynaecologist in Jaipur, as I had been struggling with vaginal health issues for such a long time. From the very first visit, she made me feel comfortable and heard. She is extremely friendly, patient, and explains everything in detail. Her treatment and guidance helped me a lot, and she also advised me on important selfcare practices that I was not aware of earlier. She listened to every concern of mine and handled my case with great care. I Highly recommend her. All thanks and credit to Dr. Divya Gautam for her excellent and compassionate approach.”',
      rating: 5
    },
    {
      name: 'Mrs. Manisha Sharma',
      role: 'Age 41',
      text: '“I approached Dr. Divya as we were neighbours living in the same locality. At that time, I was struggling with obesity and experiencing severe throat pain—it constantly felt as if someone was holding my throat, making it difficult for me to speak. I had been advised by others to undergo surgery and was already taking multiple medications. Dr. Divya suggested detailed and appropriate investigations instead of immediately opting for surgery or increasing medications. Through her thorough evaluation, I was diagnosed with hypothyroidism, Hashimoto’s disease, and high antibiotic levels in my blood work. With her personalised lifestyle-based approach and guidance, I have successfully reduced my weight, my throat pain has completely resolved, and my medications have been reduced to almost none. Today, I feel healthier, happier, and extremely satisfied with my treatment.I am truly grateful to Dr. Divya for addressing the root cause of my condition rather than just the symptoms.”',
      rating: 5
    },
    {
      name: 'Ms. Akansha Sharma',
      role: 'Age 18',
      text: '“When I approached Dr. Divya, I was just 16 years old and constantly unwell. I was experiencing extreme fatigue, abdominal and stomach pain, anaemia, weight gain, very low stamina, and felt tired and depressed most of the time. I was also suffering from breast discharge (galactorrhoea), which was physically and emotionally distressing. Dr. Divya advised detailed investigations, which revealed severe lipidaemia and underlying inflammation. Instead of relying only on medications, she focused on identifying the root cause and guided me through simple but effective lifestyle changes. Deworming and inflammation-reducing strategies were also included as part of my treatment. What made a huge difference was how easy and practical the lifestyle changes were. Dr. Divya’s frequent and thoughtful follow-ups helped me stay consistent and confident. Over time, my medications were significantly reduced, my galactorrhoea-related pain reduced greatly, my energy levels improved, and my gastritis also reduced as my anxiety and inflammation came under control. The guidance on lifestyle and stress management helped me feel calmer, healthier, and more in control of my body. I am extremely grateful to Dr. Divya for helping me heal in a holistic and sustainable way.”',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-bg relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[30%] h-[30%] bg-brand-orange/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-brand-dark mb-16">
          Success Stories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    { q: 'How does the service work?', a: 'Our platform uses AI to match you with the best medical professionals and provides personalized health insights based on your data.' },
    { q: 'Do I need a prescription or medical documents?', a: 'While not always required, having your medical history helps our doctors provide more accurate consultations.' },
    { q: 'Is my personal data safe?', a: 'Yes, we use industry-standard encryption and follow strict HIPAA guidelines to ensure your data remains private and secure.' },
    { q: 'How long does it take to get a response?', a: 'Most consultations and results are available within 24 hours, often much sooner.' },
    { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, insurance plans, and digital payment methods like Apple Pay and Google Pay.' },
    { q: 'Can I cancel or change my request?', a: 'Yes, you can manage your appointments and requests directly through your dashboard at any time.' },
    { q: 'Do you offer customer support?', a: 'Our support team is available 24/7 to help you with any questions or issues you may have.' }
  ];

  return (
    <section id="faq" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-bold text-brand-dark mb-8 leading-tight">Everything You<br />Need to Know</h2>
          <p className="text-gray-500 mb-12 max-w-sm">Find quick answers to the most frequently asked questions about our services.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-orange text-white px-1 py-1 rounded-full flex items-center gap-4 pr-1 shadow-lg shadow-brand-orange/20"
          >
            <span className="pl-6 font-bold">See all questions</span>
            <div className="bg-white p-3 rounded-full text-brand-orange">
              <ArrowUpRight size={24} />
            </div>
          </motion.button>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border-b border-gray-200"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full py-6 flex justify-between items-center text-left group transition-all"
              >
                <span className={`text-xl md:text-2xl font-medium transition-colors ${openIndex === i ? 'text-brand-dark' : 'text-gray-600 group-hover:text-brand-dark'}`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  className="text-brand-orange"
                >
                  {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-gray-500 leading-relaxed text-base md:text-lg">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-bg pt-24 pb-12 border-t border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-8">Important Links</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-brand-dark transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-brand-dark transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-dark transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-brand-dark transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-dark transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-brand-dark transition-colors">Appointment</a></li>
              <li><a href="#" className="hover:text-brand-dark transition-colors">Explore</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-8">Contact Us</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li>Contact: +91 96806 77781</li>
              <li>Email: contact@asianllc.in</li>
            </ul>
          </div>

          <div className="col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-8">Address</h4>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              Surgenesis Superspeciality Hospital B block,<br />
              187 Heeranagar, Ajmer Rd,<br />
              opposite star residency, DCM,<br />
              Jaipur, Rajasthan 302021
            </p>
            <div className="flex gap-6 text-gray-400">
              <Instagram size={20} className="hover:text-brand-dark cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-brand-dark cursor-pointer transition-colors" />
              <div className="w-5 h-5 flex items-center justify-center hover:text-brand-dark cursor-pointer transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center">
          <h1 className="text-[15vw] font-bold text-brand-dark leading-none tracking-tighter">ALLC</h1>
          <div className="w-full flex justify-between items-center mt-8 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-brand-dark">Asian Lifestyle Longevity Clinic</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-dark transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Reset scroll to top when navigation state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showBooking, showDoctorProfile, showDashboard]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setShowDashboard(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const pageTransition = {
    duration: 0.3,
    ease: "easeOut"
  };

  const fastTransition = {
    duration: 0.15,
    ease: "linear"
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-dark selection:bg-brand-orange/20 selection:text-brand-orange">
      <Navbar 
        onBook={() => setShowBooking(true)} 
        onDashboard={() => setShowDashboard(true)}
        user={user} 
        onAuth={() => setShowAuth(true)} 
        onSignOut={handleSignOut} 
      />
      
      <AnimatePresence mode="wait">
        {showDashboard ? (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Dashboard onBack={() => setShowDashboard(false)} />
            <Footer />
          </motion.div>
        ) : showBooking ? (
          <motion.div
            key="booking"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={fastTransition}
          >
            <Booking onBack={() => setShowBooking(false)} />
            <Footer />
          </motion.div>
        ) : showDoctorProfile ? (
          <motion.div
            key="profile"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <DoctorProfile 
              onBack={() => setShowDoctorProfile(false)} 
              onBook={() => {
                setShowDoctorProfile(false);
                setShowBooking(true);
              }}
              onViewServices={() => {
                setShowDoctorProfile(false);
                setTimeout(() => {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <main>
              <Hero 
                onBook={() => setShowBooking(true)} 
                onViewServices={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              />
              <About 
                onBook={() => setShowBooking(true)} 
                onKnowMore={() => setShowDoctorProfile(true)}
              />
              <WhyChoose />
              <Services onBook={() => setShowBooking(true)} />
              <Pricing onBook={() => setShowBooking(true)} />
              <Testimonials />
              <FAQ />
              <AppointmentCTA onBook={() => setShowBooking(true)} />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuth && <Auth onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />}
      </AnimatePresence>
    </div>
  );
}
