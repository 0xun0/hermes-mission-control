import { create } from 'zustand';
import { CommandBarAction, CommandCategory, InstanceType } from '@/types';

export interface CommandStoreState {
  isOpen: boolean;
  query: string;
  recentCommands: string[]; // action IDs
  activeCategory: CommandCategory | null;

  open: () => void;
  close: () => void;
  toggle: () => void;
  setQuery: (query: string) => void;
  setActiveCategory: (category: CommandCategory | null) => void;
  addRecentCommand: (actionId: string) => void;
}

export const useCommandStore = create<CommandStoreState>((set) => ({
  isOpen: false,
  query: '',
  recentCommands: [],
  activeCategory: null,

  open: () => set({ isOpen: true, query: '', activeCategory: null }),
  close: () => set({ isOpen: false, query: '', activeCategory: null }),
  toggle: () => set((state) => ({
    isOpen: !state.isOpen,
    query: state.isOpen ? state.query : '',
    activeCategory: state.isOpen ? state.activeCategory : null,
  })),
  setQuery: (query) => set({ query }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  addRecentCommand: (actionId) =>
    set((state) => ({
      recentCommands: [
        actionId,
        ...state.recentCommands.filter((id) => id !== actionId),
      ].slice(0, 10),
    })),
}));

// ==========================================
// DEFAULT COMMANDS REGISTRY
// ==========================================

export function getDefaultCommands(
  currentRealm: InstanceType,
  callbacks: {
    navigate: (href: string) => void;
    toggleFocusMode: () => void;
    toggleAmbientSound: () => void;
    setRealm: (realm: InstanceType) => void;
  }
): CommandBarAction[] {
  const { navigate, toggleFocusMode, toggleAmbientSound, setRealm } = callbacks;

  return [
    // Realm switching
    {
      id: 'realm-personal',
      label: 'Switch to Personal Life',
      description: 'Your home base',
      icon: 'solar:home-2-linear',
      category: 'realm',
      action: () => { setRealm('personal'); navigate('/personal'); },
    },
    {
      id: 'realm-brand',
      label: 'Switch to Personal Brand',
      description: 'Your magnetic presence',
      icon: 'solar:star-shine-linear',
      category: 'realm',
      action: () => { setRealm('brand'); navigate('/brand'); },
    },
    {
      id: 'realm-business',
      label: 'Switch to Business',
      description: 'Command center',
      icon: 'solar:bolt-linear',
      category: 'realm',
      action: () => { setRealm('business'); navigate('/business'); },
    },
    {
      id: 'realm-nexus',
      label: 'Enter The Nexus',
      description: 'Where we become one',
      icon: 'solar:atom-linear',
      category: 'realm',
      action: () => { setRealm('nexus'); navigate('/nexus'); },
    },

    // Navigation
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      icon: 'solar:home-2-linear',
      category: 'navigation',
      action: () => navigate('/dashboard'),
    },
    {
      id: 'nav-una',
      label: 'Chat with Una',
      icon: 'solar:chat-round-linear',
      category: 'navigation',
      action: () => navigate('/una'),
    },
    {
      id: 'nav-goals',
      label: 'View Goals',
      icon: 'solar:target-linear',
      category: 'navigation',
      action: () => navigate('/goals'),
    },
    {
      id: 'nav-brain',
      label: 'Open Brain',
      icon: 'solar:brain-linear',
      category: 'navigation',
      action: () => navigate('/brain'),
    },
    {
      id: 'nav-bunker',
      label: 'Open Bunker',
      icon: 'solar:shield-star-linear',
      category: 'navigation',
      action: () => navigate('/bunker'),
    },
    {
      id: 'nav-intelligence',
      label: 'Open Intelligence',
      icon: 'solar:cpu-bolt-linear',
      category: 'navigation',
      action: () => navigate('/intelligence'),
    },
    {
      id: 'nav-school',
      label: 'Open School',
      icon: 'solar:square-academic-cap-2-linear',
      category: 'navigation',
      action: () => navigate('/school'),
    },
    {
      id: 'nav-gym',
      label: 'Open Gym',
      icon: 'solar:dumbbell-large-minimalistic-linear',
      category: 'navigation',
      action: () => navigate('/gym'),
    },
    {
      id: 'nav-graph',
      label: 'Open Knowledge Graph',
      icon: 'solar:branching-paths-up-linear',
      category: 'navigation',
      realm: 'nexus',
      action: () => navigate('/nexus/graph'),
    },
    {
      id: 'nav-workbench',
      label: 'Open Workbench',
      icon: 'solar:pen-new-round-linear',
      category: 'navigation',
      realm: 'nexus',
      action: () => navigate('/nexus/workbench'),
    },
    {
      id: 'nav-system',
      label: 'System Status',
      icon: 'solar:server-square-linear',
      category: 'navigation',
      action: () => navigate('/system'),
    },
    {
      id: 'nav-settings',
      label: 'Settings',
      icon: 'solar:settings-linear',
      category: 'navigation',
      action: () => navigate('/settings'),
    },

    // Actions
    {
      id: 'action-focus',
      label: 'Toggle Focus Mode',
      description: 'Deep work mode — hide non-essential UI',
      icon: 'solar:eye-linear',
      category: 'action',
      shortcut: '⇧⌘F',
      action: toggleFocusMode,
    },
    {
      id: 'action-ambient',
      label: 'Toggle Ambient Sound',
      description: 'Realm-specific soundscape',
      icon: 'solar:music-note-2-linear',
      category: 'action',
      action: toggleAmbientSound,
    },
  ];
}
