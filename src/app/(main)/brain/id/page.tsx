'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

const documents = [
  { id: 'soul', filename: 'SOUL.md', title: 'Soul Configuration', category: 'identity', size: '2.4 KB', preview: 'Core personality definition, values, and behavioral guidelines...' },
  { id: 'identity', filename: 'IDENTITY.md', title: 'Identity Profile', category: 'identity', size: '1.8 KB', preview: 'Who I am, what I stand for, my mission and vision...' },
  { id: 'user', filename: 'USER.md', title: 'User Profile', category: 'identity', size: '1.2 KB', preview: 'User preferences, communication style, decision patterns...' },
  { id: 'memory', filename: 'MEMORY.md', title: 'Memory Configuration', category: 'config', size: '0.9 KB', preview: 'How memories are structured, stored, and retrieved...' },
  { id: 'agents', filename: 'AGENTS.md', title: 'Agent Configuration', category: 'agent', size: '3.1 KB', preview: 'Agent rules, capabilities, tool access, and constraints...' },
];

export default function BrainIdPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:user-id-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Identity Documents</h1>
          <p className="text-xs text-slate-500">Core identity files that define who we are</p>
        </div>
      </div>

      <div className="px-2 space-y-3 animate-slide-up stagger-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
            className="w-full text-left neu-card rounded-2xl p-4 hover:border-orange-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center shrink-0">
                <Icon icon="solar:document-text-linear" className="text-violet-400" width={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-200 font-mono">{doc.filename}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {doc.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{doc.title} · {doc.size}</p>
              </div>
              <Icon
                icon={selectedDoc === doc.id ? 'solar:alt-arrow-up-linear' : 'solar:alt-arrow-down-linear'}
                className="text-slate-500"
                width={16}
              />
            </div>
            {selectedDoc === doc.id && (
              <div className="mt-4 p-4 rounded-xl bg-[#0c0e12]/60 border border-[#333a47]/20">
                <p className="text-xs text-slate-400 leading-relaxed font-mono">{doc.preview}</p>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded-lg neu-raised text-xs font-medium text-slate-300 hover:text-white transition-all">
                    <Icon icon="solar:pen-new-square-linear" className="inline mr-1" width={14} />
                    Edit
                  </button>
                  <button className="px-3 py-1.5 rounded-lg neu-raised text-xs font-medium text-slate-300 hover:text-white transition-all">
                    <Icon icon="solar:eye-linear" className="inline mr-1" width={14} />
                    View Full
                  </button>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
