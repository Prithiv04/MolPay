import { CheckCircle2, Clock, PlayCircle, AlertCircle } from 'lucide-react';

const TaskStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Active':
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <PlayCircle className="w-3 h-3 mr-1" /> Active
        </span>
      );
    case 'Processing':
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Clock className="w-3 h-3 mr-1" /> Processing
        </span>
      );
    case 'Completed':
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
        </span>
      );
    default:
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertCircle className="w-3 h-3 mr-1" /> Error
        </span>
      );
  }
};

export default TaskStatusBadge;
