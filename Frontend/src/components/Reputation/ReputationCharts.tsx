import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import { useMolpayStore } from '../../store/molpayStore';

const dataTasks = [
  { name: 'Mon', tasks: 12 },
  { name: 'Tue', tasks: 19 },
  { name: 'Wed', tasks: 15 },
  { name: 'Thu', tasks: 22 },
  { name: 'Fri', tasks: 18 },
  { name: 'Sat', tasks: 25 },
  { name: 'Sun', tasks: 30 },
];

const ReputationCharts = () => {
  const { bots } = useMolpayStore();
  
  const dataEarnings = bots.map(bot => ({
    name: bot.name,
    earned: bot.earned || 0
  }));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Chart 1 */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-6">Tasks Completed</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataTasks}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '8px' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="tasks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTasks)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2 */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-6">sBTC Earned by Role</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{fill: '#ffffff05'}}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff10', borderRadius: '8px' }}
              />
              <Bar dataKey="earned" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReputationCharts;
