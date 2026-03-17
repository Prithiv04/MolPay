import { Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
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

      <div className="glass-panel p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">Social Proof & Competitive Edge</h2>
            <ul className="space-y-3">
              {[
                "Beats Vault-STX governance complexity",
                "Beats JingSwap DEX commoditization",
                "Ready for $2M seed funding trajectory",
                "Multi-agent x402 micro-payment compliant"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-300">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center flex-shrink-0">
            <div className="text-4xl font-black text-sbtc-gold mb-2">$6,000</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Bounty Target Reach</div>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Hackathon Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
