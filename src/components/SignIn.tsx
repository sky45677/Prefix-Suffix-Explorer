import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Chrome, Facebook } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function SignIn() {
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 primary-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
            <Sparkles className="text-on-primary" size={32} />
          </div>
          <h1 className="font-headline text-4xl font-black tracking-tighter mb-2">
            Morpho<span className="text-primary">Mind</span>
          </h1>
          <p className="text-on-surface-variant font-body text-sm">
            Unlock the secrets of language. Sign in to track your progress and customize your learning journey.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center space-x-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-sm font-bold uppercase tracking-widest py-4 rounded-xl border border-outline-variant/20 transition-all group"
          >
            <Chrome size={20} className="group-hover:text-primary transition-colors" />
            <span>Continue with Google</span>
          </button>

          <button 
            onClick={signInWithFacebook}
            className="w-full flex items-center justify-center space-x-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label text-sm font-bold uppercase tracking-widest py-4 rounded-xl border border-outline-variant/20 transition-all group"
          >
            <Facebook size={20} className="group-hover:text-[#1877F2] transition-colors" />
            <span>Continue with Facebook</span>
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
          <p className="text-[10px] font-label uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
            By continuing, you agree to our Academic Terms of Service
          </p>
        </div>
      </motion.div>
    </div>
  );
}
