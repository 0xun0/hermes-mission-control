'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function WorkbenchPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:pen-new-round-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Workbench</h1>
          <p className="text-xs text-slate-500">Co-create with Una — personas, voices, identities</p>
        </div>
      </div>

      {/* Creation Studios */}
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up stagger-2">
        <WorkbenchCard
          href="/brain/personas/new"
          icon="solar:masks-linear"
          title="Persona Studio"
          description="Create and edit custom AI personalities with unique system prompts, tones, and voices"
          count="3 personas"
          iconColor="text-orange-500"
          borderColor="border-orange-500/20"
        />
        <WorkbenchCard
          href="/brain/voices"
          icon="solar:microphone-3-linear"
          title="Voice Lab"
          description="Configure TTS/STT providers, custom voices, and audio settings"
          count="2 voices"
          iconColor="text-slate-400"
          borderColor="border-[#333a47]/40"
        />
        <WorkbenchCard
          href="/brain/id"
          icon="solar:document-text-linear"
          title="Identity Editor"
          description="Edit SOUL.md, IDENTITY.md, USER.md, and other core documents"
          count="5 documents"
          iconColor="text-orange-400"
          borderColor="border-orange-500/20"
        />
        <WorkbenchCard
          href="/brain/skills"
          icon="solar:widget-linear"
          title="Skill Forge"
          description="View, configure, and manage installed skills"
          count="16 skills"
          iconColor="text-green-500"
          borderColor="border-green-500/20"
        />
        <WorkbenchCard
          href="/intelligence/workflows"
          icon="solar:route-linear"
          title="Flow Designer"
          description="Build and edit automation workflows visually"
          count="2 flows"
          iconColor="text-sky-400"
          borderColor="border-sky-500/20"
        />
        <WorkbenchCard
          href="/intelligence/commands"
          icon="solar:command-linear"
          title="Command Builder"
          description="Create custom agent commands and macros"
          count="6 commands"
          iconColor="text-slate-300"
          borderColor="border-[#333a47]/40"
        />
      </div>

      {/* Recent Creations */}
      <div className="px-2 animate-slide-up stagger-3">
        <h2 className="text-sm font-medium text-slate-400 mb-3">Recent Creations</h2>
        <div className="space-y-2">
          {[
            { name: 'Strategic Advisor', type: 'Persona', icon: 'solar:masks-linear', color: 'text-orange-400', time: '2h ago' },
            { name: 'SOUL.md v3', type: 'Identity Doc', icon: 'solar:document-text-linear', color: 'text-slate-400', time: '1d ago' },
            { name: 'Morning Briefing', type: 'Workflow', icon: 'solar:route-linear', color: 'text-sky-400', time: '3d ago' },
          ].map((item) => (
            <div key={item.name} className="neu-card rounded-xl p-4 flex items-center gap-3">
              <Icon icon={item.icon} className={item.color} width={18} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{item.name}</p>
                <p className="text-[10px] text-slate-500">{item.type}</p>
              </div>
              <span className="text-[10px] text-slate-600">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function WorkbenchCard({
  href,
  icon,
  title,
  description,
  count,
  iconColor,
  borderColor,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  count: string;
  iconColor: string;
  borderColor: string;
}) {
  return (
    <Link href={href} className="neu-card rounded-2xl p-5 group hover:border-[#333a47]/60 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-[#0c0e12] border ${borderColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8)]`}>
          <Icon icon={icon} className={iconColor} width={20} />
        </div>
        <span className="text-[10px] text-slate-600 font-mono">{count}</span>
      </div>
      <h3 className="text-sm font-medium text-slate-200 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </Link>
  );
}
