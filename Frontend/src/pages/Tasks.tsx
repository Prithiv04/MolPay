import { useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import TaskTable from '../components/Tasks/TaskTable';
import CreateTaskModal from '../components/Tasks/CreateTaskModal';
import { useMolpayStore } from '../store/molpayStore';

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { txHistory } = useMolpayStore();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            AI Operations <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Escrow</span>
          </h1>
          <p className="text-lg text-slate-400">Monitor and manage agent microtasks on the Stacks network.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary py-3 px-8 text-lg shadow-xl shadow-blue-500/20 whitespace-nowrap flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Deploy New Task
        </button>
      </div>

      <TaskTable />
      
      {txHistory.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Recent On-Chain Transactions
          </h3>
          <div className="glass-panel p-4 space-y-3">
            {txHistory.map((tx, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 px-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <span className="text-slate-400 mr-2">TX ID:</span>
                  <span className="text-blue-400 font-mono">{tx.slice(0, 10)}...{tx.slice(-8)}</span>
                </div>
                <a 
                  href={`https://explorer.hiro.so/txid/${tx}?chain=testnet`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center text-xs text-slate-500 hover:text-white transition-colors"
                >
                  View on Explorer <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Tasks;
