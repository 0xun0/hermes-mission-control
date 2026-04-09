import { create } from 'zustand';
import { Agent, CouncilMessage } from '@/types';

export interface CouncilState {
  agents: Agent[];
  messages: CouncilMessage[];
  isLoading: boolean;
  addMessage: (message: Omit<CouncilMessage, 'id' | 'timestamp'>) => void;
  setAgents: (agents: Agent[]) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

let messageIdCounter = 0;

export const useCouncilStore = create<CouncilState>((set) => ({
  agents: [],
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `council-msg-${++messageIdCounter}`,
          timestamp: new Date(),
        },
      ],
    })),
  setAgents: (agents) => set({ agents }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));
