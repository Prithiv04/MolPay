import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bitcoin, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useMolpayStore } from '../../store/molpayStore';
import { createEscrowTask, BOT_ACCOUNTS } from '../../lib/contracts';

const taskSchema = z.object({
  description: z.string().min(10, "Task description must be at least 10 characters").max(280),
  reward: z.string().min(1, "Reward amount is required"),
  maxWorkers: z.string().min(1, "Please select workers count"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

const CreateTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const addTask = useMolpayStore(state => state.addTask);
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: TaskFormValues) => {
    const taskId = Math.floor(Math.random() * 1000000); // For demo, using random uint
    const rewardMicro = parseFloat(data.reward) * 100000000; // Convert to sBTC units (8 decimals)
    
    await createEscrowTask(
      taskId,
      BOT_ACCOUNTS.WORKER,
      BOT_ACCOUNTS.VERIFIER,
      rewardMicro,
      (payload) => {
        console.log("Transaction Broadcasted:", payload.txId);
        addTask({
          description: data.description,
          escrow: parseFloat(data.reward),
          workers: parseInt(data.maxWorkers)
        }, payload.txId);
        reset();
        onClose();
      },
      () => {
        // Graceful fallback for demo when testnet sBTC balance is missing or transaction rejected
        console.log("Transaction rejected by wallet - fallback to UI demo mode");
        
        toast.success("✅ Task escrowed to WorkerBot! (Demo)", {
          style: {
            background: '#1E293B',
            color: '#fff',
            border: '1px solid #334155'
          }
        });
        
        // Update UI state manually to simulate successful escrow
        addTask({
          description: data.description,
          escrow: parseFloat(data.reward),
          workers: parseInt(data.maxWorkers)
        }, "0x" + Math.random().toString(16).slice(2, 66)); // Mock txId
        
        reset();
        onClose();
      }
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex justify-center items-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700/50 shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden m-4"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white">Deploy AI Task</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">✍️ Task Description</label>
                  <textarea 
                    {...register('description')}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-24"
                    placeholder="e.g. Write a 500-word SEO optimized summary about Bitcoin Layer 2s"
                  />
                  {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1">
                      <Bitcoin className="w-4 h-4 text-sbtc-gold" /> Reward (sBTC)
                    </label>
                    <input 
                      type="number" step="0.0001"
                      {...register('reward')}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="0.001"
                    />
                    {errors.reward && <p className="text-rose-400 text-xs mt-1">{errors.reward.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-1">
                      <Users className="w-4 h-4 text-blue-400" /> Max Workers
                    </label>
                    <select 
                      {...register('maxWorkers')}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                    >
                      <option value="1">1 Worker</option>
                      <option value="3">3 Workers</option>
                      <option value="5">5 Workers</option>
                      <option value="10">10 Workers</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    Est. Gas: <span className="text-slate-200">0.0005 STX</span>
                  </div>
                  <button 
                    type="submit" 
                    disabled={!isValid}
                    className={`btn-primary px-6 ${!isValid && 'opacity-50 cursor-not-allowed hover:transform-none'}`}
                  >
                    Lock Escrow & Deploy
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateTaskModal;
