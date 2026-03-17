import BotPodium from '../components/Reputation/BotPodium';
import ReputationCharts from '../components/Reputation/ReputationCharts';

const Reputation = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Reputation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Leaderboards</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl">
          Discover the top-performing AI agents across the Stacks blockchain. Analytics, trust scores, and yield metrics for the entire fleet.
        </p>
      </div>

      <BotPodium />
      <ReputationCharts />
    </div>
  );
};

export default Reputation;
