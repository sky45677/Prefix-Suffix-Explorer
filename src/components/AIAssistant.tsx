import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../services/aiService';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIAssistant({ context }: { context: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hello! I'm MorphoBot. Ask me anything about Greek and Latin roots, or how to use this module!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const aiResponse = await askAI(userMsg, context);
    setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-surface-container border border-outline-variant/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-primary-container/20 border-b border-outline-variant/10 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm">MorphoBot</h3>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">AI Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-on-primary rounded-tr-none' 
                      : 'bg-surface-container-high text-on-surface rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-container-high p-3 rounded-xl rounded-tl-none">
                    <Loader2 className="animate-spin text-primary" size={16} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-surface-container-low border-t border-outline-variant/10 flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about a root..."
                className="flex-1 bg-surface-container-high border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2 bg-primary text-on-primary rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center relative group"
      >
        <MessageSquare size={24} />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
          AI
        </div>
      </motion.button>
    </div>
  );
}
