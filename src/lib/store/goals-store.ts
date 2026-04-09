import { create } from 'zustand';
import { Goal } from '@/types';

export interface GoalsState {
  goals: Goal[];
  isLoading: boolean;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setGoals: (goals: Goal[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useGoalsStore = create<GoalsState>((set) => ({
  goals: [],
  isLoading: false,
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoal: (id, updates) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    })),
  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    })),
  setGoals: (goals) => set({ goals }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
