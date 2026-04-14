import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Save, User, Shield, Bell } from 'lucide-react';

export default function Settings({ showToast }: { showToast: (msg: string) => void }) {
  const [prefs, setPrefs] = useState({
    defaultType: 'mcq',
    difficulty: 'beginner'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      showToast('Preferences saved successfully!');
      setIsSaving(false);
    }, 500);
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-12">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
          <SettingsIcon size={32} />
        </div>
        <div>
          <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant">Customization</p>
          <h1 className="font-headline text-5xl font-extrabold tracking-tight">Settings</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-2">
          {[
            { icon: User, label: 'Profile' },
            { icon: SettingsIcon, label: 'Quiz Preferences', active: true },
            { icon: Shield, label: 'Privacy' },
            { icon: Bell, label: 'Notifications' }
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all ${
                item.active ? 'bg-primary/10 text-primary' : 'hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              <item.icon size={18} />
              <span className="font-label text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-8 bg-surface-container-low p-8 rounded-3xl border border-outline-variant/10">
          <section className="space-y-6">
            <h3 className="font-headline text-xl font-bold border-b border-outline-variant/10 pb-4">Quiz Customization</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Default Question Type</label>
                <select 
                  value={prefs.defaultType}
                  onChange={(e) => setPrefs({ ...prefs, defaultType: e.target.value })}
                  className="w-full bg-surface-container-high p-4 rounded-xl border border-outline-variant/20 font-body text-sm outline-none focus:border-primary transition-colors"
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="fill">Fill in the Blanks</option>
                  <option value="boolean">True / False</option>
                </select>
              </div>

              <div>
                <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Learning Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {['beginner', 'intermediate', 'expert'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setPrefs({ ...prefs, difficulty: level })}
                      className={`p-3 rounded-xl border font-label text-[10px] uppercase tracking-widest font-bold transition-all ${
                        prefs.difficulty === level 
                          ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' 
                          : 'bg-surface-container-high border-outline-variant/20 text-on-surface-variant hover:border-primary/40'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="primary-gradient text-on-primary font-label text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl flex items-center space-x-2 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
