import { create } from 'zustand';
import { InstanceType } from '@/types';

export interface InstanceState {
  currentInstance: InstanceType;
  animationEnabled: boolean;
  sidebarCollapsed: boolean;
  isSidebarOpen: boolean;

  // Activity Sidebar (desktop)
  isActivityOpen: boolean;

  // Focus Mode
  focusModeActive: boolean;

  // Ambient Sound
  ambientSoundEnabled: boolean;
  ambientSoundVolume: number; // 0-100

  // Actions
  setCurrentInstance: (instance: InstanceType) => void;
  toggleAnimation: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActivityOpen: (isOpen: boolean) => void;
  toggleActivityOpen: () => void;
  toggleFocusMode: () => void;
  setFocusMode: (active: boolean) => void;
  toggleAmbientSound: () => void;
  setAmbientSoundVolume: (volume: number) => void;
}

export const useInstanceStore = create<InstanceState>((set) => ({
  currentInstance: 'personal',
  animationEnabled: true,
  sidebarCollapsed: false,
  isSidebarOpen: false,

  isActivityOpen: true,

  focusModeActive: false,

  ambientSoundEnabled: false,
  ambientSoundVolume: 30,

  setCurrentInstance: (instance) => set({ currentInstance: instance }),
  toggleAnimation: () => set((state) => ({ animationEnabled: !state.animationEnabled })),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActivityOpen: (isOpen) => set({ isActivityOpen: isOpen }),
  toggleActivityOpen: () => set((state) => ({ isActivityOpen: !state.isActivityOpen })),
  toggleFocusMode: () => set((state) => ({ focusModeActive: !state.focusModeActive })),
  setFocusMode: (active) => set({ focusModeActive: active }),
  toggleAmbientSound: () => set((state) => ({ ambientSoundEnabled: !state.ambientSoundEnabled })),
  setAmbientSoundVolume: (volume) => set({ ambientSoundVolume: Math.max(0, Math.min(100, volume)) }),
}));
