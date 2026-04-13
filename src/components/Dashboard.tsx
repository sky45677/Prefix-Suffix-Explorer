import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Zap, 
  Filter, 
  Download, 
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { STUDENTS } from '../constants';

export default function Dashboard({ showToast }: { showToast: (msg: string) => void }) {
  return (
    <div className="p-8 bg-surface">
      {/* ... existing header ... */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* XP & Level Card */}
        <div className="md:col-span-8 bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 primary-gradient opacity-10 rounded-bl-full"></div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="font-label text-xs uppercase tracking-widest text-primary mb-1">Current Standing</p>
              <h1 className="font-headline text-4xl font-extrabold tracking-tight">Master of Morphology</h1>
            </div>
            <div className="text-right">
              <span className="font-headline text-3xl font-bold text-secondary">Level 08</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-primary h-full rounded-full"
            />
          </div>
          <div className="flex justify-between mt-3 font-label text-xs text-outline tracking-wider">
            <span>2,450 / 3,000 XP</span>
            <span>Next Level: Etymology Elite</span>
          </div>
        </div>

        {/* Badges Asymmetric Grid */}
        <div className="md:col-span-4 bg-surface-container-low p-6 rounded-xl">
          <h3 className="font-label text-xs uppercase tracking-widest text-outline mb-6">Academic Honors</h3>
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => showToast('Badge: Root Master unlocked!')}
              className="bg-surface-container-high p-4 rounded-lg flex flex-col items-center justify-center border-l-2 border-secondary cursor-pointer hover:bg-surface-container-highest transition-colors"
            >
              <Sparkles className="text-secondary mb-2" size={24} />
              <span className="font-label text-[10px] text-center font-bold text-on-surface uppercase tracking-tighter">Root Master</span>
            </div>
            <div 
              onClick={() => showToast('Badge: Streak King unlocked!')}
              className="bg-surface-container-high p-4 rounded-lg flex flex-col items-center justify-center border-l-2 border-primary cursor-pointer hover:bg-surface-container-highest transition-colors"
            >
              <Award className="text-primary mb-2" size={24} />
              <span className="font-label text-[10px] text-center font-bold text-on-surface uppercase tracking-tighter">Streak King</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Activity Calendar (Left) */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-xl font-bold">Activity Heatmap</h3>
              <span className="text-secondary font-label text-xs font-bold">12 DAY STREAK</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 14 }).map((_, i) => {
                const opacities = [0.2, 0.4, 1, 0, 0.6, 0.8, 1, 1, 1, 1, 1, 1, 1, 0];
                const opacity = opacities[i % opacities.length];
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-md ${opacity === 0 ? 'bg-surface-container-highest' : 'bg-secondary'}`}
                    style={{ opacity: opacity === 0 ? 1 : opacity }}
                  />
                );
              })}
            </div>
            <p className="mt-4 font-body text-sm text-outline text-center">Consistent learning improves word retention by 40%.</p>
          </div>
          
          <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-secondary">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-secondary" size={16} />
              <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">Insight</h4>
            </div>
            <p className="font-body text-sm leading-relaxed text-on-surface">You are performing <span className="text-secondary font-bold">22% better</span> in Greek affixes than Latin stems this week.</p>
          </div>
        </div>

        {/* Teacher Mode Area (Right) */}
        <div className="xl:col-span-8">
          <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 bg-surface-container flex justify-between items-center">
              <div>
                <h3 className="font-headline text-xl font-bold">Class Results Table</h3>
                <p className="font-label text-xs text-outline mt-1 uppercase tracking-wider">Advanced Morphology Group A</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => showToast('Filtering results...')}
                  className="bg-surface-container-high p-2 rounded hover:text-primary transition-colors"
                >
                  <Filter size={18} />
                </button>
                <button 
                  onClick={() => showToast('Downloading report...')}
                  className="bg-surface-container-high p-2 rounded hover:text-primary transition-colors"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant/10">
                  <tr className="font-label text-[10px] text-outline uppercase tracking-[0.2em]">
                    <th className="px-6 py-4 font-bold">Student Name</th>
                    <th className="px-6 py-4 font-bold text-center">Modules</th>
                    <th className="px-6 py-4 font-bold">Avg. Accuracy</th>
                    <th className="px-6 py-4 font-bold text-right">Last Active</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm divide-y divide-outline-variant/5">
                  {STUDENTS.map((student) => (
                    <tr key={student.id} className="hover:bg-surface-container-high transition-colors group">
                      <td className="px-6 py-5 flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xs ${student.color}`}>
                          {student.initials}
                        </div>
                        <span className="text-on-surface font-medium">{student.name}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex-1 max-w-[100px] h-1 bg-surface-container-highest rounded-full">
                            <div className="bg-secondary h-full rounded-full" style={{ width: `${student.accuracy}%` }} />
                          </div>
                          <span className="text-[10px] font-label text-secondary font-bold">{student.accuracy}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-on-surface">{student.accuracy}%</td>
                      <td className="px-6 py-5 text-right text-outline text-xs">{student.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-surface-container-low flex justify-center">
              <button 
                onClick={() => showToast('Loading all students...')}
                className="text-xs font-label uppercase tracking-widest text-primary font-bold hover:underline"
              >
                View All 24 Students
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
