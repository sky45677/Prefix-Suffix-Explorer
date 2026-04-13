/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { collection, onSnapshot, query, addDoc, deleteDoc, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import Layout from './components/Layout';
import WordBuilder from './components/WordBuilder';
import Quiz from './components/Quiz';
import WordTree from './components/WordTree';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import Settings from './components/Settings';
import SignIn from './components/SignIn';
import { AuthProvider, useAuth } from './AuthContext';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Screen, LexiconEntry } from './types';

function AppContent() {
  const { user, loading, logout } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('WordBuilder');
  const [lexicon, setLexicon] = useState<LexiconEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLexicon([]);
      return;
    }

    const lexiconRef = collection(db, 'users', user.uid, 'lexicon');
    const q = query(lexiconRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LexiconEntry[];
      setLexicon(entries);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}/lexicon`);
    });

    // Ensure user document exists
    const userRef = doc(db, 'users', user.uid);
    getDoc(userRef).then(docSnap => {
      if (!docSnap.exists()) {
        setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          stats: { xp: 0, streak: 0, level: 1 },
          quizPreferences: { defaultType: 'mcq', difficulty: 'beginner' }
        }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`));
      }
    });

    return unsubscribe;
  }, [user]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addToLexicon = async (entry: Omit<LexiconEntry, 'id' | 'timestamp'>) => {
    if (!user) return;
    
    try {
      const lexiconRef = collection(db, 'users', user.uid, 'lexicon');
      await addDoc(lexiconRef, {
        ...entry,
        timestamp: new Date().toISOString()
      });
      showToast(`Added "${entry.word}" to Lexicon!`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/lexicon`);
    }
  };

  const deleteFromLexicon = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'lexicon', id));
      showToast('Removed from Lexicon');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/lexicon/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  const renderScreen = () => {
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
  };

  return (
    <Layout currentScreen={currentScreen} setScreen={setCurrentScreen} showToast={showToast}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
