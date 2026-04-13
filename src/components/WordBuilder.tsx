import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, PlusCircle, History, BookOpen, ArrowRight, Award, RefreshCw, Loader2 } from 'lucide-react';
import { PREFIXES as STATIC_PREFIXES, ROOTS as STATIC_ROOTS, SUFFIXES as STATIC_SUFFIXES, RECENT_BUILDS } from '../constants';
import { WordPart } from '../types';
import { generateWordParts } from '../services/aiService';

export default function WordBuilder({ onAdd, setScreen }: { onAdd: (entry: any) => void, setScreen: (screen: any) => void }) {
  const [prefixes, setPrefixes] = useState<WordPart[]>(STATIC_PREFIXES);
  const [roots, setRoots] = useState<WordPart[]>(STATIC_ROOTS);
  const [suffixes, setSuffixes] = useState<WordPart[]>(STATIC_SUFFIXES);
  
  const [selectedPrefix, setSelectedPrefix] = useState<WordPart | null>(null);
  const [selectedRoot, setSelectedRoot] = useState<WordPart | null>(null);
  const [selectedSuffix, setSelectedSuffix] = useState<WordPart | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Set initial defaults
    setSelectedPrefix(prefixes[0]);
    setSelectedRoot(roots[0]);
  }, [prefixes, roots]);

  const handleShuffle = async () => {
    setIsGenerating(true);
    const newParts = await generateWordParts();
    if (newParts) {
      setPrefixes(newParts.prefixes.map((p: any, i: number) => ({ id: `p-${i}`, text: p.text, meaning: p.meaning, type: 'prefix' })));
      setRoots(newParts.roots.map((r: any, i: number) => ({ id: `r-${i}`, text: r.text, meaning: r.meaning, type: 'root' })));
      setSuffixes(newParts.suffixes.map((s: any, i: number) => ({ id: `s-${i}`, text: s.text, meaning: s.meaning, type: 'suffix' })));
    }
    setIsGenerating(false);
  };

  const currentWord = `${selectedPrefix?.text.replace('-', '') || ''}${selectedRoot?.text || ''}${selectedSuffix?.text.replace('-', '') || ''}`;

  const handleAddLexicon = () => {
    if (!currentWord) return;
    onAdd({
      word: currentWord,
      definition: `${selectedPrefix?.meaning} + ${selectedRoot?.meaning} ${selectedSuffix ? `+ ${selectedSuffix.meaning}` : ''}`,
      morphology: `${selectedPrefix?.text || ''} + ${selectedRoot?.text || ''} ${selectedSuffix ? `+ ${selectedSuffix.text}` : ''}`
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-2">Workspace / Morphology</p>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">Word Builder</h1>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={handleShuffle}
            disabled={isGenerating}
            className="bg-surface-container-low px-4 py-3 rounded-lg flex items-center space-x-3 hover:bg-surface-container-high transition-all disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="animate-spin text-secondary" size={20} /> : <RefreshCw className="text-secondary" size={20} />}
            <span className="font-label text-sm text-on-surface font-bold">Shuffle Parts</span>
          </button>
          <div className="bg-surface-container-low px-4 py-3 rounded-lg flex items-center space-x-3">
            <Lightbulb className="text-secondary" size={20} />
            <span className="font-label text-sm text-on-surface-variant italic">Combine parts to discover meanings</span>
          </div>
        </div>
      </div>

      {/* Discovery Toast */}
      {currentWord.length > 5 && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed top-24 right-8 z-50 flex items-center bg-secondary-container text-on-secondary px-6 py-4 rounded-xl shadow-xl"
        >
          <Award className="mr-3" size={24} />
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-widest leading-none">New Build!</p>
            <p className="font-headline font-bold text-lg">Word: <span className="underline">{currentWord}</span></p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Prefix Bank */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-6 px-2">Prefix Bank</h2>
          <div className="space-y-3">
            {prefixes.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedPrefix(part)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  selectedPrefix?.id === part.id 
                    ? 'bg-surface-container-highest border-l-2 border-primary' 
                    : 'bg-surface-container-low opacity-60 hover:opacity-100'
                }`}
              >
                <span className={`font-headline text-xl font-bold ${selectedPrefix?.id === part.id ? 'text-primary' : ''}`}>
                  {part.text}
                </span>
                <p className="font-label text-[10px] text-on-surface-variant mt-1">{part.meaning}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Central Builder */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full aspect-[16/9] bg-surface-container-low rounded-[2rem] flex items-center justify-center relative overflow-hidden group">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e5e2e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
            
            <div className="flex items-center space-x-2 z-10">
              {/* Active Prefix Slot */}
              <div className="w-24 h-24 border-2 border-dashed border-outline-variant/30 rounded-xl flex items-center justify-center transition-all duration-300">
                {selectedPrefix ? (
                  <motion.div 
                    layoutId="prefix"
                    key={selectedPrefix.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-surface-container-highest p-4 rounded-xl border-l-2 border-secondary shadow-lg"
                  >
                    <span className="font-headline text-2xl font-extrabold text-secondary">{selectedPrefix.text.replace('-', '')}</span>
                  </motion.div>
                ) : (
                  <span className="text-on-surface-variant/20 italic font-label text-xs">Prefix</span>
                )}
              </div>

              <div className="text-on-surface-variant/30 font-headline text-4xl font-light">+</div>

              {/* Main Root Word */}
              <div className="w-32 h-32 bg-surface-container-high rounded-xl flex items-center justify-center shadow-2xl ring-4 ring-primary/10">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={selectedRoot?.id}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="font-headline text-4xl font-extrabold text-primary"
                  >
                    {selectedRoot?.text || 'root'}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="text-on-surface-variant/30 font-headline text-4xl font-light">+</div>

              {/* Active Suffix Slot */}
              <div className="w-24 h-24 border-2 border-dashed border-outline-variant/30 rounded-xl flex items-center justify-center transition-all duration-300">
                {selectedSuffix ? (
                  <motion.div 
                    layoutId="suffix"
                    key={selectedSuffix.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-surface-container-highest p-4 rounded-xl border-r-2 border-secondary shadow-lg"
                  >
                    <span className="font-headline text-2xl font-extrabold text-secondary">{selectedSuffix.text.replace('-', '')}</span>
                  </motion.div>
                ) : (
                  <span className="text-on-surface-variant/20 italic font-label text-xs">Suffix</span>
                )}
              </div>
            </div>

            {/* Connection Lines Decoration */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2 opacity-40">
              <div className="h-1 w-8 bg-secondary rounded-full"></div>
              <div className="h-1 w-24 bg-primary rounded-full"></div>
              <div className="h-1 w-8 bg-outline-variant rounded-full"></div>
            </div>
          </div>

          {/* Dynamic Meaning Card */}
          <div className="w-full mt-8 glass-morphism p-8 rounded-2xl border-t border-primary/10">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-3">Synthesized Definition</p>
                <h3 className="font-headline text-3xl font-bold mb-4">{currentWord || '...'}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed max-w-lg">
                  {selectedPrefix?.meaning} + {selectedRoot?.meaning} {selectedSuffix ? `+ ${selectedSuffix.meaning}` : ''}
                  <br />
                  <span className="text-on-surface text-sm mt-2 block italic">
                    Linguistic analysis: This combination suggests a concept related to {selectedRoot?.meaning.toLowerCase()} {selectedPrefix?.meaning.toLowerCase()}.
                  </span>
                </p>
              </div>
              <button 
                onClick={handleAddLexicon}
                className="primary-gradient text-on-primary font-label text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-lg flex items-center space-x-2 shadow-lg shadow-primary/20 transition-transform active:scale-95"
              >
                <span>Add to Lexicon</span>
                <PlusCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Suffix Bank */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-6 px-2 text-right">Suffix Bank</h2>
          <div className="space-y-3">
            {suffixes.map((part) => (
              <button
                key={part.id}
                onClick={() => setSelectedSuffix(selectedSuffix?.id === part.id ? null : part)}
                className={`w-full text-right p-4 rounded-xl transition-all duration-200 ${
                  selectedSuffix?.id === part.id 
                    ? 'bg-surface-container-highest border-r-2 border-primary' 
                    : 'bg-surface-container-low opacity-60 hover:opacity-100'
                }`}
              >
                <span className={`font-headline text-xl font-bold ${selectedSuffix?.id === part.id ? 'text-primary' : ''}`}>
                  {part.text}
                </span>
                <p className="font-label text-[10px] text-on-surface-variant mt-1">{part.meaning}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Bento Grid */}
      <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <History className="text-primary mb-4" size={24} />
            <h4 className="font-headline text-lg font-bold mb-2">Recent Builds</h4>
            <ul className="space-y-2">
              {RECENT_BUILDS.map((build) => (
                <li key={build.id} className="font-label text-sm text-on-surface-variant flex justify-between">
                  <span>{build.word}</span>
                  <span className="text-xs opacity-40">{build.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-2xl col-span-1 md:col-span-2 relative overflow-hidden group">
          <div className="flex items-center h-full relative z-10">
            <div className="flex-1">
              <h4 className="font-headline text-lg font-bold mb-2">Word Part Encyclopedia</h4>
              <p className="font-body text-sm text-on-surface-variant max-w-md">Mastered 142 Greek and Latin roots. Continue your journey into "Bio-" related clusters to level up.</p>
              <button 
                onClick={() => setScreen('Library')}
                className="mt-4 font-label text-xs font-bold text-secondary tracking-widest uppercase flex items-center hover:translate-x-2 transition-transform"
              >
                Open Library <ArrowRight className="ml-2" size={14} />
              </button>
            </div>
            <div className="hidden sm:block w-32 h-32 rounded-xl overflow-hidden opacity-40 grayscale group-hover:grayscale-0 transition-all">
              <img 
                src="https://picsum.photos/seed/encyclopedia/200/200" 
                alt="Encyclopedia" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03]">
            <BookOpen size={160} />
          </div>
        </div>
      </div>
    </div>
  );
}
