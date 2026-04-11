'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

const brainModules = [
  { id: 'id', label: 'Identity', icon: 'solar:user-id-linear', href: '/brain/id', desc: 'SOUL.md, IDENTITY.md, AGENTS.md and more', count: '5 docs', color: 'text-violet-400' },
  { id: 'personas', label: 'Personas', icon: 'solar:masks-linear', href: '/brain/personas', desc: 'Custom system prompt personalities', count: '3', color: 'text-pink-400' },
  { id: 'skills', label: 'Skills', icon: 'solar:widget-linear', href: '/brain/skills', desc: 'Library of installed capabilities', count: '16', color: 'text-emerald-400' },
  { id: 'voices', label: 'Voices', icon: 'solar:microphone-3-linear', href: '/brain/voices', desc: 'Custom voice library and selector', count: '2', color: 'text-sky-400' },
  { id: 'memories', label: 'Memories', icon: 'solar:database-linear', href: '/brain/memories', desc: 'Central library of all memories', count: '142', color: 'text-amber-400' },
  { id: 'knowledge', label: 'Knowledge', icon: 'solar:book-bookmark-linear', href: '/brain/knowledge', desc: 'Guides, research, books, frameworks', count: '32', color: 'text-cyan-400' },
  { id: 'apps', label: 'Apps', icon: 'solar:smartphone-2-linear', href: '/brain/apps', desc: 'Connected external applications', count: '4', color: 'text-indigo-400' },
];

export default function BrainPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:brain-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Brain</h1>
          <p className="text-xs text-slate-500">Core identity, memory, and cognition layer</p>
        </div>
      </div>

      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up stagger-2">
        {brainModules.map((mod) => (
          <Link
            key={mod.id}
            href={mod.href}
            className="neu-card rounded-2xl p-5 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon icon={mod.icon} className={mod.color} width={20} />
              </div>
              <span className="text-[10px] text-slate-600 font-mono">{mod.count}</span>
            </div>
            <h3 className="text-sm font-medium text-slate-200 mb-1">{mod.label}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
