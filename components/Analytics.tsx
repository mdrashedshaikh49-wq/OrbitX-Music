import React from 'react';
import { Globe2, Users, Smartphone, Monitor } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const platformData = [
  { name: 'Spotify', value: 45 },
  { name: 'Apple Music', value: 25 },
  { name: 'YouTube Music', value: 20 },
  { name: 'Others', value: 10 },
];

const COLORS = ['#1DB954', '#FA243C', '#FF0000', '#6366f1'];

const locationData = [
  { name: 'Bangladesh', count: 8500 },
  { name: 'India', count: 4200 },
  { name: 'USA', count: 1200 },
  { name: 'UK', count: 800 },
  { name: 'Others', count: 500 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold">Advanced Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Countries Bar Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Globe2 className="text-blue-400" size={20} />
            Top Countries
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} fontSize={12} />
                <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#6366f1' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution Pie Chart */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Smartphone className="text-emerald-400" size={20} />
            Platform Distribution
          </h3>
          <div className="h-80 w-full flex flex-col md:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 shrink-0 md:pr-10">
              {platformData.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-sm text-slate-400">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audience Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Avg. Listen Time</p>
          <p className="text-2xl font-bold">3:15 min</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Save Rate</p>
          <p className="text-2xl font-bold">18.4%</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Playlist Adds</p>
          <p className="text-2xl font-bold">4,520</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Unique Listeners</p>
          <p className="text-2xl font-bold">8,900</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;