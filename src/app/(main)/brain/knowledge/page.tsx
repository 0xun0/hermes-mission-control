'use client';

import { Icon } from '@iconify/react';

const knowledgeItems = [
  { id: '1', title: 'Auto-Research Framework', type: 'framework', icon: 'solar:cpu-bolt-linear', color: 'text-cyan-400', pages: 12, updated: '2d ago' },
  { id: '2', title: 'Revenue Scoring System', type: 'guide', icon: 'solar:wallet-money-linear', color: 'text-emerald-400', pages: 8, updated: '3d ago' },
  { id: '3', title: 'Obsidian Integration Guide', type: 'guide', icon: 'solar:notebook-bookmark-linear', color: 'text-violet-400', pages: 5, updated: '1w ago' },
  { id: '4', title: 'Andrej Karpathy Methods', type: 'research', icon: 'solar:square-academic-cap-2-linear', color: 'text-pink-400', pages: 15, updated: '2w ago' },
  { id: '5', title: 'Agent Architecture Patterns', type: 'research', icon: 'solar:branching-paths-up-linear', color: 'text-sky-400', pages: 24, updated: '2w ago' },
];

export default function BrainKnowledgePage() {
  return (
    <>
      <div className="flex items-center justify-between px-2 animate-slide-up stagger-1">
        <div className="flex items-center gap-3">
          <Icon icon="solar:book-bookmark-linear" className="text-orange-500 glow-orange" width={22} />
          <div>
            <h1 className="text-lg font-medium text-slate-200">Knowledge Base</h1>
            <p className="text-xs text-slate-500">Guides, research papers, books, frameworks</p>
          </div>
        </div>
        <button className="neu-raised px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2">
          <Icon icon="solar:add-circle-linear" width={16} className="text-orange-500" />
          Add
        </button>
      </div>

      <div className="px-2 space-y-3 animate-slide-up stagger-2">
        {knowledgeItems.map((item) => (
          <div key={item.id} className="neu-card rounded-2xl p-4 hover:border-orange-500/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center shrink-0">
                <Icon icon={item.icon} className={item.color} width={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{item.title}</p>
                <p className="text-[10px] text-slate-500">{item.type} · {item.pages} pages · Updated {item.updated}</p>
              </div>
              <Icon icon="solar:alt-arrow-right-linear" className="text-slate-600" width={16} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
