import { Link, useLocation } from 'react-router-dom';
import { Wallet, Activity, Trophy, ArrowDownCircle, ShieldCheck, HelpCircle, Zap } from 'lucide-react';
import { useMolpayStore } from '../../store/molpayStore';
import { authenticate } from '@stacks/connect';
import { appDetails } from '../../lib/contracts';

const Navbar = () => {
  const location = useLocation();
  const { isWalletConnected, sbtcBalance, userAddress, connectWallet, initRealData } = useMolpayStore();
  
  const handleConnect = () => {
    if (isWalletConnected) return;
    
    authenticate({
      appDetails,
      onFinish: (payload) => {
        const userData = payload.userSession.loadUserData();
        const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet;
        if (address) {
          connectWallet(address);
          initRealData(address);
        }
      }
    });
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: 'Tasks', path: '/tasks', icon: <ShieldCheck className="w-4 h-4 mr-2" /> },
    { name: 'Reputation', path: '/reputation', icon: <Trophy className="w-4 h-4 mr-2" /> },
    { name: 'Deposit', path: '/deposit', icon: <ArrowDownCircle className="w-4 h-4 mr-2" /> },
    { name: 'Guide', path: '/guide', icon: <Zap className="w-4 h-4 mr-2" /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle className="w-4 h-4 mr-2" /> }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-custom flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">M</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">MolPay</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1 glass-panel px-2 py-1 rounded-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center space-x-4">
          {isWalletConnected && (
            <div className="hidden lg:flex items-center space-x-2 glass-panel px-4 py-2 rounded-lg border-white/5">
              <span className="text-sbtc-gold font-bold">₿ {sbtcBalance.toFixed(4)}</span>
              <span className="text-xs text-slate-500 font-mono">sBTC</span>
            </div>
          )}
          <button 
            onClick={handleConnect}
            className={`flex items-center btn-secondary ${isWalletConnected ? 'border-emerald-500/30 text-emerald-400' : ''}`}
          >
            <Wallet className={`w-4 h-4 mr-2 ${isWalletConnected ? 'text-emerald-400' : 'text-sbtc-gold'}`} />
            <span>
              {isWalletConnected && userAddress 
                ? `${userAddress.slice(0, 5)}...${userAddress.slice(-4)}` 
                : 'Connect Hiro'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
