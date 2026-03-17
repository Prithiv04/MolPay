import { motion } from 'framer-motion';
import { Bot as BotIcon, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useMolpayStore } from '../../store/molpayStore';

const BotCards = () => {
  const { bots } = useMolpayStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Processing': return <Clock className="w-5 h-5 text-amber-400" />;
      case 'Idle': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default: return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {bots.map((bot, i) => (
        <motion.div
          key={bot.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)' }}
          className="glass-panel p-6 border-t-2 transition-all cursor-pointer relative overflow-hidden"
          style={{
            borderTopColor: bot.status === 'Active' ? '#10B981' : bot.status === 'Processing' ? '#F59E0B' : '#F43F5E'
          }}
        >
          {/* Background Glow */}
          <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 bg-${bot.color}-500 pointer-events-none`}></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-${bot.color}-500/10`}>
                <BotIcon className={`w-6 h-6 text-${bot.color}-400`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{bot.name}</h3>
                <div className="flex items-center text-sm font-medium mt-1">
                  {getStatusIcon(bot.status)}
                  <span className={`ml-1 text-${bot.color}-400`}>{bot.status}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mt-6 relative z-10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Tasks Completed</span>
              <span className="text-white font-bold">{bot.tasksCompleted}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">Success Rate</span>
              <span className="text-emerald-400 font-medium">{bot.successRate}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5">
              <span className="text-slate-400">Total Earned</span>
              <span className="text-sbtc-gold font-bold">₿ {bot.earned} sBTC</span>
            </div>
          </div>
          
        </motion.div>
      ))}
    </div>
  );
};

export default BotCards;
