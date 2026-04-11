'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

const intelModules = [
  { id: 'crons', label: 'Crons', icon: 'solar:clock-circle-linear', href: '/intelligence/crons', desc: 'Scheduled tasks and recurring automations', count: '3 active', color: 'text-sky-400' },
  { id: 'webhooks', label: 'Webhooks & Triggers', icon: 'solar:link-round-linear', href: '/intelligence/webhooks', desc: 'Event-driven webhooks and trigger configurations', count: '2 active', color: 'text-amber-400' },
  { id: 'workflows', label: 'Workflows', icon: 'solar:route-linear', href: '/intelligence/workflows', desc: 'Visual automation workflow builder', count: '1 flow', color: 'text-emerald-400' },
  { id: 'heartbeat', label: 'Heartbeat', icon: 'solar:pulse-2-linear', href: '/intelligence/heartbeat', desc: 'System heartbeat and health monitoring', count: 'Live', color: 'text-green-400' },
  { id: 'commands', label: 'Commands', icon: 'solar:command-linear', href: '/intelligence/commands', desc: 'Audit, Sprint, Auto-Research, and custom commands', count: '6', color: 'text-violet-400' },
  { id: 'frameworks', label: 'Frameworks', icon: 'solar:folder-open-linear', href: '/intelligence/frameworks', desc: 'Installed reasoning and methodology frameworks', count: '2', color: 'text-pink-400' },
];

export default function IntelligencePage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:cpu-bolt-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Intelligence</h1>
          <p className="text-xs text-slate-500">Automation, agency, and workflow orchestration</p>
        </div>
      </div>

      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up stagger-2">
        {intelModules.map((mod) => (
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
