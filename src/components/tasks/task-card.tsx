'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 h-[120px] min-h-[120px] items-center flex text-left border-2 border-primary rounded-xl px-3 py-2 bg-secondary"
      />
    );
  }

  const priorityColor = {
    low: 'bg-blue-500/10 text-blue-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    high: 'bg-orange-500/10 text-orange-500',
    urgent: 'bg-red-500/10 text-red-500',
  }[task.priority];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group relative p-4 mb-3 cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-primary/50 transition-all border-border bg-surface shadow-sm",
        task.status === 'done' && "opacity-60"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn(
            "text-sm font-semibold text-text-primary leading-tight",
            task.status === 'done' && "line-through text-text-secondary"
          )}>
            {task.title}
          </h4>
          <button className="text-text-secondary hover:text-text-primary">
            <Icon icon="solar:menu-dots-vertical-linear" width={16} />
          </button>
        </div>

        {task.description && (
          <p className="text-xs text-text-secondary line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 mt-1">
          <Badge className={cn("text-[10px] px-1.5 py-0 uppercase font-bold", priorityColor)}>
            {task.priority}
          </Badge>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 text-[10px] text-text-secondary">
              <Icon icon="solar:calendar-linear" width={12} />
              <span>{format(new Date(task.dueDate), 'MMM d')}</span>
            </div>
          )}

          {task.subtasks && task.subtasks.length > 0 && (
            <div className="flex items-center gap-1 text-[10px] text-text-secondary">
              <Icon icon="solar:check-circle-bold" width={12} />
              <span>
                {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
