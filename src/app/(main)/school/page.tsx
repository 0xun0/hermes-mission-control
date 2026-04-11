'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

type TabType = 'intake' | 'processing' | 'integrated';

const mockQueue = [
  { id: '1', type: 'youtube' as const, title: 'Andrej Karpathy — The spelled-out intro to neural networks', status: 'processing' as const, category: 'AI/ML', progress: 65 },
  { id: '2', type: 'link' as const, title: 'The Art of Auto-Research', status: 'analyzed' as const, category: 'Methodology', progress: 100 },
  { id: '3', type: 'document' as const, title: 'Revenue_Framework_v2.pdf', status: 'queued' as const, category: null, progress: 0 },
  { id: '4', type: 'note' as const, title: 'Ideas for agent memory architecture', status: 'integrated' as const, category: 'Architecture', progress: 100 },
];

const typeIcons: Record<string, { icon: string; color: string }> = {
  youtube: { icon: 'solar:play-circle-linear', color: 'text-red-400' },
  link: { icon: 'solar:link-round-linear', color: 'text-sky-400' },
  document: { icon: 'solar:document-linear', color: 'text-amber-400' },
  note: { icon: 'solar:pen-new-square-linear', color: 'text-violet-400' },
  file: { icon: 'solar:file-linear', color: 'text-slate-400' },
};

export default function SchoolPage() {
  const [activeTab, setActiveTab] = useState<TabType>('intake');

  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:square-academic-cap-2-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">School</h1>
          <p className="text-xs text-slate-500">Drop anything — Una analyzes, categorizes, and integrates it</p>
        </div>
      </div>

      {/* Drop Zone */}
      <div className="px-2 animate-slide-up stagger-2">
        <div className="border-2 border-dashed border-[#333a47]/40 hover:border-orange-500/30 rounded-2xl p-8 text-center transition-colors cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Icon icon="solar:upload-minimalistic-linear" className="text-orange-500" width={24} />
          </div>
          <p className="text-sm font-medium text-slate-300 mb-1">Drop anything here</p>
          <p className="text-xs text-slate-500">Documents, links, YouTube URLs, notes, files — Una will handle the rest</p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['📄 Document', '🔗 Link', '📺 YouTube', '📝 Note'].map((type) => (
              <span key={type} className="text-[10px] px-2 py-1 rounded-lg bg-[#161920] border border-[#333a47]/20 text-slate-500">{type}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-2 animate-slide-up stagger-3">
        {[
          { id: 'intake' as TabType, label: 'Queue', count: 2 },
          { id: 'processing' as TabType, label: 'Processing', count: 1 },
          { id: 'integrated' as TabType, label: 'Integrated', count: 1 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id ? 'neu-active text-orange-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab.label}
            <span className="text-[10px] font-mono text-slate-600">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Queue Items */}
      <div className="px-2 space-y-3 animate-slide-up stagger-4">
        {mockQueue
          .filter((item) => {
            if (activeTab === 'intake') return item.status === 'queued';
            if (activeTab === 'processing') return item.status === 'processing' || item.status === 'analyzed';
            return item.status === 'integrated';
          })
          .map((item) => {
            const ti = typeIcons[item.type];
            return (
              <div key={item.id} className="neu-card rounded-2xl p-4 hover:border-orange-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center shrink-0">
                    <Icon icon={ti.icon} className={ti.color} width={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        item.status === 'integrated' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'processing' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                        item.status === 'analyzed' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>{item.status}</span>
                      {item.category && (
                        <span className="text-[10px] text-slate-500">{item.category}</span>
                      )}
                    </div>
                  </div>
                </div>
                {item.status === 'processing' && (
                  <div className="mt-3 h-1.5 rounded-full progress-track p-0.5">
                    <div className="h-full rounded-full progress-fill transition-all" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}
