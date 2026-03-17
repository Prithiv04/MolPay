import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Settings, BarChart3 } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 mb-12 relative z-10">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/tasks')}
        className="btn-primary flex items-center shadow-blue-500/20 shadow-xl"
      >
        <Rocket className="w-5 h-5 mr-2" />
        Deploy PosterBot
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/guide')}
        className="btn-secondary flex items-center"
      >
        <Settings className="w-5 h-5 mr-2" />
        Bot Settings
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/reputation')}
        className="btn-secondary flex items-center"
      >
        <BarChart3 className="w-5 h-5 mr-2" />
        View Analytics
      </motion.button>
    </div>
  );
};

export default QuickActions;
