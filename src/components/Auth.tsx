import React, { useState } from 'react';
import { 
  auth, 
  db 
} from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Github, 
  Chrome,
  AlertCircle,
  X,
  CheckCircle2
} from 'lucide-react';

interface AuthProps {
  onClose: () => void;
  onSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: name });
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: name,
          role: 'user',
          createdAt: serverTimestamp()
        });
      }
      onSuccess();
    } catch (err: any) {
      console.error('Auth Error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in the Firebase Console. Please enable it in the Authentication > Sign-in method tab.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: serverTimestamp()
        });
      }
      onSuccess();
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google authentication is not enabled in the Firebase Console. Please enable it in the Authentication > Sign-in method tab.');
      } else {
        setError(err.message || 'An error occurred during Google sign-in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[40px] overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Sign in to manage your wellness journey' : 'Join us for a healthier, longer life'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-orange transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-gray-400">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full border border-gray-100 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all mb-8"
          >
            <Chrome size={20} className="text-brand-orange" />
            Google
          </button>

          <div className="text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-gray-400 hover:text-brand-orange transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
