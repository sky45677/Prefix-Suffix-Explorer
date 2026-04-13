import React from 'react';
import { motion } from 'motion/react';
import { 
  Bolt, 
  Flame, 
  Trophy, 
  LogOut,
  Settings
} from 'lucide-react';
import { Screen } from '../types';
import AIAssistant from './AIAssistant';
import { useAuth } from '../AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function Layout({ children, currentScreen, setScreen, showToast }: LayoutProps & { showToast: (msg: string) => void }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-low border-none h-20">
        <nav className="flex justify-between items-center px-8 h-full w-full max-w-screen-2xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-primary font-headline cursor-pointer" onClick={() => setScreen('WordBuilder')}>
            MorphoMind
          </div>
          
          <div className="hidden md:flex items-center space-x-8 h-full">
            {[
              { id: 'WordBuilder', label: 'Word Builder' },
              { id: 'Quiz', label: 'Quiz' },
              { id: 'WordTree', label: 'Word Tree' },
              { id: 'Dashboard', label: 'Dashboard' },
              { id: 'Library', label: 'Library' },
              { id: 'Settings', label: 'Settings' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setScreen(item.id as Screen)}
                className={`h-full px-2 font-label text-sm tracking-wide transition-all duration-300 relative ${
                  currentScreen === item.id 
                    ? 'text-primary font-bold' 
                    : 'text-on-surface opacity-70 hover:opacity-100 hover:text-primary'
                }`}
              >
                {item.label}
                {currentScreen === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setScreen('Dashboard')}
              className="font-label text-[10px] uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
            >
              Teacher Mode
            </button>
            
            <div className="flex items-center space-x-3 pl-6 border-l border-outline-variant/20">
              <div className="text-right hidden sm:block">
                <p className="font-label text-[10px] font-bold text-on-surface leading-none mb-1">{user?.displayName || 'Scholar'}</p>
                <button 
                  onClick={logout}
                  className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant hover:text-error transition-colors flex items-center justify-end"
                >
                  Logout <LogOut size={10} className="ml-1" />
                </button>
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30">
                <img 
                  src={user?.photoURL || "https://picsum.photos/seed/student/100/100"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-20 flex flex-col w-64 p-6 space-y-8 bg-surface-container-low h-[calc(100vh-5rem)] rounded-r-xl shadow-[32px_0_32px_rgba(229,226,225,0.06)] z-40 hidden xl:flex">
        <div>
          <h3 className="font-headline text-lg font-bold">Learning Progress</h3>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Academic Status</p>
        </div>

        <div className="space-y-4">
          <div 
            onClick={() => showToast('XP: 2,450 - Keep building words!')}
            className="flex items-center p-3 space-x-3 bg-surface-container-highest text-secondary rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors"
          >
            <Bolt size={18} fill="currentColor" />
            <span className="font-label text-xs font-bold tracking-widest uppercase">XP: 2,450</span>
          </div>
          <div 
            onClick={() => showToast('Streak: 12 Days - You are on fire!')}
            className="flex items-center p-3 space-x-3 text-on-surface opacity-60 hover:bg-surface-container-high transition-colors rounded-lg cursor-pointer"
          >
            <Flame size={18} />
            <span className="font-label text-xs font-bold tracking-widest uppercase">Streak: 12 Days</span>
          </div>
          <div 
            onClick={() => showToast('Level 8: Master - Almost at Elite!')}
            className="flex items-center p-3 space-x-3 text-on-surface opacity-60 hover:bg-surface-container-high transition-colors rounded-lg cursor-pointer"
          >
            <Trophy size={18} />
            <span className="font-label text-xs font-bold tracking-widest uppercase">Level 8: Master</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-outline-variant/15">
          <div className="glass-morphism p-4 rounded-xl">
            <p className="font-label text-[10px] uppercase tracking-widest text-primary mb-2">Daily Goal</p>
            <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-3/4"></div>
            </div>
            <p className="font-label text-[10px] text-right mt-2 text-on-surface opacity-40">75% Complete</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="xl:ml-64 pt-20 min-h-screen">
        {children}
      </main>

      {/* AI Assistant */}
      <AIAssistant context={`Current Screen: ${currentScreen}`} />

      {/* Footer */}
      <footer className="xl:ml-64 py-8 px-12 flex flex-col md:flex-row justify-between items-center bg-surface border-t border-outline-variant/15">
        <div className="font-label text-[10px] text-on-surface opacity-40 mb-4 md:mb-0">
          © 2024 MorphoMind Academic. Morphology Research Lab.
        </div>
        <div className="flex space-x-8">
          <a href="#" className="font-label text-[10px] text-on-surface opacity-40 hover:text-primary hover:opacity-100 transition-all underline">Etymology Credits</a>
          <a href="#" className="font-label text-[10px] text-on-surface opacity-40 hover:text-primary hover:opacity-100 transition-all underline">Privacy Policy</a>
          <a href="#" className="font-label text-[10px] text-on-surface opacity-40 hover:text-primary hover:opacity-100 transition-all underline">Institutional Access</a>
        </div>
      </footer>
    </div>
  );
}
