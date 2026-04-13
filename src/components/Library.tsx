import React from 'react';
import { motion } from 'motion/react';
import { Book, Trash2, Clock, Search, Filter } from 'lucide-react';
import { LexiconEntry } from '../types';

export default function Library({ lexicon, onDelete }: { lexicon: LexiconEntry[], onDelete: (id: string) => void }) {
  return (
    <div className="p-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-primary mb-2">Personal Archive</p>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">Your Lexicon</h1>
        </div>
        <div className="flex space-x-4">
          <div className="bg-surface-container-low px-4 py-2 rounded-lg flex items-center space-x-3 border border-outline-variant/10">
            <Search className="text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="Search words..." 
              className="bg-transparent border-none outline-none text-sm font-body w-40"
            />
          </div>
          <button className="bg-surface-container-low p-3 rounded-lg hover:bg-surface-container-high transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {lexicon.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[40vh] bg-surface-container-low rounded-3xl border-2 border-dashed border-outline-variant/20">
          <Book className="text-on-surface-variant/20 mb-4" size={64} />
          <p className="font-headline text-xl font-bold text-on-surface-variant">Your lexicon is empty</p>
          <p className="font-body text-sm text-on-surface-variant/60 mt-2">Start building words to save them here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lexicon.map((entry) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={entry.id}
              className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline text-2xl font-extrabold text-on-surface group-hover:text-primary transition-colors">
                  {entry.word}
                </h3>
                <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant flex items-center">
                  <Clock size={10} className="mr-1" />
                  {entry.timestamp}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1">Morphology</p>
                  <p className="text-xs font-mono text-on-surface-variant bg-surface-container-high px-2 py-1 rounded inline-block">
                    {entry.morphology}
                  </p>
                </div>
                
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1">Definition</p>
                  <p className="text-sm text-on-surface leading-relaxed">
                    {entry.definition}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-end">
                <button 
                  onClick={() => onDelete(entry.id)}
                  className="text-on-surface-variant hover:text-error transition-colors p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
