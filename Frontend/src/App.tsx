import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Reputation from './pages/Reputation';
import Deposit from './pages/Deposit';
import Guide from './pages/Guide';
import Faq from './pages/Faq';

import { useMolpayStore } from './store/molpayStore';
import { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    // No auto-connect on start as requested
  }, []);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reputation" element={<Reputation />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/faq" element={<Faq />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
