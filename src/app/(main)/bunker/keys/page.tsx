'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

const mockKeys = [
  { id: '1', name: 'OpenAI API Key', service: 'OpenAI', keyPreview: 'sk-...abc123', isActive: true, lastUsed: '2 min ago' },
  { id: '2', name: 'Anthropic API Key', service: 'Anthropic', keyPreview: 'sk-ant-...xyz789', isActive: true, lastUsed: '15 min ago' },
  { id: '3', name: 'Gmail OAuth Token', service: 'Google', keyPreview: 'ya29....def456', isActive: true, lastUsed: '1h ago' },
];

export default function BunkerKeysPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-2 animate-slide-up stagger-1">
        <div className="flex items-center gap-3">
          <Icon icon="solar:key-linear" className="text-orange-500 glow-orange" width={22} />
          <div>
            <h1 className="text-lg font-medium text-slate-200">API Keys</h1>
            <p className="text-xs text-slate-500">Manage all API keys and authentication tokens</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="neu-raised px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <Icon icon="solar:add-circle-linear" width={16} className="text-orange-500" />
          Add Key
        </button>
      </div>

      {/* Add Key Form */}
      {showAddForm && (
        <div className="px-2 animate-slide-up">
          <div className="neu-card rounded-2xl p-5 border border-orange-500/20">
            <h3 className="text-sm font-medium text-slate-200 mb-4">Add New API Key</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Name</label>
                <input className="w-full mt-1 px-4 py-2.5 rounded-xl neu-inset text-sm text-slate-200 placeholder-slate-600 outline-none" placeholder="e.g., OpenAI Production" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">Service</label>
                <input className="w-full mt-1 px-4 py-2.5 rounded-xl neu-inset text-sm text-slate-200 placeholder-slate-600 outline-none" placeholder="e.g., OpenAI" />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase tracking-wider">API Key</label>
                <input className="w-full mt-1 px-4 py-2.5 rounded-xl neu-inset text-sm text-slate-200 placeholder-slate-600 outline-none font-mono" placeholder="sk-..." type="password" />
              </div>
              <div className="flex gap-2 pt-2">
                <button className="neu-raised px-4 py-2 rounded-xl text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-all">Save</button>
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-300 transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keys List */}
      <div className="px-2 space-y-3 animate-slide-up stagger-2">
        {mockKeys.map((key) => (
          <div key={key.id} className="neu-card rounded-2xl p-4 hover:border-orange-500/30 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center shrink-0">
                <Icon icon="solar:key-linear" className={key.isActive ? 'text-emerald-400' : 'text-slate-500'} width={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200">{key.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500 font-mono">{key.keyPreview}</span>
                  <span className="text-[10px] text-slate-600">· {key.service}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-600">Used {key.lastUsed}</span>
                <button className="p-1.5 rounded-lg hover:bg-[#161920] transition-colors">
                  <Icon icon="solar:pen-new-square-linear" className="text-slate-500" width={14} />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                  <Icon icon="solar:trash-bin-2-linear" className="text-red-400/50 hover:text-red-400" width={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
