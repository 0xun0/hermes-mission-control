'use client';

import { Icon } from '@iconify/react';

export default function BrandPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:document-text-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Content</h1>
          <p className="text-xs text-slate-500">Build your magnetic presence. Make every post count.</p>
        </div>
      </div>

      {/* Content Pipeline Stats */}
      <div className="flex flex-wrap items-end gap-4 md:gap-10 px-2 animate-slide-up stagger-2">
        <div className="flex items-baseline gap-2 w-[45%] sm:w-auto">
          <span className="text-4xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-600 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">18</span>
          <span className="text-xs tracking-wide text-slate-500 font-medium">Posts</span>
        </div>
        <div className="flex items-baseline gap-2 w-[45%] sm:w-auto">
          <span className="text-3xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">8.3%</span>
          <span className="text-xs tracking-wide text-slate-500 font-medium">Engagement</span>
        </div>
        <div className="flex items-baseline gap-2 w-[45%] sm:w-auto">
          <span className="text-3xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">24.5K</span>
          <span className="text-xs tracking-wide text-slate-500 font-medium">Followers</span>
        </div>
      </div>

      {/* Content Cards */}
      <div className="px-2 space-y-3 animate-slide-up stagger-3">
        {[
          { title: 'Morning routine vlog', platform: 'instagram', status: 'published', icon: '📷' },
          { title: 'Q2 Goals thread', platform: 'twitter', status: 'scheduling', icon: '🐦' },
          { title: 'Podcast Episode 47', platform: 'podcast', status: 'creating', icon: '🎙️' },
        ].map((item, i) => (
          <div key={i} className="neu-card rounded-2xl p-4 hover:border-orange-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center text-lg">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{item.title}</p>
                <p className="text-[10px] text-slate-500 capitalize">{item.platform}</p>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                item.status === 'published' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' :
                item.status === 'scheduling' ? 'bg-amber-500/15 text-amber-400 border-amber-500/30' :
                'bg-orange-500/15 text-orange-400 border-orange-500/30'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
