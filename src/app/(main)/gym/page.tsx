'use client';

import { Icon } from '@iconify/react';

const pipelineStages = [
  { id: 'discover', label: 'Discover', icon: 'solar:magnifer-linear', color: 'bg-sky-500' },
  { id: 'evaluate', label: 'Evaluate', icon: 'solar:checklist-minimalistic-linear', color: 'bg-amber-500' },
  { id: 'test', label: 'Test', icon: 'solar:test-tube-minimalistic-linear', color: 'bg-violet-500' },
  { id: 'integrate', label: 'Integrate', icon: 'solar:link-round-linear', color: 'bg-cyan-500' },
  { id: 'install', label: 'Install', icon: 'solar:download-minimalistic-linear', color: 'bg-emerald-500' },
];

const mockSkills = [
  { id: '1', name: 'Auto-Research v2', source: 'Karpathy Method', stage: 'test', score: 85, description: 'Automated research pipeline with depth-first exploration' },
  { id: '2', name: 'Semantic Code Search', source: 'GitHub Trending', stage: 'evaluate', score: 72, description: 'AI-powered codebase navigation using embeddings' },
  { id: '3', name: 'Voice Synthesis', source: 'ElevenLabs API', stage: 'installed', score: 95, description: 'High-quality text-to-speech with custom voice cloning' },
  { id: '4', name: 'Memory Consolidation', source: 'Research Paper', stage: 'discover', score: null, description: 'Intelligent memory tier management and fact extraction' },
];

export default function GymPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:dumbbell-large-minimalistic-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Gym / Dojo</h1>
          <p className="text-xs text-slate-500">Skill acquisition — discover, evaluate, test, integrate, install</p>
        </div>
      </div>

      {/* Drop Zone for Skills */}
      <div className="px-2 animate-slide-up stagger-2">
        <div className="border-2 border-dashed border-[#333a47]/40 hover:border-orange-500/30 rounded-2xl p-6 text-center transition-colors cursor-pointer">
          <Icon icon="solar:programming-linear" className="text-orange-500 mx-auto mb-2" width={28} />
          <p className="text-sm font-medium text-slate-300">Drop a technique, tool, or research</p>
          <p className="text-xs text-slate-500 mt-1">Una will apply the Karpathy method to evaluate and install it</p>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="px-2 animate-slide-up stagger-3">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Acquisition Pipeline</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {pipelineStages.map((stage, i) => (
            <div key={stage.id} className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-full ${stage.color}/20 flex items-center justify-center border border-${stage.color.replace('bg-', '')}/30`}>
                  <Icon icon={stage.icon} className={stage.color.replace('bg-', 'text-')} width={14} />
                </div>
                <span className="text-[10px] text-slate-500 font-medium">{stage.label}</span>
              </div>
              {i < pipelineStages.length - 1 && (
                <div className="w-8 h-px bg-[#333a47]/40 shrink-0 mb-5" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Skill Cards */}
      <div className="px-2 space-y-3 animate-slide-up stagger-4">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Skills in Pipeline</h2>
        {mockSkills.map((skill) => {
          const stageIdx = pipelineStages.findIndex((s) => s.id === skill.stage);
          const isInstalled = skill.stage === 'installed';
          const progress = isInstalled ? 100 : ((stageIdx + 1) / pipelineStages.length) * 100;

          return (
            <div key={skill.id} className="neu-card rounded-2xl p-4 hover:border-orange-500/30 transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)] border border-black flex items-center justify-center shrink-0 ${
                  isInstalled ? 'border-emerald-500/30' : ''
                }`}>
                  <Icon
                    icon={isInstalled ? 'solar:check-circle-linear' : 'solar:dumbbell-large-minimalistic-linear'}
                    className={isInstalled ? 'text-emerald-400' : 'text-orange-400'}
                    width={18}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-200">{skill.name}</p>
                    {skill.score !== null && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        skill.score >= 90 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        skill.score >= 70 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>{skill.score}%</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{skill.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-slate-600">Source: {skill.source}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1d24] text-slate-500 border border-[#333a47]/20 capitalize">{skill.stage}</span>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1 rounded-full progress-track">
                <div className="h-full rounded-full progress-fill transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
