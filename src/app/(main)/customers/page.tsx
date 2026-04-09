'use client';

import { Icon } from '@iconify/react';

export default function CustomersPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:users-group-rounded-linear" className="text-blue-500 glow-blue" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Customer Discovery</h1>
          <p className="text-xs text-slate-500">Find customers, validate problems</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-2 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up stagger-2">
        <StatCard label="Identified" value="0" target="50" icon="solar:user-linear" />
        <StatCard label="Outreach Sent" value="0" target="20" icon="solar:letter-linear" />
        <StatCard label="Conversations" value="0" target="5" icon="solar:chat-round-linear" />
        <StatCard label="Paying" value="0" target="1" icon="solar:wallet-money-linear" />
      </div>

      {/* Pipeline */}
      <div className="px-2 animate-slide-up stagger-3">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Pipeline</h2>
        <div className="grid grid-cols-4 gap-3">
          <PipelineStage stage="Identified" count={0} color="slate" />
          <PipelineStage stage="Contacted" count={0} color="blue" />
          <PipelineStage stage="In Talk" count={0} color="orange" />
          <PipelineStage stage="Paying" count={0} color="green" />
        </div>
      </div>

      {/* Customer List */}
      <div className="px-2 animate-slide-up stagger-4">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Customer Database</h2>
        <div className="bg-[#161920] rounded-xl border border-[#333a47]/20 p-8 text-center">
          <Icon icon="solar:users-group-rounded-linear" className="text-slate-600 mx-auto mb-3" width={32} />
          <p className="text-sm text-slate-500">No customers yet</p>
          <p className="text-xs text-slate-600 mt-1">Start customer discovery to add contacts</p>
        </div>
      </div>

      {/* Interview Log */}
      <div className="px-2 animate-slide-up stagger-5">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Interview Log</h2>
        <div className="bg-[#161920] rounded-xl border border-[#333a47]/20 p-8 text-center">
          <Icon icon="solar:chat-round-linear" className="text-slate-600 mx-auto mb-3" width={32} />
          <p className="text-sm text-slate-500">No interviews yet</p>
          <p className="text-xs text-slate-600 mt-1">Conversations will appear here</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-2 animate-slide-up stagger-6">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Next Steps</h2>
        <div className="space-y-2">
          <StepItem step="Define target customer profile" status="pending" />
          <StepItem step="Find 50 potential customers" status="pending" />
          <StepItem step="Send 20 personalized outreach" status="pending" />
          <StepItem step="Book 5 conversations" status="pending" />
          <StepItem step="Validate 3 problems" status="pending" />
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value, target, icon }: { label: string; value: string; target: string; icon: string }) {
  return (
    <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
      <Icon icon={icon} className="text-slate-500" width={16} />
      <p className="text-xl font-bold text-slate-200 mt-2">{value}</p>
      <p className="text-[10px] text-slate-500">{label} / {target}</p>
    </div>
  );
}

function PipelineStage({ stage, count, color }: { stage: string; count: number; color: string }) {
  const colorClasses: Record<string, string> = {
    slate: 'border-slate-500/30',
    blue: 'border-blue-500/30',
    orange: 'border-orange-500/30',
    green: 'border-green-500/30',
  };

  return (
    <div className={`bg-[#161920] rounded-xl p-4 border ${colorClasses[color]} text-center`}>
      <p className="text-2xl font-bold text-slate-200">{count}</p>
      <p className="text-[10px] text-slate-500">{stage}</p>
    </div>
  );
}

function StepItem({ step, status }: { step: string; status: string }) {
  const statusIcons: Record<string, string> = {
    completed: 'solar:check-circle-bold',
    in_progress: 'solar:play-circle-linear',
    pending: 'solar:clock-circle-linear',
  };
  const statusColors: Record<string, string> = {
    completed: 'text-green-500',
    in_progress: 'text-orange-500',
    pending: 'text-slate-500',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#161920] rounded-xl border border-[#333a47]/20">
      <Icon icon={statusIcons[status]} className={statusColors[status]} width={18} />
      <p className="text-sm text-slate-300">{step}</p>
    </div>
  );
}
