import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMolpayStore } from '../../store/molpayStore';
import { completeTask, claimReward } from '../../lib/contracts';
import TaskStatusBadge from './TaskStatusBadge';
import { Bitcoin, Eye, CheckCircle2, ChevronRight, Play, Award } from 'lucide-react';

type Task = {
  id: string;
  description: string;
  status: string;
  escrow: number;
  workers: number;
};

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => <span className="text-slate-400 font-mono">#{info.getValue()}</span>,
  }),
  columnHelper.accessor('description', {
    header: 'Task Description',
    cell: info => <span className="text-white font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => <TaskStatusBadge status={info.getValue()} />,
  }),
  columnHelper.accessor('escrow', {
    header: 'Escrow (sBTC)',
    cell: info => (
      <div className="flex items-center text-sbtc-gold font-medium">
        <Bitcoin className="w-4 h-4 mr-1" />
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Bot Simulation',
    cell: info => {
      const status = info.getValue();
      const taskId = info.row.original.id;
      
      if (status === 'Active') {
        return (
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                // For simulation purposes, we'll treat any number as the task-id for the contract
                const numericId = parseInt(taskId) || Math.floor(Math.random() * 1000);
                completeTask(numericId, (payload) => {
                  console.log("Task Completion Broadcasted:", payload.txId);
                  useMolpayStore.getState().updateTaskStatus(taskId, 'Completed');
                });
              }}
              className="text-white bg-slate-700/50 hover:bg-slate-700 border border-white/5 px-2 py-1 rounded text-[10px] flex items-center"
            >
              <Play className="w-3 h-3 mr-1 text-emerald-400" /> Complete
            </button>
          </div>
        );
      }
      return null;
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="View Details">
          <Eye className="w-4 h-4" />
        </button>
        {row.original.status === 'Completed' ? (
          <button 
            onClick={() => {
              const numericId = parseInt(row.original.id) || Math.floor(Math.random() * 1000);
              claimReward(numericId, (payload) => {
                console.log("Reward Claimed:", payload.txId);
                useMolpayStore.getState().updateTaskStatus(row.original.id, 'Paid');
              });
            }}
            className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-400 text-xs font-bold transition-colors flex items-center" 
            title="Claim Reward"
          >
             <Award className="w-3 h-3 mr-1" /> Claim
          </button>
        ) : row.original.status === 'Paid' ? (
          <div className="px-3 py-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-bold flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
          </div>
        ) : (
          <button className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-emerald-400 transition-colors" title="Quick Approve">
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
      </div>
    ),
  }),
];

const TaskTable = () => {
  const { tasks } = useMolpayStore();

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="glass-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-white/5 bg-slate-800/50">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 text-sm font-semibold text-slate-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-white/5 text-center text-sm mb-0">
        <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center w-full">
          View All Tasks <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TaskTable;
