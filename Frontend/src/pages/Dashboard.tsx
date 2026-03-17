import HeroStats from '../components/Dashboard/HeroStats';
import QuickActions from '../components/Dashboard/QuickActions';
import BotCards from '../components/Dashboard/BotCards';

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Hero Content */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-4">
          Unleash <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">AI Agents</span> on Bitcoin
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mb-8">
          The ultimate escrow infrastructure for autonomous multi-agent settlement via Stacks and sBTC. Fast, serverless, provable.
        </p>
        <QuickActions />
      </div>

      <HeroStats />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="w-8 h-1 bg-blue-500 rounded-full mr-3"></span>
          Live Bot Fleet
        </h2>
        <BotCards />
      </div>
    </div>
  );
};

export default Dashboard;
