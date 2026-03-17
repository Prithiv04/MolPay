import { create } from 'zustand';
import { getStxBalance, getSbtcBalance, fetchBotStats } from '../api/hiro';

export interface Task {
  id: string;
  description: string;
  status: 'Active' | 'Processing' | 'Completed' | 'Paid' | 'Error';
  escrow: number;
  workers: number;
}

export interface Bot {
  name: string;
  status: 'Active' | 'Processing' | 'Idle' | 'Error';
  task?: string;
  metric?: string;
  color: string;
  rank?: number;
  tasksCompleted?: number;
  successRate?: string;
  earned?: number;
}

interface MolpayState {
  balance: number;
  sbtcBalance: number;
  tasks: Task[];
  bots: Bot[];
  isWalletConnected: boolean;
  userAddress: string | null;
  txHistory: string[];
  
  // Actions
  connectWallet: (address: string) => void;
  depositBalance: (amount: number) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>, txId?: string) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  initRealData: (userAddress: string) => Promise<void>;
}

export const useMolpayStore = create<MolpayState>((set) => ({
  balance: 0,
  sbtcBalance: 0,
  isWalletConnected: false,
  userAddress: null,
  txHistory: [],
  
  tasks: [
    { id: '1', description: 'Write SEO summary about Bitcoin Layer 2s', status: 'Active', escrow: 0.001, workers: 3 },
    { id: '2', description: 'Generate 5 hero image variants', status: 'Processing', escrow: 0.002, workers: 5 },
    { id: '3', description: 'Verify smart contract deployment logs', status: 'Completed', escrow: 0.005, workers: 1 },
    { id: '4', description: 'Transcribe 10min podcast episode', status: 'Active', escrow: 0.0015, workers: 2 },
  ],
  
  bots: [
    { 
      name: 'Verifier-Alpha', 
      status: 'Active', 
      color: 'amber', 
      metric: '99% accuracy', 
      task: '"Verifying Layer-2 data"',
      rank: 1,
      tasksCompleted: 1247,
      successRate: '99.2%',
      earned: 0.045
    },
    { 
      name: 'WorkerBot-Pro', 
      status: 'Processing', 
      color: 'slate', 
      metric: '5 tasks queue', 
      task: '"Generating content..."',
      rank: 2,
      tasksCompleted: 892,
      successRate: '97.8%',
      earned: 0.032
    },
    { 
      name: 'PosterBot-v2', 
      status: 'Active', 
      color: 'orange', 
      metric: '0.001 sBTC', 
      task: '"Writing social summary"',
      rank: 3,
      tasksCompleted: 456,
      successRate: '95.1%',
      earned: 0.018
    }
  ],

  connectWallet: (address) => set({ 
    isWalletConnected: true, 
    userAddress: address 
  }),
  
  depositBalance: (amount) => set((state) => ({ 
    sbtcBalance: state.sbtcBalance + amount 
  })),

  addTask: (task, txId) => set((state) => ({
    tasks: [
      { ...task, id: Math.random().toString(36).substr(2, 9), status: 'Active' },
      ...state.tasks
    ],
    sbtcBalance: state.sbtcBalance - task.escrow,
    txHistory: txId ? [txId, ...state.txHistory] : state.txHistory
  })),

  updateTaskStatus: (id, status) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, status } : t)
  })),

  initRealData: async (userAddress: string) => {
    try {
      const [stxBalance, sbtcBalance, realBotStats] = await Promise.all([
        getStxBalance(userAddress),
        getSbtcBalance(userAddress),
        fetchBotStats()
      ]);
      
      set((state) => {
        const updatedBots = state.bots.map((bot: Bot) => {
          const stats = realBotStats.find(s => 
            s.principal.includes(bot.name.split('-')[0]) || 
            (bot.name.includes('Alpha') && s.principal.includes('ST13'))
          );
          if (stats) {
            return {
              ...bot,
              tasksCompleted: stats.tasksCompleted,
              earned: stats.totalEarned,
              successRate: `${stats.successRate}%`
            };
          }
          return bot;
        });

        return { 
          balance: stxBalance,
          sbtcBalance: sbtcBalance,
          bots: updatedBots
        };
      });

      console.log('Real data initialized for:', userAddress);
      console.log('STX Balance:', stxBalance, 'sBTC Balance:', sbtcBalance);
    } catch (error) {
      console.error('Failed to init real data:', error);
    }
  },
}));
