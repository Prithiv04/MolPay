import { motion } from 'framer-motion';
import { Bitcoin, Bot, CheckCircle2, Activity } from 'lucide-react';
import { useMolpayStore } from '../../store/molpayStore';

const HeroStats = () => {
  const { balance, sbtcBalance, tasks, bots } = useMolpayStore();
  
  // Calculate average success rate from real bots
  const avgSuccessRate = bots.length > 0 
    ? (bots.reduce((acc, bot) => acc + parseFloat(bot.successRate || '0'), 0) / bots.length).toFixed(1) + '%'
    : '98.7%';

  const stats = [
    { 
      label: 'Escrow (sBTC)', 
      value: sbtcBalance.toFixed(4), 
      icon: <Bitcoin className="text-sbtc-gold w-6 h-6" />, 
      change: 'Live' 
    },
    { 
      label: 'Wallet (STX)', 
      value: balance.toFixed(2), 
      icon: <Activity className="text-blue-400 w-6 h-6" />, 
      change: 'Sync' 
    },
    { 
      label: 'Tasks Live', 
      value: tasks.filter(t => t.status === 'Active' || t.status === 'Processing').length.toString(), 
      icon: <Bot className="text-purple-400 w-6 h-6" />, 
      change: 'Active' 
    },
    { 
      label: 'Success Rate', 
      value: avgSuccessRate, 
      icon: <CheckCircle2 className="text-success-green w-6 h-6" />, 
      change: '+0.2%' 
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-panel p-6 flex flex-col relative overflow-hidden group hover:border-blue-500/30 transition-colors"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
            {stat.icon}
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-sm font-medium text-slate-400">{stat.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${stat.change.includes('+') || stat.change === 'Live' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
              {stat.change}
            </span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-white mb-1 relative z-10 flex items-center gap-2">
            {stat.label.includes('sBTC') && <span className="text-sbtc-gold">₿</span>}
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroStats;
