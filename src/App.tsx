/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import { Screen, LexiconEntry } from './types';

// Lazy load screens for performance
const WordBuilder = lazy(() => import('./components/WordBuilder'));
const Quiz = lazy(() => import('./components/Quiz'));
const WordTree = lazy(() => import('./components/WordTree'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Library = lazy(() => import('./components/Library'));
const Settings = lazy(() => import('./components/Settings'));

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WordBuilder');
  const [lexicon, setLexicon] = useState<LexiconEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToLexicon = (entry: Omit<LexiconEntry, 'id' | 'timestamp'>) => {
    const newEntry: LexiconEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleDateString()
    };
    setLexicon(prev => [newEntry, ...prev]);
    showToast(`Added "${entry.word}" to Lexicon!`);
  };

  const deleteFromLexicon = (id: string) => {
    setLexicon(prev => prev.filter(entry => entry.id !== id));
    showToast('Removed from Lexicon');
  };

  const renderScreen = () => {
    return (
      <Suspense fallback={
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {(() => {
          switch (currentScreen) {
            case 'WordBuilder':
              return <WordBuilder onAdd={addToLexicon} setScreen={setCurrentScreen} />;
            case 'Quiz':
              return <Quiz onAdd={addToLexicon} />;
            case 'WordTree':
              return <WordTree onAdd={addToLexicon} />;
            case 'Dashboard':
              return <Dashboard showToast={showToast} />;
            case 'Library':
              return <Library lexicon={lexicon} onDelete={deleteFromLexicon} />;
            case 'Settings':
              return <Settings showToast={showToast} />;
            default:
              return <WordBuilder onAdd={addToLexicon} setScreen={setCurrentScreen} />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <Layout currentScreen={currentScreen} setScreen={setCurrentScreen} showToast={showToast}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="gpu-accelerated optimize-layout"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Global Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] bg-secondary text-on-secondary px-6 py-3 rounded-full shadow-2xl font-label text-xs font-bold uppercase tracking-widest"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
