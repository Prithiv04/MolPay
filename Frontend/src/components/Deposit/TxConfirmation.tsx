import { motion } from 'framer-motion';
import { Bitcoin, ExternalLink, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TxConfirmation = ({ hash, value }: { hash: string, value: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-8 glass-panel text-center max-w-md mx-auto relative overflow-hidden">
      {/* Background celebration effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="w-24 h-24 mb-6 relative">
           <svg className="w-full h-full text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
             className="absolute inset-0 border-[3px] border-dashed border-emerald-400/30 rounded-full"
           ></motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-white mb-2">Deposit Successful!</h3>
        <p className="text-slate-400 mb-6">
          Your sBTC has been securely locked in the MolPay escrow contract.
        </p>

        <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 w-full mb-8 tracking-wide">
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5">
            <span className="text-sm text-slate-400">Total Deposited</span>
            <span className="font-bold text-white flex items-center">
              <Bitcoin className="w-4 h-4 text-sbtc-gold mr-1" /> {value} sBTC
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Transaction</span>
            <a href="#" className="font-mono text-emerald-400 hover:text-emerald-300 flex items-center truncate max-w-[150px]">
              {hash.substring(0, 10)}... <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
           <button 
             onClick={() => navigate('/')}
             className="btn-primary w-full shadow-emerald-500/20 shadow-xl flex items-center justify-center font-bold"
           >
             <Activity className="w-4 h-4 mr-2"/> Return to Dashboard
           </button>
        </div>
      </motion.div>
    </div>
  );
}

export default TxConfirmation;
