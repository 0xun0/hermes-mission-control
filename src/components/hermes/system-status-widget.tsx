'use client';

import { useHermesStore } from '@/lib/store/hermes-store';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export function SystemStatusWidget() {
  const systemStatus = useHermesStore(s => s.systemStatus);
const gateway = useHermesStore(s => s.gateway);
const platforms = useHermesStore(s => s.platforms);
const activeModel = useHermesStore(s => s.activeModel);
const fetchStatus = useHermesStore(s => s.fetchStatus);;

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const isOnline = systemStatus === 'online';
  const isLoading = systemStatus === 'loading';

  return (
    <div className="neu-card rounded-2xl p-4 md:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Status dot */}
          <span className={cn(
            'w-2.5 h-2.5 rounded-full shrink-0',
            isOnline
              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
              : isLoading
              ? 'bg-slate-500 animate-pulse'
              : 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]'
          )} />
          <div>
            <h3 className="text-sm font-medium text-slate-200">Hermes Gateway</h3>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {isLoading
                ? 'Checking...'
                : isOnline
                ? `model: ${activeModel || '—'}`
                : 'Gateway offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Platform badges */}
          {isOnline && platforms && Object.entries(platforms).map(([key, val]) => {
            const connected = val.state === 'connected' || val.state === 'running';
            return (
              <div
                key={key}
                className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center',
                  connected
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-[#1a1d24] text-slate-600'
                )}
                title={`${key}: ${val.state}`}
              >
                <Icon
                  icon={key === 'telegram' ? 'solar:chat-round-linear' : key === 'discord' ? 'solar:gamepad-linear' : 'solar:widget-linear'}
                  width={14}
                />
              </div>
            );
          })}

          {/* Refresh */}
          <button
            onClick={fetchStatus}
            className="w-7 h-7 rounded-lg bg-[#1a1d24] border border-[#333a47]/30 flex items-center justify-center text-slate-500 hover:text-orange-400 transition-colors"
          >
            <Icon icon="solar:refresh-linear" width={14} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
