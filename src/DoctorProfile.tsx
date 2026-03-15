import React from 'react';
import { motion } from 'motion/react';
import docImg from './doc.png';
import { 
  ChevronLeft, 
  ArrowUpRight, 
  Award, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Target,
  GraduationCap,
  Calendar,
  Briefcase
} from 'lucide-react';

interface DoctorProfileProps {
  onBack: () => void;
  onBook: () => void;
  onViewServices: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ onBack, onBook, onViewServices }) => {
  return (
    <div className="min-h-screen bg-[#FFFDF9] pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button 
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-gray-400 hover:text-brand-dark transition-colors text-sm font-bold group"
        >
          <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-brand-dark transition-colors">
            <ChevronLeft size={18} />
          </div>
          Back to Home
        </motion.button>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">
          {/* Left Column: Image & Quick Info */}
          <div className="space-y-12">
            <div className="relative">
              <div className="aspect-square md:aspect-[4/5] rounded-full md:rounded-[48px] overflow-hidden shadow-2xl border-4 md:border-8 border-white w-56 h-56 md:w-[480px] md:h-auto mx-auto">
                <img 
                  src={docImg} 
                  alt="Dr. Divya Gautam" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative md:absolute mt-6 md:mt-0 md:-bottom-6 md:-right-6 bg-brand-orange text-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl w-fit mx-auto md:mx-0">
                <div className="text-2xl md:text-3xl font-bold text-center md:text-left">15+</div>
                <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-center md:text-left">Years Experience</div>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-brand-dark leading-tight">
                DR. DIVYA <span className="text-brand-orange italic font-light">GAUTAM</span>
              </h1>
              <div className="flex flex-wrap gap-2">
                {['MBBS', 'D.G.O', 'PGDLM', 'Lifestyle Medicine'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-brand-bg border border-brand-dark/5 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBook}
                  className="bg-brand-dark text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-all shadow-lg shadow-brand-dark/10"
                >
                  Book Appointment
                  <ArrowUpRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onViewServices}
                  className="bg-white text-brand-dark px-8 py-4 rounded-full font-bold border border-brand-dark/10 hover:bg-gray-50 transition-all shadow-sm"
                >
                  View Services
                </motion.button>
              </div>
            </div>

            {/* Qualifications Card */}
            <div className="bg-white p-8 rounded-[40px] border border-brand-dark/5 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">Qualifications</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "MBBS",
                  "Diploma in Obstetrics & Gynaecology (D.G.O)",
                  "Postgraduate Diploma in Lifestyle Medicine (PGDLM), CMC Vellore",
                  "Indian Society of Lifestyle Medicine (ISLM) Certified Physician",
                  "Board Certified Lifestyle Medicine Professional (IBLM)",
                  "FOGSI Member"
                ].map((item, i) => (
                  <li 
                    key={i}
                    className="flex gap-3 text-sm text-gray-500 leading-relaxed items-start"
                  >
                    <div className="w-1.5 h-1.5 bg-brand-orange rounded-full mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Detailed Content */}
          <div className="space-y-16">
            {/* About Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <BookOpen size={20} />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark">About</h2>
              </div>
              <div className="space-y-4 text-gray-500 text-lg leading-relaxed">
                <p>
                  Dr. Divya started her journey in 2010 and gained a profound clinical insight into the way the human body works, heals, and adapts to disease. Along with conventional medical practices, she had been passionate about the holistic management of lifestyle diseases.
                </p>
                <p>
                  She follows an evidence-based, systematic, and scientific approach to the curative and preventive aspects of lifestyle diseases. She has been supporting and guiding people in reversing lifestyle diseases, optimizing metabolic and hormonal wellness, and embracing healthy habits that safeguard their future.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark">Experience</h2>
              </div>
              <div className="space-y-4 text-gray-500 text-lg leading-relaxed">
                <p>
                  Dr. Divya Gautam is a Lifestyle Medicine Physician with over 15 years of clinical experience in preventive healthcare, women's health, and holistic well-being. She adopts an evidence-based, root-cause approach to health, focusing on sustainable lifestyle interventions that empower individuals and families to achieve long-term wellness.
                </p>
                <p>
                  Her practice integrates medical science, nutrition, physical activity, stress management, and behaviour change, enabling patients to prevent, manage, and reverse lifestyle-related conditions. With a special interest in women's health across life stages, Dr. Divya supports clients through metabolic health, hormonal balance, pregnancy, postpartum recovery, and overall vitality.
                </p>
                <p>
                  At ALLC, Dr. Divya combines compassionate care with structured lifestyle programs, guiding clients toward realistic, personalized, and lasting health transformations.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <Target size={20} />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark">Philosophy</h2>
              </div>
              <p className="text-gray-500 text-lg leading-relaxed italic border-l-4 border-brand-orange pl-6">
                "To Dr. Divya, healthcare does not simply involve prolonging life, but it involves improving the quality of life — Not only treating medically but also providing a holistic approach so that people can take charge and empower themselves with skills for a long, healthy, and blissful life."
              </p>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-2xl font-bold text-brand-dark">Values</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: "Accuracy", desc: "Over generic advice", icon: <Target className="text-brand-orange" size={24} /> },
                  { title: "Empathy", desc: "Over judgement", icon: <Heart className="text-brand-orange" size={24} /> },
                  { title: "Sustainability", desc: "Over short-term fixes", icon: <Award className="text-brand-orange" size={24} /> }
                ].map((value, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-brand-dark/5 shadow-sm text-center space-y-3">
                    <div className="w-12 h-12 bg-brand-bg rounded-2xl flex items-center justify-center mx-auto">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-brand-dark">{value.title}</h4>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{value.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
