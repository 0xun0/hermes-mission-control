'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

const personas = [
  { id: '1', name: 'Strategic Advisor', category: 'business', tone: 'professional', description: 'A sharp, data-driven business strategist focused on revenue and growth', active: true, icon: '🎯' },
  { id: '2', name: 'Creative Muse', category: 'personal', tone: 'empathetic', description: 'An imaginative, emotionally attuned creative partner for brainstorming', active: false, icon: '🎨' },
  { id: '3', name: 'Code Architect', category: 'business', tone: 'direct', description: 'A precise technical advisor for system design and code review', active: false, icon: '🏗️' },
];

const categories = ['all', 'famous', 'business', 'health', 'personal', 'historic', 'custom'];

export default function BrainPersonasPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all' ? personas : personas.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="flex items-center justify-between px-2 animate-slide-up stagger-1">
        <div className="flex items-center gap-3">
          <Icon icon="solar:masks-linear" className="text-orange-500 glow-orange" width={22} />
          <div>
            <h1 className="text-lg font-medium text-slate-200">Personas</h1>
            <p className="text-xs text-slate-500">Custom AI personalities and system prompts</p>
          </div>
        </div>
        <button className="neu-raised px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2">
          <Icon icon="solar:add-circle-linear" width={16} className="text-orange-500" />
          New Persona
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 px-2 overflow-x-auto animate-slide-up stagger-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all shrink-0 ${
              activeCategory === cat
                ? 'neu-active text-orange-400'
                : 'text-slate-500 hover:text-slate-300 hover:bg-[#161920]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Persona Cards */}
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up stagger-3">
        {filtered.map((persona) => (
          <div key={persona.id} className="neu-card rounded-2xl p-5 hover:border-orange-500/30 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center text-xl">
                {persona.icon}
              </div>
              <div className="flex items-center gap-2">
                {persona.active && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">active</span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1d24] text-slate-500 border border-[#333a47]/30 capitalize">
                  {persona.tone}
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-200 mb-1">{persona.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{persona.description}</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 rounded-lg neu-raised text-xs font-medium text-slate-300 hover:text-white transition-all text-center">
                Edit
              </button>
              <button className="px-3 py-1.5 rounded-lg neu-raised text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-all">
                {persona.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
