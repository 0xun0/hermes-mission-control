'use client';

import { useState } from 'react';
import { useInstanceStore } from '@/lib/store/instance-store';
import { INSTANCE_CONFIGS, Task, TaskStatus } from '@/types';
import { KanbanBoard } from '@/components/tasks/kanban-board';
import { CalendarView } from '@/components/calendar/calendar-view';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Calendar as CalendarIcon, 
  Table as TableIcon, 
  Clock, 
  GanttChart, 
  CreditCard,
  Plus,
  Search
} from 'lucide-react';

// Mock tasks for demonstration
const initialTasks: Task[] = [
  { id: '1', title: 'Review quarterly goals', status: 'todo', priority: 'high', instance: 'personal', createdAt: new Date(), updatedAt: new Date(), dueDate: new Date(Date.now() + 86400000) },
  { id: '2', title: 'Schedule dentist appointment', status: 'todo', priority: 'medium', instance: 'personal', createdAt: new Date(), updatedAt: new Date(), dueDate: new Date(Date.now() + 172800000) },
  { id: '3', title: 'Update budget spreadsheet', status: 'in_progress', priority: 'low', instance: 'personal', createdAt: new Date(), updatedAt: new Date() },
  { id: '4', title: 'Finish project proposal', status: 'review', priority: 'high', instance: 'personal', createdAt: new Date(), updatedAt: new Date(), dueDate: new Date(Date.now() + 259200000) },
  { id: '5', title: 'Call contractor', status: 'todo', priority: 'urgent', instance: 'personal', createdAt: new Date(), updatedAt: new Date() },
];

type ViewMode = 'kanban' | 'list' | 'calendar' | 'table' | 'timeline' | 'gantt' | 'cards';

export default function TasksPage() {
  const { currentInstance } = useInstanceStore();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const instanceConfig = INSTANCE_CONFIGS[currentInstance];
  const columns = instanceConfig.kanbanColumns;

  const handleTaskMove = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus as TaskStatus } : t));
  };

  const calendarEvents = tasks.map(t => ({
    id: t.id,
    title: t.title,
    startDate: t.dueDate || t.createdAt,
    endDate: t.dueDate || t.createdAt,
    allDay: true,
    instance: t.instance,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }));

  return (
    <div className="space-y-4 md:space-y-6 flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)]">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-text-primary">Tasks</h1>
          <p className="text-text-secondary text-xs md:text-sm">Manage your {instanceConfig.label} tasks</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
          {/* Search/Filter Bar */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="pl-9 pr-4 py-2 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 w-full sm:w-48 lg:w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex-1 sm:flex-initial flex items-center gap-1 p-1 bg-surface border border-border rounded-xl overflow-x-auto scrollbar-hide">
              <ViewButton mode="kanban" current={viewMode} onClick={setViewMode} icon={<LayoutGrid className="w-4 h-4" />} label="Kanban" />
              <ViewButton mode="list" current={viewMode} onClick={setViewMode} icon={<ListIcon className="w-4 h-4" />} label="List" />
              <ViewButton mode="calendar" current={viewMode} onClick={setViewMode} icon={<CalendarIcon className="w-4 h-4" />} label="Calendar" />
              <ViewButton mode="table" current={viewMode} onClick={setViewMode} icon={<TableIcon className="w-4 h-4" />} label="Table" />
            </div>

            <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-accent text-bg-primary rounded-xl font-bold text-sm hover:scale-105 transition-transform active:scale-95 flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 md:pr-2 custom-scrollbar pb-10 md:pb-0">
        {viewMode === 'kanban' && (
          <KanbanBoard 
            columns={columns} 
            tasks={tasks.filter(t => t.instance === currentInstance)} 
            onTaskMove={handleTaskMove}
          />
        )}

        {viewMode === 'list' && (
          <div className="space-y-2">
            {tasks.filter(t => t.instance === currentInstance).map(task => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </div>
        )}

        {viewMode === 'calendar' && (
          <CalendarView events={calendarEvents.filter(e => e.instance === currentInstance)} />
        )}

        {(viewMode === 'table' || viewMode === 'timeline' || viewMode === 'gantt' || viewMode === 'cards') && (
          <Card className="flex flex-col items-center justify-center py-20 bg-surface border-border border-dashed">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              {viewMode === 'table' ? <TableIcon className="w-8 h-8 text-accent" /> :
               viewMode === 'timeline' ? <Clock className="w-8 h-8 text-accent" /> :
               viewMode === 'gantt' ? <GanttChart className="w-8 h-8 text-accent" /> :
               <CreditCard className="w-8 h-8 text-accent" />}
            </div>
            <h3 className="text-lg font-bold text-text-primary capitalize">{viewMode} View</h3>
            <p className="text-sm text-text-secondary max-w-xs text-center mt-2">
              This specialized view is under development and will be available in the next release.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

function ViewButton({ mode, current, onClick, icon, label }: { mode: ViewMode, current: ViewMode, onClick: (m: ViewMode) => void, icon: React.ReactNode, label: string }) {
  const isActive = mode === current;
  return (
    <button
      onClick={() => onClick(mode)}
      className={cn(
        'p-2 rounded-lg transition-all flex items-center gap-2 group',
        isActive 
          ? 'bg-accent text-bg-primary shadow-lg shadow-accent/20' 
          : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
      )}
      title={label}
    >
      {icon}
      {isActive && <span className="text-xs font-bold hidden xl:inline pr-1">{label}</span>}
    </button>
  );
}

function TaskListItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/30 transition-all group">
      <div className="w-5 h-5 rounded border-2 border-border group-hover:border-accent/50 cursor-pointer" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary truncate">{task.title}</p>
        <div className="flex items-center gap-3 mt-1">
          <Badge variant="default" size="sm" className="capitalize text-[10px] py-0">{task.status.replace('_', ' ')}</Badge>
          {task.dueDate && (
            <span className="text-[10px] text-text-secondary flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <Badge 
        variant={task.priority === 'urgent' || task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'}
        size="sm"
        className="hidden sm:inline-flex"
      >
        {task.priority}
      </Badge>
    </div>
  );
}
