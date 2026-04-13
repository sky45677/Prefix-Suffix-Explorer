export type Screen = 'WordBuilder' | 'Quiz' | 'WordTree' | 'Dashboard' | 'Library' | 'Settings';

export interface LexiconEntry {
  id: string;
  word: string;
  definition: string;
  morphology: string;
  timestamp: string;
}

export interface WordPart {
  id: string;
  text: string;
  meaning: string;
  type: 'prefix' | 'root' | 'suffix';
  origin?: string;
}

export interface WordBuild {
  id: string;
  word: string;
  timestamp: string;
}

export interface Student {
  id: string;
  name: string;
  initials: string;
  accuracy: number;
  lastActive: string;
  color: string;
}
