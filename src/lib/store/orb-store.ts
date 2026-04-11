import { create } from 'zustand';
import { InstanceType } from '@/types';

export type OrbVariant = 'organic' | 'golden' | 'holographic' | 'cosmic';

export interface OrbStoreState {
  // Position
  x: number;
  y: number;
  isPinned: boolean;
  pinnedEdge: 'left' | 'right' | 'bottom' | null;

  // State
  isDragging: boolean;
  isExpanded: boolean; // Chat is open
  hasNotification: boolean;
  notificationCount: number;

  // Variant derived from realm
  variant: OrbVariant;

  // Actions
  setPosition: (x: number, y: number) => void;
  setDragging: (dragging: boolean) => void;
  setPinned: (pinned: boolean, edge?: 'left' | 'right' | 'bottom') => void;
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  setNotification: (has: boolean, count?: number) => void;
  updateVariantForRealm: (realm: InstanceType) => void;
}

function getVariantForRealm(realm: InstanceType): OrbVariant {
  switch (realm) {
    case 'personal': return 'organic';
    case 'brand': return 'golden';
    case 'business': return 'holographic';
    case 'nexus': return 'cosmic';
    default: return 'organic';
  }
}

export const useOrbStore = create<OrbStoreState>((set) => ({
  // Default position: bottom-right
  x: typeof window !== 'undefined' ? window.innerWidth - 80 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight - 100 : 0,
  isPinned: true,
  pinnedEdge: 'right',

  isDragging: false,
  isExpanded: false,
  hasNotification: false,
  notificationCount: 0,

  variant: 'organic',

  setPosition: (x, y) => set({ x, y }),
  setDragging: (dragging) => set({ isDragging: dragging }),
  setPinned: (pinned, edge) => set({ isPinned: pinned, pinnedEdge: edge ?? null }),
  setExpanded: (expanded) => set({ isExpanded: expanded }),
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setNotification: (has, count) => set({ hasNotification: has, notificationCount: count ?? 0 }),
  updateVariantForRealm: (realm) => set({ variant: getVariantForRealm(realm) }),
}));
