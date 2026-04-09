export type InstanceType = 'personal' | 'brand' | 'business';

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

// ==========================================
// TASK
// ==========================================
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  instance: InstanceType;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  assignee?: string;
  subtasks?: SubTask[];
  goalId?: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

// ==========================================
// GOAL
// ==========================================
export interface Goal {
  id: string;
  title: string;
  description?: string;
  instance: InstanceType;
  progress: number; // 0-100
  deadline?: Date;
  milestones?: Milestone[];
  linkedTasks?: string[]; // Task IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

// ==========================================
// CALENDAR EVENT
// ==========================================
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  instance: InstanceType;
  startDate: Date;
  endDate?: Date;
  allDay: boolean;
  location?: string;
  reminder?: number; // minutes before
  recurring?: RecurringConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurringConfig {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
}

// ==========================================
// HABIT
// ==========================================
export interface Habit {
  id: string;
  title: string;
  description?: string;
  instance: InstanceType;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  completions: HabitCompletion[];
  createdAt: Date;
}

export interface HabitCompletion {
  date: Date;
  completed: boolean;
}

// ==========================================
// CONTACT (CRM)
// ==========================================
export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  notes?: string;
  tags?: string[];
  instance: InstanceType;
  lastInteraction?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// DEAL (CRM Pipeline)
// ==========================================
export interface Deal {
  id: string;
  title: string;
  contactId: string;
  stage: DealStage;
  value?: number;
  currency?: string;
  instance: InstanceType;
  expectedCloseDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// CONTENT (Brand)
// ==========================================
export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  platform: 'instagram' | 'twitter' | 'youtube' | 'linkedin' | 'blog' | 'podcast';
  status: 'ideation' | 'creating' | 'scheduling' | 'published';
  instance: InstanceType;
  publishDate?: Date;
  content?: string;
  mediaUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// COUNCIL / AGENT
// ==========================================
export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  specialty: string;
  description?: string;
}

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface CouncilMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  agentId?: string; // If from a specific agent
  timestamp: Date;
}

// ==========================================
// INSTANCE CONFIG
// ==========================================
export interface InstanceConfig {
  type: InstanceType;
  label: string;
  icon: string;
  tagline: string;
  kanbanColumns: KanbanColumn[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: TaskStatus;
}

export const INSTANCE_CONFIGS: Record<InstanceType, InstanceConfig> = {
  personal: {
    type: 'personal',
    label: 'Personal Life',
    icon: '🏠',
    tagline: 'Your home base',
    kanbanColumns: [
      { id: 'todo', title: 'To Do', status: 'todo' },
      { id: 'in_progress', title: 'In Progress', status: 'in_progress' },
      { id: 'review', title: 'Review', status: 'review' },
      { id: 'done', title: 'Done', status: 'done' },
    ],
  },
  brand: {
    type: 'brand',
    label: 'Personal Brand',
    icon: '✦',
    tagline: 'Your magnetic presence',
    kanbanColumns: [
      { id: 'ideation', title: 'Ideation', status: 'todo' },
      { id: 'creating', title: 'Creating', status: 'in_progress' },
      { id: 'scheduling', title: 'Scheduling', status: 'review' },
      { id: 'published', title: 'Published', status: 'done' },
    ],
  },
  business: {
    type: 'business',
    label: 'Business',
    icon: '⚡',
    tagline: 'Command center',
    kanbanColumns: [
      { id: 'backlog', title: 'Backlog', status: 'todo' },
      { id: 'sprint', title: 'Sprint', status: 'in_progress' },
      { id: 'in_dev', title: 'In Dev', status: 'review' },
      { id: 'done', title: 'Done', status: 'done' },
      { id: 'blocked', title: 'Blocked', status: 'blocked' },
    ],
  },
};

// ==========================================
// NAVIGATION
// ==========================================
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  instance?: InstanceType;
  badge?: number;
}

export const NAV_ITEMS: Record<InstanceType, NavItem[]> = {
  personal: [
    { id: 'home', label: 'Home', icon: 'home', href: '/personal' },
    { id: 'tasks', label: 'Tasks', icon: 'check-square', href: '/personal/tasks' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', href: '/personal/calendar' },
    { id: 'goals', label: 'Goals', icon: 'target', href: '/personal/goals' },
    { id: 'habits', label: 'Habits', icon: 'repeat', href: '/personal/habits' },
    { id: 'system', label: 'System', icon: 'server', href: '/system' },
  ],
  brand: [
    { id: 'home', label: 'Home', icon: 'home', href: '/brand' },
    { id: 'content', label: 'Content', icon: 'edit', href: '/brand/content' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', href: '/brand/calendar' },
    { id: 'social', label: 'Social', icon: 'share-2', href: '/brand/social' },
    { id: 'portfolio', label: 'Portfolio', icon: 'image', href: '/brand/portfolio' },
    { id: 'system', label: 'System', icon: 'server', href: '/system' },
  ],
  business: [
    { id: 'home', label: 'Home', icon: 'home', href: '/business' },
    { id: 'tasks', label: 'Tasks', icon: 'check-square', href: '/business/tasks' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', href: '/business/calendar' },
    { id: 'crm', label: 'CRM', icon: 'users', href: '/business/crm' },
    { id: 'projects', label: 'Projects', icon: 'folder', href: '/business/projects' },
    { id: 'system', label: 'System', icon: 'server', href: '/system' },
  ],
};

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', href: '/personal' },
  { id: 'tasks', label: 'Tasks', icon: 'check-square', href: '/tasks' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', href: '/calendar' },
  { id: 'council', label: 'Council', icon: 'users', href: '/council' },
  { id: 'profile', label: 'Profile', icon: 'user', href: '/profile' },
];
