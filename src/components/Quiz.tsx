import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Lightbulb, 
  Brain, 
  ArrowLeft, 
  ArrowRight,
  RefreshCw,
  Loader2,
  HelpCircle,
  Check,
  X as CloseIcon
} from 'lucide-react';
import { generateQuizQuestion } from '../services/aiService';

interface QuizQuestion {
  question: string;
  options: { id: string; text: string; origin?: string }[];
  correctAnswer: string;
  explanation: string;
  example: string;
  type: 'mcq' | 'fill' | 'boolean';
}

export default function Quiz({ onAdd }: { onAdd: (entry: any) => void }) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizType, setQuizType] = useState<'mcq' | 'fill' | 'boolean'>('mcq');

  const fetchNewQuestion = async (type: 'mcq' | 'fill' | 'boolean' = quizType) => {
    setIsGenerating(true);
    setIsAnswered(false);
    setSelectedOption(null);
    const newQ = await generateQuizQuestion(type);
    if (newQ) {
      setQuestion(newQ);
    }
    setIsGenerating(false);
  };

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const handleOptionSelect = (id: string) => {
    if (isAnswered) return;
    setSelectedOption(id);
    setIsAnswered(true);
  };

  const handleSaveForReview = () => {
    if (!question) return;
    onAdd({
      word: `Review: ${question.question.substring(0, 20)}...`,
      definition: `Question: ${question.question}\nCorrect Answer: ${question.correctAnswer}\nExplanation: ${question.explanation}`,
      morphology: 'Quiz Review'
    });
  };

  if (isGenerating && !question) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="font-label text-sm uppercase tracking-widest text-on-surface-variant">Generating Linguistic Challenge...</p>
      </div>
    );
  }

  return (
    <div className="p-12 max-w-5xl mx-auto">
      {/* Quiz Type Selector */}
      <div className="flex justify-center space-x-4 mb-12">
        {(['mcq', 'fill', 'boolean'] as const).map((type) => (
          <button
            key={type}
            onClick={() => {
              setQuizType(type);
              fetchNewQuestion(type);
            }}
            className={`px-6 py-2 rounded-full font-label text-[10px] font-bold uppercase tracking-widest border transition-all ${
              quizType === type 
                ? 'bg-primary text-on-primary border-primary' 
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/20 hover:border-primary/50'
            }`}
          >
            {type === 'mcq' ? 'Multiple Choice' : type === 'fill' ? 'Fill in Blank' : 'True / False'}
          </button>
        ))}
      </div>

      {/* Question Header */}
      <AnimatePresence mode="wait">
        {question && (
          <motion.section 
            key={question.question}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-tertiary-container/30 text-tertiary px-3 py-1 rounded-full font-label text-[10px] font-bold uppercase tracking-widest border border-tertiary/20">Active Session</span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest">Morphology Module</span>
            </div>
            <h1 className="text-on-surface font-headline text-4xl font-extrabold tracking-tight mb-4">
              {question.question}
            </h1>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {question?.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={isAnswered}
            className={`flex items-center p-6 rounded-xl border-l-2 transition-all group text-left relative ${
              selectedOption === option.id 
                ? (option.id === question.correctAnswer ? 'bg-secondary/10 border-secondary' : 'bg-error/10 border-error') 
                : (isAnswered && option.id === question.correctAnswer ? 'bg-secondary/5 border-secondary/50' : 'bg-surface-container-low border-transparent hover:bg-surface-container-high')
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-headline font-bold mr-4 transition-colors ${
              selectedOption === option.id 
                ? (option.id === question.correctAnswer ? 'bg-secondary text-on-secondary' : 'bg-error text-on-error') 
                : 'bg-surface-container-highest text-primary group-hover:bg-primary group-hover:text-on-primary'
            }`}>
              {option.id}
            </div>
            <div>
              <div className={`font-body text-on-surface ${selectedOption === option.id ? 'font-bold' : 'font-medium'}`}>
                {option.text}
              </div>
              {option.origin && (
                <div className={`font-label text-[10px] uppercase tracking-widest mt-1 ${
                  selectedOption === option.id ? 'text-secondary font-bold' : 'opacity-40'
                }`}>
                  {option.origin}
                </div>
              )}
            </div>
            {isAnswered && option.id === question.correctAnswer && (
              <CheckCircle2 className="ml-auto text-secondary" size={20} />
            )}
            {isAnswered && selectedOption === option.id && option.id !== question.correctAnswer && (
              <CloseIcon className="ml-auto text-error" size={20} />
            )}
          </button>
        ))}
      </div>

      {/* AI Feedback Section */}
      <AnimatePresence>
        {isAnswered && question && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel border-l-2 rounded-xl p-8 mb-8 ${selectedOption === question.correctAnswer ? 'border-secondary' : 'border-error'}`}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedOption === question.correctAnswer ? 'bg-secondary/20 text-secondary' : 'bg-error/20 text-error'}`}>
                <Brain size={16} />
              </div>
              <h2 className={`font-headline font-bold uppercase tracking-widest text-sm ${selectedOption === question.correctAnswer ? 'text-secondary' : 'text-error'}`}>
                {selectedOption === question.correctAnswer ? "Correct Analysis" : "Learning Moment"}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-on-surface font-body leading-relaxed">
                {question.explanation}
              </p>
              <div className="bg-surface-container-highest/50 p-4 rounded-lg">
                <span className="font-label text-[10px] text-tertiary font-bold uppercase tracking-widest block mb-2">Example: {question.example.split(':')[0]}</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">{question.example.split(':')[1] || question.example}</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Interaction Bar */}
      <div className="mt-12 flex justify-between items-center border-t border-outline-variant/10 pt-8">
        <button 
          onClick={() => fetchNewQuestion()}
          disabled={isGenerating}
          className="flex items-center space-x-2 text-on-surface-variant hover:text-primary transition-colors font-label text-sm uppercase tracking-widest font-bold disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
          <span>New Question</span>
        </button>
        <div className="flex space-x-4">
          <button 
            onClick={handleSaveForReview}
            className="px-8 py-3 bg-surface-container-high rounded-lg text-primary font-label text-xs uppercase tracking-widest font-bold border border-outline/20 hover:bg-surface-container-highest transition-all"
          >
            Save for review
          </button>
          <button 
            onClick={() => fetchNewQuestion()}
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container rounded-lg text-on-primary font-label text-xs uppercase tracking-widest font-extrabold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
