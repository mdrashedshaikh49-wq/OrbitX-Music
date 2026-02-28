
import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Landmark, 
  ArrowDownCircle, 
  History, 
  TrendingUp, 
  Info, 
  Database, 
  PieChart as PieIcon,
  Zap,
  ShieldCheck,
  ChevronRight,
  Clock
} from 'lucide-react';

const WalletView: React.FC = () => {
  const [connected, setConnected] = useState<string[]>([]);
  const [totalBalance, setTotalBalance] = useState(212.25);
  const [advanceModal, setAdvanceModal] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orbitx_connected_providers') || '[]');
    setConnected(saved);
    if (saved.length > 0) {
      let bonus = 0;
      if (saved.includes('Distrokid')) bonus += 142.50;
      if (saved.includes('Amuse')) bonus += 84.20;
      setTotalBalance(212.25 + bonus);
    }
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Royalties & Payments</h2>
          <p className="text-slate-400">Manage your earnings across all distribution channels.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 mb-1">Next Payout Cycle</p>
          <p className="font-bold text-indigo-400">May 15, 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl shadow-xl shadow-indigo-500/20 text-white flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium opacity-80 uppercase tracking-wider">Total Consolidated Balance</p>
                <h3 className="text-5xl font-black mt-2">$ {totalBalance.toFixed(2)}</h3>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Wallet size={24} />
              </div>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl">
                <Landmark size={20} />
                Withdraw Funds
              </button>
              <button 
                onClick={() => setAdvanceModal(true)}
                className="bg-indigo-500/30 border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Zap size={20} className="text-yellow-400" />
                Get Royalty Advance
              </button>
            </div>
          </div>
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 pointer-events-none">
            <PieIcon size={300} className="text-white" />
          </div>
        </div>

        {/* Quick Features Card */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-yellow-400" size={20} />
              <h4 className="font-bold">Fast Payouts</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">Opportunity to withdraw money faster than other platforms. Get your funds in as little as 24 hours.</p>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all">Enable Express Pay</button>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-indigo-400" size={20} />
              <h4 className="font-bold">Advance Eligible</h4>
            </div>
            <p className="text-xs text-slate-400">Based on your performance, you are eligible for an advance of up to <span className="text-white font-bold">$1,200.00</span>.</p>
          </div>
        </div>
      </div>

      {/* Advance Modal Simulation */}
      {advanceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-lg w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-yellow-500/10 rounded-2xl">
                <Zap className="text-yellow-400" size={32} />
              </div>
              <button onClick={() => setAdvanceModal(false)} className="text-slate-500 hover:text-white">✕</button>
            </div>
            <h3 className="text-2xl font-bold mb-2">Apply for Royalty Advance</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Benefit of taking advances on future earnings based on your previous song performance. We estimate your next 6 months of earnings and offer them upfront.
            </p>
            <div className="space-y-4 mb-8">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">Eligible Amount</p>
                <p className="text-3xl font-black text-white">$ 1,200.00</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 italic">
                <Info size={14} /> Repayment is automated via future royalties.
              </div>
            </div>
            <button className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 text-slate-950 font-black rounded-2xl transition-all shadow-xl shadow-yellow-600/20">
              Request Advance Now
            </button>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History className="text-slate-400" size={20} />
            Unified History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { date: 'May 01, 2024', source: 'OrbitX', desc: 'Fast Payout Withdrawal', amount: '- $ 150.00', status: 'Completed', color: 'text-emerald-400' },
                { date: 'Apr 28, 2024', source: 'Distrokid', desc: 'Catalog Sync Earnings', amount: '+ $ 42.10', status: 'Synced', color: 'text-indigo-400' },
                { date: 'Apr 15, 2024', source: 'OrbitX', desc: 'Monthly Royalty Payout', amount: '+ $ 62.25', status: 'Completed', color: 'text-emerald-400' },
              ].map((tx, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50 transition-all">
                  <td className="px-6 py-4 text-slate-300 text-sm">{tx.date}</td>
                  <td className="px-6 py-4 text-sm font-bold uppercase tracking-widest">{tx.source}</td>
                  <td className="px-6 py-4 text-sm">{tx.desc}</td>
                  <td className="px-6 py-4 text-sm font-bold">{tx.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold bg-slate-800 ${tx.color}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
