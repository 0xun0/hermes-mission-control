import { create } from 'zustand';
import { InstanceType } from '@/types';

export interface InstanceState {
  currentInstance: InstanceType;
  animationEnabled: boolean;
  sidebarCollapsed: boolean;
  isSidebarOpen: boolean;
  setCurrentInstance: (instance: InstanceType) => void;
  toggleAnimation: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useInstanceStore = create<InstanceState>((set) => ({
  currentInstance: 'personal',
  animationEnabled: true,
  sidebarCollapsed: false,
  isSidebarOpen: false,
  setCurrentInstance: (instance) => set({ currentInstance: instance }),
  toggleAnimation: () => set((state) => ({ animationEnabled: !state.animationEnabled })),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
}));
