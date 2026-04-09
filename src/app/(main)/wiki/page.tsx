'use client';

import { Icon } from '@iconify/react';

export default function WikiPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:notebook-bookmark-linear" className="text-purple-500 glow-purple" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Knowledge Base</h1>
          <p className="text-xs text-slate-500">32 pages — compounding knowledge</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-2 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up stagger-2">
        <StatCard label="Total Pages" value="32" icon="solar:document-text-linear" />
        <StatCard label="Concepts" value="21" icon="solar:lightbulb-linear" />
        <StatCard label="Entities" value="6" icon="solar:users-group-rounded-linear" />
        <StatCard label="Comparisons" value="1" icon="solar:scale-linear" />
      </div>

      {/* Categories */}
      <div className="px-2 animate-slide-up stagger-3">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Categories</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <CategoryCard name="Concepts" count={21} icon="solar:lightbulb-linear" color="orange" />
          <CategoryCard name="Entities" count={6} icon="solar:user-linear" color="blue" />
          <CategoryCard name="Comparisons" count={1} icon="solar:scale-linear" color="green" />
          <CategoryCard name="Queries" count={1} icon="solar:magnifer-linear" color="purple" />
          <CategoryCard name="Dashboards" count={3} icon="solar:chart-linear" color="pink" />
        </div>
      </div>

      {/* Recent Pages */}
      <div className="px-2 animate-slide-up stagger-4">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Recent Pages</h2>
        <div className="space-y-2">
          <PageCard name="godlike-30-day-plan" type="concept" updated="Today" />
          <PageCard name="customer-discovery-examples" type="concept" updated="Today" />
          <PageCard name="revenue-autoresearch-examples" type="concept" updated="Today" />
          <PageCard name="karpathy-auto-research-deep-analysis" type="concept" updated="Today" />
          <PageCard name="2026-04-08-wiki-sprint" type="concept" updated="Today" />
        </div>
      </div>

      {/* Obsidian Integration */}
      <div className="px-2 animate-slide-up stagger-5">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Obsidian Integration</h2>
        <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
          <div className="flex items-center gap-3 mb-3">
            <Icon icon="solar:notebook-bookmark-linear" className="text-purple-500" width={16} />
            <span className="text-sm text-slate-300">Dataview Plugin Active</span>
          </div>
          <p className="text-xs text-slate-500">Open ~/wiki in Obsidian for graph view and dashboards</p>
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
      <Icon icon={icon} className="text-slate-500" width={16} />
      <p className="text-xl font-bold text-slate-200 mt-2">{value}</p>
      <p className="text-[10px] text-slate-500">{label}</p>
    </div>
  );
}

function CategoryCard({ name, count, icon, color }: { name: string; count: number; icon: string; color: string }) {
  const colorClasses: Record<string, string> = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    pink: 'text-pink-500',
  };

  return (
    <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
      <Icon icon={icon} className={colorClasses[color]} width={18} />
      <p className="text-lg font-bold text-slate-200 mt-2">{count}</p>
      <p className="text-[10px] text-slate-500">{name}</p>
    </div>
  );
}

function PageCard({ name, type, updated }: { name: string; type: string; updated: string }) {
  const typeColors: Record<string, string> = {
    concept: 'text-orange-500',
    entity: 'text-blue-500',
    comparison: 'text-green-500',
    query: 'text-purple-500',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#161920] rounded-xl border border-[#333a47]/20">
      <Icon icon="solar:document-text-linear" className="text-slate-500" width={16} />
      <div className="flex-1">
        <p className="text-sm text-slate-300">{name}</p>
        <p className={`text-[10px] ${typeColors[type]}`}>{type}</p>
      </div>
      <p className="text-[10px] text-slate-600">{updated}</p>
    </div>
  );
}
