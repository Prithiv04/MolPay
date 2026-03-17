import { useState } from 'react';
import Stepper from '../components/Deposit/Stepper';
import WalletConnect from '../components/Deposit/WalletConnect';
import TxConfirmation from '../components/Deposit/TxConfirmation';
import { Bitcoin, ArrowRight, Wallet } from 'lucide-react';
import { useMolpayStore } from '../store/molpayStore';

const Deposit = () => {
  const { sbtcBalance, depositBalance } = useMolpayStore();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [txHash, setTxHash] = useState('0x8f2a...9c4e');

  const handleNext = () => {
    if (step === 2) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(step + 1);
      }, 1500);
    } else if (step === 3) {
      const parsedAmount = parseFloat(amount);
      depositBalance(parsedAmount);
      // Generate a realistic lookign hash for simulation
      const newHash = '0x' + Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);
      setTxHash(newHash);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const btcPrice = 60000;
  const usdValue = amount ? (parseFloat(amount) * btcPrice).toFixed(2) : '0.00';

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Fund Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sbtc-gold to-orange-400">Escrow</span>
        </h1>
        <p className="text-lg text-slate-400">
          Deposit sBTC to instantly unlock AI agents on the MolPay network.
        </p>
      </div>

      <Stepper currentStep={step} />

      <div className="mt-8 transition-all duration-300">
        {step === 1 && (
          <WalletConnect onConnect={handleNext} />
        )}

        {step === 2 && (
          <div className="glass-panel p-8 max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Enter Deposit Amount</h3>
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Bitcoin className="h-6 w-6 text-sbtc-gold" />
              </div>
              <input 
                type="number" 
                step="0.0001"
                min="0.0001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl py-4 pl-12 pr-4 text-2xl text-white font-bold tracking-wider placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="0.000"
              />
              <div className="mt-2 text-slate-400 text-sm flex justify-between px-2">
                <span>≈ ${usdValue} USD</span>
                <span>Balance: <span className="text-white font-medium">{sbtcBalance.toFixed(8)} sBTC</span> <button className="text-blue-400 hover:text-blue-300 ml-1">Max</button></span>
              </div>
            </div>

            <button 
              onClick={handleNext}
              disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
              className={`btn-primary w-full py-4 text-lg shadow-xl shadow-blue-500/20 flex items-center justify-center
                ${(!amount || parseFloat(amount) <= 0) && 'opacity-50 cursor-not-allowed'}
              `}
            >
              {isProcessing ? 'Simulating Escrow Lock...' : 'Review Transaction'} <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center p-8 glass-panel max-w-md mx-auto relative overflow-hidden">
             {/* Background celebration effects border*/}
             <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none -z-10"></div>
             
             <Wallet className="w-12 h-12 text-blue-400 mb-4" />
             <h3 className="text-2xl font-bold text-white mb-6 text-center">Review Deposit</h3>
             
             <div className="w-full space-y-4 mb-8">
               <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center border border-white/5">
                 <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Amount</span>
                 <span className="text-xl font-bold text-white flex items-center">
                   <Bitcoin className="w-5 h-5 text-sbtc-gold mr-1" /> {amount} sBTC
                 </span>
               </div>
               <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center border border-white/5">
                 <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Network Fee</span>
                 <span className="text-md font-medium text-slate-300">0.0005 STX</span>
               </div>
               <div className="bg-slate-900/50 rounded-lg p-4 flex justify-between items-center border border-white/5 shadow-inner">
                 <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Total Cost</span>
                 <span className="text-xl font-bold text-emerald-400 flex items-center">
                   ~${(parseFloat(amount) * btcPrice + 1.25).toFixed(2)}
                 </span>
               </div>
             </div>

             <button 
                onClick={handleNext}
                className="btn-primary w-full shadow-emerald-500/20 shadow-xl flex items-center justify-center py-4 text-lg hover:bg-emerald-500 transition-colors border border-emerald-400/50 bg-emerald-600/80"
             >
               Confirm transaction
             </button>
             <button onClick={() => setStep(2)} className="mt-4 text-slate-400 hover:text-white text-sm">Return to edit amount</button>
          </div>
        )}

        {step === 4 && (
          <TxConfirmation hash={txHash} value={amount} />
        )}
      </div>
    </div>
  );
};

export default Deposit;
