import { create } from 'zustand';
import { Task } from '@/types';

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  isLoading: false,
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
