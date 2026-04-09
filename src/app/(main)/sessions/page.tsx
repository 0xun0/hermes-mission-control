'use client';

import { Icon } from '@iconify/react';

export default function SessionsPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:clock-circle-linear" className="text-cyan-500" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Sessions</h1>
          <p className="text-xs text-slate-500">85 sessions in 6 days</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-2 grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up stagger-2">
        <StatCard label="Total Sessions" value="85" icon="solar:chat-round-linear" />
        <StatCard label="Regular" value="72" icon="solar:user-linear" />
        <StatCard label="Cron" value="13" icon="solar:clock-circle-linear" />
        <StatCard label="Days Active" value="6" icon="solar:calendar-linear" />
      </div>

      {/* Session Graph */}
      <div className="px-2 animate-slide-up stagger-3">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Session Graph</h2>
        <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
          <div className="grid grid-cols-3 gap-4">
            <GraphStat label="Nodes" value="12" />
            <GraphStat label="Edges" value="18" />
            <GraphStat label="FTS Index" value="Active" />
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="px-2 animate-slide-up stagger-4">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Recent Sessions</h2>
        <div className="space-y-2">
          <SessionCard id="20260408_190413" type="cli" messages={50} time="Today" />
          <SessionCard id="20260408_183806" type="cli" messages={30} time="Today" />
          <SessionCard id="20260408_180814" type="cli" messages={25} time="Today" />
          <SessionCard id="cron_bef431114dce" type="cron" messages={86} time="Today" />
          <SessionCard id="20260408_141338" type="cli" messages={23} time="Today" />
        </div>
      </div>

      {/* Memory Stats */}
      <div className="px-2 animate-slide-up stagger-5">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Memory System</h2>
        <div className="bg-[#161920] rounded-xl p-4 border border-[#333a47]/20">
          <div className="grid grid-cols-3 gap-4">
            <GraphStat label="Facts" value="250" />
            <GraphStat label="Entities" value="13" />
            <GraphStat label="HRR Dim" value="1024" />
          </div>
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

function GraphStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-lg font-bold text-slate-200">{value}</p>
      <p className="text-[10px] text-slate-500">{label}</p>
    </div>
  );
}

function SessionCard({ id, type, messages, time }: { id: string; type: string; messages: number; time: string }) {
  const typeColors: Record<string, string> = {
    cli: 'text-blue-500',
    cron: 'text-orange-500',
    telegram: 'text-cyan-500',
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#161920] rounded-xl border border-[#333a47]/20">
      <Icon icon="solar:chat-round-linear" className="text-slate-500" width={16} />
      <div className="flex-1">
        <p className="text-sm text-slate-300">{id}</p>
        <p className={`text-[10px] ${typeColors[type]}`}>{type}</p>
      </div>
      <p className="text-xs text-slate-400">{messages} msgs</p>
      <p className="text-[10px] text-slate-600">{time}</p>
    </div>
  );
}
