import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, BookOpen, RefreshCw } from 'lucide-react';

const ROOTS_POOL = [
  { text: 'struct', meaning: 'to build', origin: 'Latin struere' },
  { text: 'graph', meaning: 'to write', origin: 'Greek graphein' },
  { text: 'phon', meaning: 'sound', origin: 'Greek phone' },
  { text: 'log', meaning: 'word/study', origin: 'Greek logos' },
  { text: 'spect', meaning: 'to look', origin: 'Latin specere' }
];

export default function WordTree({ onAdd }: { onAdd: (entry: any) => void }) {
  const [root, setRoot] = useState(ROOTS_POOL[0]);
  const [selectedWord, setSelectedWord] = useState<any>({
    word: 'construct',
    prefix: 'con-',
    root: 'struct',
    definition: 'To build or erect something, typically a large structure or a complex system of ideas.',
    etymology: '14th Century'
  });

  const shuffleRoot = () => {
    const next = ROOTS_POOL[Math.floor(Math.random() * ROOTS_POOL.length)];
    setRoot(next);
  };

  const handleNodeClick = (word: string, prefix: string, definition: string) => {
    setSelectedWord({
      word,
      prefix,
      root: root.text,
      definition,
      etymology: '14th Century'
    });
  };

  const handleAddLexicon = () => {
    onAdd({
      word: selectedWord.word,
      definition: selectedWord.definition,
      morphology: `${selectedWord.prefix} + ${selectedWord.root}`
    });
  };

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      {/* Main Content Area */}
      <div className="flex-1 p-10 flex flex-col relative overflow-hidden">
        {/* Asymmetric Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl">
            <span className="font-label text-xs font-bold tracking-[0.3em] text-secondary uppercase mb-2 block">Morphological Visualization</span>
            <h1 className="text-5xl font-headline font-extrabold text-on-surface tracking-tight">The <span className="text-primary italic">{root.text}</span> Lineage</h1>
            <p className="text-on-surface-variant mt-4 font-body leading-relaxed text-sm">
              From the {root.origin}, meaning "{root.meaning}." Explore how this linguistic foundation shapes modern terminology.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={shuffleRoot}
              className="p-3 bg-surface-container-high rounded-full hover:text-primary transition-all hover:rotate-180 duration-500"
            >
              <RefreshCw size={20} />
            </button>
            <div className="text-right">
              <div className="inline-flex flex-col items-end border-r-2 border-secondary pr-4">
                <span className="text-3xl font-headline font-bold text-on-surface">14</span>
                <span className="font-label text-[10px] uppercase tracking-widest opacity-50">Words Discovered</span>
              </div>
            </div>
          </div>
        </div>
        {/* ... rest of the component ... */}

        {/* Radial Tree Visualization Canvas */}
        <div className="flex-1 relative bg-surface-container-low rounded-[2rem] p-12 overflow-hidden flex items-center justify-center radial-glow border border-outline-variant/5">
          {/* Root Node */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="z-20 relative"
          >
            <div className="w-32 h-32 rounded-full bg-surface-container-highest border-2 border-primary flex flex-col items-center justify-center shadow-[0_0_40px_rgba(186,195,255,0.2)]">
              <span className="font-label text-[10px] uppercase tracking-widest text-primary mb-1">Root</span>
              <span className="font-headline font-extrabold text-2xl tracking-tighter text-on-surface">struct</span>
            </div>
            
            {/* Connection Lines (SVG) */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none -z-10 overflow-visible">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 400 300 Q 400 150 250 150" 
                fill="transparent" 
                opacity="0.4" 
                stroke="url(#grad1)" 
                strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                d="M 400 300 Q 400 450 250 450" 
                fill="transparent" 
                opacity="0.4" 
                stroke="url(#grad1)" 
                strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                d="M 400 300 Q 550 150 700 150" 
                fill="transparent" 
                opacity="0.4" 
                stroke="url(#grad1)" 
                strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                d="M 400 300 Q 550 450 700 450" 
                fill="transparent" 
                opacity="0.4" 
                stroke="url(#grad1)" 
                strokeWidth="2" 
              />
              <defs>
                <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#bac3ff', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#44ddc1', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Word Nodes */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            onClick={() => handleNodeClick('construct', 'con-', 'To build or erect something, typically a large structure or a complex system of ideas.')}
            className={`absolute top-[20%] left-[15%] group cursor-pointer transition-all duration-300 hover:scale-105 ${selectedWord.word === 'construct' ? 'scale-110 ring-2 ring-primary ring-offset-4 ring-offset-surface' : ''}`}
          >
            <div className="bg-surface-container-high p-4 rounded-xl border-l-2 border-secondary shadow-lg">
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Prefix: con-</p>
              <p className="font-headline font-bold text-lg text-on-surface">construct</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            onClick={() => handleNodeClick('destruct', 'de-', 'To cause much damage to something; to destroy.')}
            className={`absolute bottom-[20%] left-[15%] group cursor-pointer transition-all duration-300 hover:scale-105 ${selectedWord.word === 'destruct' ? 'scale-110 ring-2 ring-primary ring-offset-4 ring-offset-surface' : ''}`}
          >
            <div className="bg-surface-container-high p-4 rounded-xl border-l-2 border-secondary shadow-lg">
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Prefix: de-</p>
              <p className="font-headline font-bold text-lg text-on-surface">destruct</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            onClick={() => handleNodeClick('infrastructure', 'infra-', 'The basic physical and organizational structures and facilities needed for the operation of a society.')}
            className={`absolute top-[20%] right-[15%] group cursor-pointer transition-all duration-300 hover:scale-105 ${selectedWord.word === 'infrastructure' ? 'scale-110 ring-2 ring-primary ring-offset-4 ring-offset-surface' : ''}`}
          >
            <div className="bg-surface-container-high p-4 rounded-xl border-l-2 border-secondary shadow-lg">
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Hybrid</p>
              <p className="font-headline font-bold text-lg text-on-surface">infrastructure</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
            onClick={() => handleNodeClick('structural', '-al', 'Relating to the arrangement of and relations between the parts or elements of something complex.')}
            className={`absolute bottom-[20%] right-[15%] group cursor-pointer transition-all duration-300 hover:scale-105 ${selectedWord.word === 'structural' ? 'scale-110 ring-2 ring-primary ring-offset-4 ring-offset-surface' : ''}`}
          >
            <div className="bg-surface-container-high p-4 rounded-xl border-l-2 border-secondary shadow-lg">
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Suffix: -al</p>
              <p className="font-headline font-bold text-lg text-on-surface">structural</p>
            </div>
          </motion.div>

          {/* Floating Tooltips */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-surface-variant/60 backdrop-blur-xl border border-outline-variant/20 px-6 py-2 rounded-full">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Hover nodes to analyze linguistic components</span>
          </div>
        </div>
      </div>

      {/* Definition Side Panel */}
      <aside className="w-80 bg-surface-container p-8 border-l border-outline-variant/10 flex flex-col gap-8">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <span className="bg-primary-container/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Word</span>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <X size={18} />
            </button>
          </div>
          <div>
            <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tighter">{selectedWord.word}</h2>
            <p className="font-label text-xs italic text-secondary mt-1">verb | /kənˈstrʌkt/</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Morphology</p>
              <div className="flex gap-1">
                <span className="px-2 py-1 bg-surface-container-highest rounded text-xs font-mono text-tertiary">{selectedWord.prefix}</span>
                <span className="px-2 py-1 bg-surface-container-highest rounded text-xs font-mono text-primary font-bold">{selectedWord.root}</span>
              </div>
            </div>
            <div>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Definition</p>
              <p className="text-sm leading-relaxed text-on-surface">{selectedWord.definition}</p>
            </div>
            <div className="pt-4 space-y-3">
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Etymology Source</p>
              <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                <BookOpen className="text-tertiary" size={18} />
                <div className="text-[11px]">
                  <p className="text-on-surface font-medium">Oxford Etymology DB</p>
                  <p className="text-on-surface-variant">Accession: {selectedWord.etymology}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <button 
            onClick={handleAddLexicon}
            className="w-full py-4 border border-outline-variant/20 rounded-xl font-label text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 hover:border-primary/30 transition-all group"
          >
            <span className="group-hover:text-primary">Add to Lexicon</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
