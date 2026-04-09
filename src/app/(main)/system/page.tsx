'use client';

import { SystemStatusWidget } from '@/components/hermes/system-status-widget';
import { HermesGoalsWidget } from '@/components/hermes/hermes-goals-widget';
import { CronJobsWidget } from '@/components/hermes/cron-jobs-widget';
import { MemoryStatusWidget } from '@/components/hermes/memory-status-widget';
import { SkillsInventoryWidget } from '@/components/hermes/skills-inventory-widget';
import { Icon } from '@iconify/react';

export default function SystemPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:server-square-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Hermes System</h1>
          <p className="text-xs text-slate-500">Real-time agent infrastructure monitoring</p>
        </div>
      </div>

      <div className="px-2 space-y-6 animate-slide-up stagger-2">
        <SystemStatusWidget />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HermesGoalsWidget />
          <CronJobsWidget />
        </div>
        <MemoryStatusWidget />
        <SkillsInventoryWidget compact={false} />
      </div>
    </>
  );
}
