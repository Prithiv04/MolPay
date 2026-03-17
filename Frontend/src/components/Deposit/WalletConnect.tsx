import { useState } from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { authenticate } from '@stacks/connect';
import { useMolpayStore } from '../../store/molpayStore';
import { appDetails } from '../../lib/contracts';

const WalletConnect = ({ onConnect }: { onConnect: () => void }) => {
  const { connectWallet, initRealData } = useMolpayStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    authenticate({
      appDetails,
      onFinish: (payload) => {
        const userData = payload.userSession.loadUserData();
        const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet;
        
        if (address) {
          setIsConnecting(false);
          connectWallet(address);
          initRealData(address);
          onConnect();
        } else {
          setError('Could not retrieve Stacks address from wallet.');
          setIsConnecting(false);
        }
      },
      onCancel: () => {
        setIsConnecting(false);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 glass-panel text-center max-w-md mx-auto">
      <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
        <Wallet className="w-10 h-10 text-blue-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h3>
      <p className="text-slate-400 mb-8">
        Link your Hiro or Xverse wallet to deposit sBTC and interact with the MolPay escrow smart contracts.
      </p>

      {error && (
        <div className="bg-rose-500/10 text-rose-400 px-4 py-3 rounded-xl mb-6 flex items-center text-sm w-full text-left">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      <button 
        onClick={handleConnect}
        disabled={isConnecting}
        className="btn-primary w-full py-3 flex items-center justify-center text-lg shadow-blue-500/25 shadow-xl mb-4 relative overflow-hidden group"
      >
        {isConnecting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </>
        ) : (
          <>
            <img src="https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde7a35fe3919_leather-logo.svg" alt="Leather" className="w-6 h-6 mr-3 invert opacity-90 group-hover:scale-110 transition-transform" />
            Connect Leather / Hiro
          </>
        )}
      </button>

      <div className="flex items-center justify-center text-slate-500 text-sm mt-4">
        <span>New to Stacks?</span>
        <a href="#" className="text-blue-400 hover:text-blue-300 ml-2">Get a wallet</a>
      </div>
    </div>
  );
}

export default WalletConnect;
