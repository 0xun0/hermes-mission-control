'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

const bunkerModules = [
  { id: 'security', label: 'Security', icon: 'solar:shield-check-linear', href: '/bunker/security', desc: 'Active security measures and threat monitoring', status: 'Nominal', statusColor: 'text-emerald-400', count: '5 active' },
  { id: 'privacy', label: 'Privacy', icon: 'solar:eye-closed-linear', href: '/bunker/privacy', desc: 'Privacy measures, data protection policies', status: 'Enforced', statusColor: 'text-emerald-400', count: '8 rules' },
  { id: 'diagnostics', label: 'Diagnostics', icon: 'solar:pulse-2-linear', href: '/bunker/diagnostics', desc: 'System logs, health monitoring, diagnostics', status: 'Healthy', statusColor: 'text-emerald-400', count: '3 checks' },
  { id: 'keys', label: 'API Keys', icon: 'solar:key-linear', href: '/bunker/keys', desc: 'View, add, edit, and manage API keys', status: '3 active', statusColor: 'text-amber-400', count: '3 keys' },
];

export default function BunkerPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:shield-star-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Bunker</h1>
          <p className="text-xs text-slate-500">Security & Control Center — all defenses in one place</p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="px-2 animate-slide-up stagger-2">
        <div className="neu-card rounded-2xl p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Icon icon="solar:shield-check-linear" className="text-emerald-400" width={22} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">All Systems Secure</p>
              <p className="text-xs text-slate-500">Last audit: 2 hours ago · No threats detected</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)] animate-pulse" />
              <span className="text-xs text-emerald-400">Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up stagger-3">
        {bunkerModules.map((mod) => (
          <Link
            key={mod.id}
            href={mod.href}
            className="neu-card rounded-2xl p-5 hover:border-orange-500/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon icon={mod.icon} className="text-slate-400" width={20} />
              </div>
              <span className={`text-[10px] font-medium ${mod.statusColor}`}>{mod.status}</span>
            </div>
            <h3 className="text-sm font-medium text-slate-200 mb-1">{mod.label}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
