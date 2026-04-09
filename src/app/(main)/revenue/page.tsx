'use client';

import { Icon } from '@iconify/react';

export default function RevenuePage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:wallet-money-linear" className="text-green-500 glow-green" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Revenue Autoresearch</h1>
          <p className="text-xs text-slate-500">Continuous optimization engine</p>
        </div>
      </div>

      {/* Score Card */}
      <div className="px-2 animate-slide-up stagger-2">
        <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-slate-500">Current Revenue Score</p>
              <p className="text-3xl font-bold text-slate-200">20.0</p>
              <p className="text-[10px] text-slate-600">Baseline established</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Target</p>
              <p className="text-xl font-bold text-green-500">100+</p>
              <p className="text-[10px] text-slate-600">Revenue optimized</p>
            </div>
          </div>
          <div className="w-full bg-[#1a1d24] rounded-full h-3">
            <div className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full" style={{ width: '20%' }} />
          </div>
        </div>
      </div>

      {/* Experiment Stats */}
      <div className="px-2 animate-slide-up stagger-3">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Experiment Stats</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Run" value="1" icon="solar:test-tube-linear" />
          <StatCard label="Kept" value="0" icon="solar:check-circle-linear" />
          <StatCard label="Reverted" value="1" icon="solar:close-circle-linear" />
          <StatCard label="Improvement" value="0%" icon="solar:chart-linear" />
        </div>
      </div>

      {/* Recent Experiments */}
      <div className="px-2 animate-slide-up stagger-4">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Recent Experiments</h2>
        <div className="space-y-2">
          <ExperimentCard
            id="exp-001"
            description="Baseline outreach strategy"
            score={20.0}
            status="baseline"
            time="Today"
          />
        </div>
      </div>

      {/* Strategy Config */}
      <div className="px-2 animate-slide-up stagger-5">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Current Strategy</h2>
        <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
          <div className="grid grid-cols-2 gap-4">
            <StrategyItem label="Subject Variants" value="4" />
            <StrategyItem label="Opening Variants" value="3" />
            <StrategyItem label="Body Variants" value="3" />
            <StrategyItem label="CTA Variants" value="4" />
          </div>
        </div>
      </div>

      {/* Cron Schedule */}
      <div className="px-2 animate-slide-up stagger-6">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Experiment Schedule</h2>
        <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
          <div className="flex items-center gap-3 mb-3">
            <Icon icon="solar:clock-circle-linear" className="text-orange-500" width={16} />
            <span className="text-sm text-slate-300">Daily at 1:00 AM</span>
          </div>
          <p className="text-xs text-slate-500">Runs 20 experiments per night as part of midnight self-improvement cycle</p>
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

function ExperimentCard({ id, description, score, status, time }: {
  id: string; description: string; score: number; status: string; time: string;
}) {
  const statusColors: Record<string, string> = {
    keep: 'text-green-500',
    discard: 'text-red-500',
    baseline: 'text-blue-500',
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-[#161920] rounded-xl border border-[#333a47]/20">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-200">{description}</p>
        <p className="text-[10px] text-slate-500">{id}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-slate-200">{score.toFixed(1)}</p>
        <p className={`text-[10px] uppercase ${statusColors[status]}`}>{status}</p>
      </div>
      <p className="text-[10px] text-slate-600">{time}</p>
    </div>
  );
}

function StrategyItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-200">{value}</p>
    </div>
  );
}
