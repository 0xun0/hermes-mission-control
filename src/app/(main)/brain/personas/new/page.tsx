'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function PersonaCreatorPage() {
  return (
    <>
      <div className="flex items-center justify-between px-2 animate-slide-up stagger-1">
        <div className="flex items-center gap-3">
          <Link href="/brain/personas" className="p-2 rounded-xl neu-inset text-slate-500 hover:text-slate-300 transition-colors">
            <Icon icon="solar:alt-arrow-left-linear" width={20} />
          </Link>
          <div>
            <h1 className="text-lg font-medium text-slate-200">Persona Studio</h1>
            <p className="text-xs text-slate-500">Co-create a new custom AI personality</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 transition-all">Cancel</button>
          <button className="neu-raised px-4 py-2 rounded-xl text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-all flex items-center gap-2">
            <Icon icon="solar:diskette-linear" width={16} />
            Save Persona
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-2 animate-slide-up stagger-2">
        {/* Left Column - Basics */}
        <div className="lg:col-span-1 space-y-4">
          <div className="neu-card rounded-2xl p-5">
            <h3 className="text-sm font-medium text-slate-200 mb-4">Identity</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-[#333a47]/40 hover:border-orange-500/30 transition-colors cursor-pointer mb-2">
                <div className="w-16 h-16 rounded-full bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center mb-3">
                  <Icon icon="solar:gallery-add-linear" className="text-orange-500" width={24} />
                </div>
                <p className="text-xs font-medium text-slate-300">Upload Avatar</p>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Name</label>
                <input className="w-full mt-1 px-4 py-2.5 rounded-xl neu-inset text-sm text-slate-200 placeholder-slate-600 outline-none" placeholder="e.g., Strategic Advisor" />
              </div>
              
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Category</label>
                <select className="w-full mt-1 px-4 py-2.5 rounded-xl neu-inset text-sm text-slate-200 appearance-none outline-none focus:border-orange-500/50">
                  <option>Business</option>
                  <option>Personal</option>
                  <option>Health</option>
                  <option>Creative</option>
                  <option>Utility</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Tone</label>
                <div className="flex gap-2 flex-wrap mt-1">
                  {['Professional', 'Empathetic', 'Direct', 'Creative', 'Analytical'].map(tone => (
                    <button key={tone} className="px-3 py-1.5 rounded-lg neu-inset text-xs font-medium text-slate-400 hover:text-orange-400 focus:text-orange-400 focus:neu-active transition-colors">
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="neu-card rounded-2xl p-5">
            <h3 className="text-sm font-medium text-slate-200 mb-4">Voice Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Voice Model</label>
                <select className="w-full mt-1 px-4 py-2.5 rounded-xl neu-inset text-sm text-slate-200 appearance-none outline-none">
                  <option>ElevenLabs - Rachel</option>
                  <option>ElevenLabs - Drew</option>
                  <option>OpenAI - Alloy</option>
                  <option>OpenAI - Nova</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Speech Rate</span>
                <span className="text-xs text-slate-300 font-mono">1.0x</span>
              </div>
              <div className="h-1.5 rounded-full progress-track">
                <div className="h-full w-1/2 rounded-full progress-fill" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - System Prompt & Skills */}
        <div className="lg:col-span-2 space-y-4">
          <div className="neu-card rounded-2xl p-5 h-[400px] flex flex-col">
            <h3 className="text-sm font-medium text-slate-200 mb-4">System Prompt</h3>
            <p className="text-xs text-slate-500 mb-3">Define the core instructions and constraints for this persona.</p>
            <textarea 
              className="flex-1 w-full p-4 rounded-xl neu-inset text-sm text-slate-300 font-mono placeholder-slate-600 outline-none resize-none leading-relaxed"
              placeholder="You are an elite strategic advisor. Your goal is to maximize leverage and clarity..."
            />
          </div>

          <div className="neu-card rounded-2xl p-5">
            <h3 className="text-sm font-medium text-slate-200 mb-4">Skill Arsenal</h3>
            <p className="text-xs text-slate-500 mb-3">Select the tools this persona has access to by default.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Web Search', icon: 'solar:global-linear' },
                { name: 'Code Execution', icon: 'solar:programming-linear' },
                { name: 'Memory DB', icon: 'solar:database-linear' },
                { name: 'Calendar API', icon: 'solar:calendar-linear' },
                { name: 'GitHub API', icon: 'solar:code-branch-linear' },
                { name: 'Linear API', icon: 'solar:checklist-linear' }
              ].map(skill => (
                <button key={skill.name} className="flex items-center gap-2 p-3 rounded-xl neu-inset text-left hover:border-orange-500/30 transition-colors group">
                  <Icon icon={skill.icon} className="text-slate-500 group-hover:text-orange-400 transition-colors" width={18} />
                  <span className="text-xs font-medium text-slate-300">{skill.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
