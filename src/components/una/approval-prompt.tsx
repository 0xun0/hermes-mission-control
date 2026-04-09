'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';

interface ApprovalPromptProps {
  id: string;
  action: string;
  details: string;
  tool_used?: string[];
  onApprove: (id: string) => void;
  onDeny: (id: string) => void;
}

export function ApprovalPrompt({
  id,
  action,
  details,
  tool_used,
  onApprove,
  onDeny,
}: ApprovalPromptProps) {
  return (
    <div
      className={cn(
        'p-3 rounded-[var(--radius-md)] bg-warning/10 border border-warning/30'
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <Icon icon="solar:danger-triangle-linear" className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-warning">{action}</p>
          <p className="text-xs text-text-secondary mt-0.5">{details}</p>
        </div>
      </div>

      {/* Tools used */}
      {tool_used && tool_used.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tool_used.map((tool, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 rounded-[var(--radius-sm)] bg-surface text-xs text-text-secondary"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => onApprove(id)}
          leftIcon={<Icon icon="solar:check-circle-linear" className="w-3 h-3" />}
          className="flex-1 bg-success hover:bg-success/90"
        >
          Approve
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeny(id)}
          leftIcon={<Icon icon="solar:close-circle-linear" className="w-3 h-3" />}
        >
          Deny
        </Button>
      </div>
    </div>
  );
}
