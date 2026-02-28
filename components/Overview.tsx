import React from 'react';
import { PlayCircle, DollarSign, Users, ArrowUpRight, Plus, Music, Globe, TrendingUp, Video } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OverviewProps {
  setActiveTab: (tab: any) => void;
}

const data = [
  { name: 'Jan', streams: 4000, views: 1200 },
  { name: 'Feb', streams: 5000, views: 1800 },
  { name: 'Mar', streams: 3500, views: 1400 },
  { name: 'Apr', streams: 7800, views: 2100 },
  { name: 'May', streams: 6200, views: 3200 },
  { name: 'Jun', streams: 8900, views: 4100 },
  { name: 'Jul', streams: 12400, views: 5600 },
];

const Overview: React.FC<OverviewProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, Artist!</h2>
          <p className="text-slate-400">Here's a quick look at your music & video dashboard.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-400 text-sm font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Account Verified
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-indigo-500/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <PlayCircle className="text-indigo-400" size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
          <p className="text-slate-400 text-sm">Audio Streams</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">124,500</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-rose-500/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-rose-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <Video className="text-rose-400" size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">
              +24% <ArrowUpRight size={12} />
            </span>
          </div>
          <p className="text-slate-400 text-sm">Video Views</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">38,200</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <DollarSign className="text-purple-400" size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">
              +8% <ArrowUpRight size={12} />
            </span>
          </div>
          <p className="text-slate-400 text-sm">Total Earnings</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">$ 842.15</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-pink-500/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-pink-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <Users className="text-pink-400" size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">
              +15% <ArrowUpRight size={12} />
            </span>
          </div>
          <p className="text-slate-400 text-sm">Monthly Listeners</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">12,800</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Growth Trends</h3>
            <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="streams" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStreams)" />
                <Area type="monotone" dataKey="views" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Audio Streams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
              <span className="text-xs text-slate-400">Video Views</span>
            </div>
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="space-y-4 flex-1">
            <button 
              onClick={() => setActiveTab('upload')}
              className="w-full p-4 bg-slate-950/50 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-4 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-rose-500/10 text-rose-400 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Video size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">New Video Release</p>
                <p className="text-xs text-slate-500">To Vevo & Apple Music</p>
              </div>
            </button>
            <button 
              className="w-full p-4 bg-slate-950/50 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-4 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Music size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Smart Link</p>
                <p className="text-xs text-slate-500">For cross-platform sharing</p>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('oac')}
              className="w-full p-4 bg-slate-950/50 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-4 transition-all text-left group"
            >
              <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">OAC Verification</p>
                <p className="text-xs text-slate-500">Official Artist Channel</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Releases */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Recent Releases</h3>
          <button className="text-sm text-indigo-400 font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl group cursor-pointer hover:border-slate-700 transition-all">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                <img 
                  src={`https://picsum.photos/seed/album${id}/300/300`} 
                  alt="Album Art" 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="text-white" size={40} />
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  {id % 2 === 0 ? (
                    <div className="px-2 py-1 bg-rose-600 text-[10px] font-bold rounded-md text-white uppercase tracking-wider flex items-center gap-1">
                      <Video size={10} /> Video
                    </div>
                  ) : (
                    <div className="px-2 py-1 bg-indigo-600 text-[10px] font-bold rounded-md text-white uppercase tracking-wider">
                      Audio
                    </div>
                  )}
                </div>
              </div>
              <p className="font-bold truncate">Release Title {id}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-slate-500">{id % 2 === 0 ? 'Music Video' : 'Audio Single'}</p>
                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <PlayCircle size={10} />
                  {id * 3}.2k
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;