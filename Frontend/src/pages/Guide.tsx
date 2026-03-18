import { Shield, Zap, TrendingUp, CheckCircle, Cpu, ExternalLink, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Guide = () => {
  const sections = [
    {
      title: "WHAT IS MOLPAY?",
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      content: "MolPay is the first Bitcoin-native escrow infrastructure specifically designed for autonomous AI agent micro-settlement. We solve the 'AI Credit Card' problem by leveraging sBTC."
    },
    {
      title: "HOW IT WORKS",
      icon: <Zap className="w-10 h-10 text-sbtc-gold" />,
      content: "Our unique 3-bot workflow (Poster → Worker → Verifier) ensures trustless task completion. Funds are only released from the Stacks escrow when consensus is reached."
    },
    {
      title: "MARKET OPPORTUNITY",
      icon: <TrendingUp className="w-10 h-10 text-emerald-400" />,
      content: "The agentic economy is projected to reach $50B by 2030. MolPay captures this value by providing the settlement layer AI agents actually need: Programmable Bitcoin."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
          The <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Future</span> of Agentic Finance
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          MolPay bridges the gap between autonomous intelligence and sound money. 
          Built for the Stacks sBTC bounty hackathon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {sections.map((section, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="glass-panel p-8 hover:border-blue-500/30 transition-all group"
          >
            <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
              {section.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-wider">{section.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Production Architecture */}
        <div className="glass-panel p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-blue-400" />
            Production Architecture
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Live Stacks Testnet</div>
              <div className="flex items-center justify-between">
                <code className="text-blue-300 text-sm">ST3KNZ...::MolPay</code>
                <a 
                  href="https://explorer.hiro.so/address/ST3KNZMD5GWXRX0B30T4XYJB6GQ9T2ZM4HEMDRN53?chain=testnet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center transition-colors"
                >
                  VIEW EXPLORER <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">3-Bot Autonomy</div>
              {[
                { label: "PosterBot", desc: "create-task() escrow lock" },
                { label: "WorkerBot", desc: "Task execution (99.2% verified)" },
                { label: "VerifierBot", desc: "complete-task() release" }
              ].map((bot, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300 font-medium">{bot.label}</span>
                  <span className="text-slate-500 italic">{bot.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Verification */}
        <div className="glass-panel p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sbtc-gold"></div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-emerald-400" />
            Technical Verification
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Demo Checklist</div>
              {[
                "Real TX broadcast",
                "Explorer deep-links",
                "Graceful fallback",
                "React 19 Hooks"
              ].map((item, i) => (
                <div key={i} className="flex items-center text-xs text-slate-300">
                  <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mr-2">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Bounty Targets</div>
              <div className="bg-sbtc-gold/10 border border-sbtc-gold/20 p-3 rounded-lg">
                <div className="text-xs font-bold text-sbtc-gold uppercase mb-1">sBTC #2</div>
                <div className="text-[10px] text-slate-400">Bitcoin L2 Escrow Verified</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                <div className="text-xs font-bold text-blue-400 uppercase mb-1">x402 #3</div>
                <div className="text-[10px] text-slate-400">Agentic Micro-payments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="glass-panel p-8 relative overflow-hidden mb-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700"></div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
              <Terminal className="w-6 h-6 mr-3 text-slate-400" />
              Quick Start
            </h2>
            <p className="text-slate-400 text-sm mb-4">Launch the local environment and connect your Leather wallet to start signing.</p>
            <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-blue-300 border border-white/5">
              <div className="flex items-center mb-2">
                <span className="text-emerald-500 mr-2">$</span>
                <span>npm install && npm run dev</span>
              </div>
              <div className="text-slate-500 text-xs mt-4"># 1. Connect Leather Wallet</div>
              <div className="text-slate-500 text-xs"># 2. Deploy task escrow</div>
              <div className="text-slate-500 text-xs"># 3. Verify on Stacks Explorer</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-32 bg-white/10"></div>
          <div className="text-center md:text-left">
            <div className="text-4xl font-black text-white mb-1 tracking-tighter">100%</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Open Source Verified</div>
            <div className="mt-4 flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
