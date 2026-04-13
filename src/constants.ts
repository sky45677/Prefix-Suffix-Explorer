import { WordPart, WordBuild, Student } from './types';

export const PREFIXES: WordPart[] = [
  { id: 'p1', text: 'trans-', meaning: 'ACROSS / BEYOND', type: 'prefix' },
  { id: 'p2', text: 'un-', meaning: 'NOT / REVERSE', type: 'prefix' },
  { id: 'p3', text: 'pre-', meaning: 'BEFORE', type: 'prefix' },
  { id: 'p4', text: 're-', meaning: 'AGAIN', type: 'prefix' },
  { id: 'p5', text: 'hypo-', meaning: 'UNDER / DEFICIENT', type: 'prefix', origin: 'Gk. hupo' },
  { id: 'p6', text: 'hyper-', meaning: 'EXCESSIVE / ABOVE', type: 'prefix', origin: 'Gk. huper' },
];

export const ROOTS: WordPart[] = [
  { id: 'r1', text: 'port', meaning: 'TO CARRY', type: 'root' },
  { id: 'r2', text: 'struct', meaning: 'TO BUILD', type: 'root' },
  { id: 'r3', text: 'bio', meaning: 'LIFE', type: 'root' },
  { id: 'r4', text: 'logy', meaning: 'STUDY OF', type: 'root' },
];

export const SUFFIXES: WordPart[] = [
  { id: 's1', text: '-able', meaning: 'CAPABLE OF', type: 'suffix' },
  { id: 's2', text: '-ation', meaning: 'PROCESS / ACTION', type: 'suffix' },
  { id: 's3', text: '-er', meaning: 'ONE WHO / THAT WHICH', type: 'suffix' },
  { id: 's4', text: '-less', meaning: 'WITHOUT', type: 'suffix' },
];

export const RECENT_BUILDS: WordBuild[] = [
  { id: 'b1', word: 'uncomfortable', timestamp: '2m ago' },
  { id: 'b2', word: 'preview', timestamp: '15m ago' },
];

export const STUDENTS: Student[] = [
  { id: '1', name: 'Avery Lawson', initials: 'AL', accuracy: 88.4, lastActive: '2m ago', color: 'bg-primary-container/20 text-primary' },
  { id: '2', name: 'Blake Moretti', initials: 'BM', accuracy: 74.1, lastActive: '1h ago', color: 'bg-secondary-container/20 text-secondary' },
  { id: '3', name: 'Casey Chen', initials: 'CC', accuracy: 96.8, lastActive: 'Just now', color: 'bg-primary-container/20 text-primary' },
  { id: '4', name: 'Dakota Smith', initials: 'DS', accuracy: 61.2, lastActive: '3d ago', color: 'bg-surface-container-highest text-outline' },
];
