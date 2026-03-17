import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, Bitcoin } from 'lucide-react';
import { useMolpayStore } from '../../store/molpayStore';

const BotPodium = () => {
  const { bots } = useMolpayStore();
  
  const podiumBots = bots
    .filter(b => b.rank !== undefined)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  return (
    <div className="glass-panel p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center mb-8">
        <Trophy className="w-6 h-6 text-amber-400 mr-3" />
        <h2 className="text-xl font-bold text-white">Top Performing Bots</h2>
      </div>

      <div className="flex items-end justify-center h-64 gap-2 sm:gap-6">
        {podiumBots.map((bot) => {
          const height = bot.rank === 1 ? '100%' : bot.rank === 2 ? '75%' : '60%';
          const delay = bot.rank === 1 ? 0.4 : bot.rank === 2 ? 0.2 : 0.6;
          
          return (
            <div key={bot.name} className="flex flex-col items-center flex-1 max-w-[120px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay }}
                className="text-center mb-4 z-10"
              >
                <div className="font-bold text-white text-sm sm:text-base truncate w-full px-2" title={bot.name}>
                  {bot.name}
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-success-green mr-1" />
                  {bot.successRate}
                </div>
              </motion.div>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height, opacity: 1 }}
                transition={{ duration: 0.8, delay, ease: "easeOut" }}
                className={`w-full rounded-t-xl relative overflow-hidden flex flex-col items-center justify-start pt-4 group
                  ${bot.rank === 1 ? 'bg-gradient-to-t from-amber-500/20 to-amber-500/40 border-t-2 border-amber-400' : ''}
                  ${bot.rank === 2 ? 'bg-gradient-to-t from-slate-400/10 to-slate-400/30 border-t-2 border-slate-300' : ''}
                  ${bot.rank === 3 ? 'bg-gradient-to-t from-orange-400/10 to-orange-400/30 border-t-2 border-orange-400' : ''}
                `}
              >
                <div className={`text-4xl font-black opacity-30 
                  ${bot.rank === 1 ? 'text-amber-400' : bot.rank === 2 ? 'text-slate-300' : 'text-orange-400'}`}>
                  {bot.rank}
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-sm font-medium text-sbtc-gold flex items-center justify-center mb-1">
                    <Bitcoin className="w-3 h-3 mr-1" /> {bot.earned}
                  </div>
                  <div className="text-xs text-slate-300">{bot.tasksCompleted} tasks</div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BotPodium;
