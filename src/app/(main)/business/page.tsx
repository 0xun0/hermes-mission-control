'use client';

import { Icon } from '@iconify/react';

export default function BusinessPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:folder-with-files-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Command Center</h1>
          <p className="text-xs text-slate-500">Sharp, efficient, data-driven. Let&apos;s close some deals.</p>
        </div>
      </div>

      {/* Business Stats */}
      <div className="flex flex-wrap items-end gap-4 md:gap-10 px-2 animate-slide-up stagger-2">
        <div className="flex items-baseline gap-2 w-[45%] sm:w-auto">
          <span className="text-4xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-600 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">$124K</span>
          <span className="text-xs tracking-wide text-slate-500 font-medium">Pipeline</span>
        </div>
        <div className="flex items-baseline gap-2 w-[45%] sm:w-auto">
          <span className="text-3xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">8</span>
          <span className="text-xs tracking-wide text-slate-500 font-medium">Active Deals</span>
        </div>
        <div className="flex items-baseline gap-2 w-[45%] sm:w-auto">
          <span className="text-3xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">15</span>
          <span className="text-xs tracking-wide text-slate-500 font-medium">Leads</span>
        </div>
      </div>

      {/* Pipeline Columns */}
      <div className="flex-1 overflow-x-auto pb-4 touch-scroll-x min-h-[300px] animate-slide-up stagger-3">
        <div className="flex gap-4 md:gap-6 h-full min-w-max px-2">
          {[
            { stage: 'Lead', count: 5, value: '$15K', color: 'bg-slate-400' },
            { stage: 'Qualified', count: 3, value: '$28K', color: 'bg-blue-500' },
            { stage: 'Proposal', count: 2, value: '$45K', color: 'bg-orange-500' },
            { stage: 'Negotiation', count: 1, value: '$36.5K', color: 'bg-emerald-500' },
          ].map((stage) => (
            <div key={stage.stage} className="w-[75vw] sm:w-60 flex-shrink-0 flex flex-col snap-start">
              <div className="flex items-center gap-2 mb-3 px-2">
                <span className={`w-2 h-2 rounded-full ${stage.color} shadow-[0_0_5px_currentColor]`} />
                <h3 className="text-sm font-medium text-slate-300">{stage.stage}</h3>
                <span className="text-xs text-slate-500 font-mono ml-1">{stage.count}</span>
              </div>
              <div className="flex-1 rounded-3xl neu-column p-3 flex flex-col gap-2 min-h-[200px]">
                <div className="text-center py-4">
                  <p className="text-xl font-light text-orange-400">{stage.value}</p>
                  <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">{stage.count} deals</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
