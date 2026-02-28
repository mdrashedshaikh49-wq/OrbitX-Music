
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Globe, 
  Video, 
  Music, 
  ExternalLink, 
  MoreVertical,
  AlertCircle,
  Link2,
  FileSearch,
  Activity,
  Filter,
  Library,
  Database,
  Calendar,
  Users
} from 'lucide-react';

interface DistributionItem {
  id: string;
  title: string;
  artist: string;
  type: 'Audio' | 'Video';
  source: 'OrbitX' | 'Distrokid' | 'Amuse';
  status: 'Distributing' | 'Live' | 'Metadata Check' | 'Quality Control' | 'Ingesting' | 'Synced';
  progress: number;
  releaseDate: string;
  platforms: {
    name: string;
    status: 'pending' | 'processing' | 'live' | 'error' | 'qc_check' | 'ingesting' | 'synced';
    link?: string;
    external?: boolean;
  }[];
}

const DistributionManager: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'OrbitX' | 'External'>('All');
  const [catalogItems, setCatalogItems] = useState<DistributionItem[]>([
    {
      id: '1',
      title: 'Neon Nights',
      artist: 'Artist Name',
      type: 'Video',
      source: 'OrbitX',
      status: 'Ingesting',
      progress: 72,
      releaseDate: '2024-05-20',
      platforms: [
        { name: 'Vevo API', status: 'ingesting' },
        { name: 'Apple Music Video', status: 'qc_check' },
        { name: 'Tidal', status: 'live', link: '#' },
        { name: 'YouTube OAC', status: 'live', link: '#' }
      ]
    },
    {
      id: '2',
      title: 'Electric Dreams',
      artist: 'Artist Name',
      type: 'Audio',
      source: 'OrbitX',
      status: 'Live',
      progress: 100,
      releaseDate: '2024-04-12',
      platforms: [
        { name: 'Spotify', status: 'live', link: '#' },
        { name: 'Apple Music', status: 'live', link: '#' },
        { name: 'Amazon Music', status: 'live', link: '#' },
        { name: 'Deezer', status: 'live', link: '#' }
      ]
    }
  ]);

  useEffect(() => {
    const connected = JSON.parse(localStorage.getItem('orbitx_connected_providers') || '[]');
    if (connected.length > 0) {
      const externalItems: DistributionItem[] = [];
      if (connected.includes('Distrokid')) {
        externalItems.push({
          id: 'dk-1',
          title: 'Cyberpunk Soul',
          artist: 'Artist Name',
          type: 'Audio',
          source: 'Distrokid',
          status: 'Synced',
          progress: 100,
          releaseDate: '2024-03-01',
          platforms: [
            { name: 'Spotify', status: 'synced' },
            { name: 'Apple Music', status: 'synced' },
            { name: 'Tidal', status: 'synced' }
          ]
        });
      }
      setCatalogItems(prev => {
        const native = prev.filter(i => i.source === 'OrbitX');
        return [...native, ...externalItems];
      });
    }
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': 
      case 'synced': return <CheckCircle2 size={14} className="text-emerald-500" />;
      case 'processing': return <Clock size={14} className="text-amber-500 animate-pulse" />;
      case 'ingesting': return <Activity size={14} className="text-rose-500 animate-pulse" />;
      case 'qc_check': return <FileSearch size={14} className="text-blue-500" />;
      case 'error': return <AlertCircle size={14} className="text-rose-500" />;
      default: return <Clock size={14} className="text-slate-500" />;
    }
  };

  const filteredItems = catalogItems.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'OrbitX') return item.source === 'OrbitX';
    return item.source !== 'OrbitX';
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Catalog & Distribution</h2>
          <p className="text-slate-400">Manage release dates, artist seats, and delivery status across Audio & Video.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex items-center gap-2">
            <Users size={16} className="text-indigo-400" />
            <span className="text-xs font-bold text-slate-300">Seats: 1/1</span>
          </div>
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {['All', 'OrbitX', 'External'].map((f: any) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all group">
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
              {/* Release Info */}
              <div className="flex gap-6 md:w-1/3 shrink-0">
                <div className="w-24 h-24 bg-slate-800 rounded-2xl overflow-hidden relative shrink-0 shadow-lg">
                  <img src={`https://picsum.photos/seed/${item.id}/200/200`} className="w-full h-full object-cover" alt={item.title} />
                  <div className="absolute top-1 right-1">
                    {item.type === 'Video' ? <Video size={10} className="text-rose-500" /> : <Music size={10} className="text-indigo-500" />}
                  </div>
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold truncate">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm">{item.artist}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Calendar size={12} className="text-slate-500" />
                    <span className="text-xs font-bold text-slate-400">Release: {item.releaseDate}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Platform Status */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Delivery Progress</span>
                  <span className="text-xs font-bold text-indigo-400">{item.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.status === 'Live' || item.status === 'Synced' ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {item.platforms.map((platform, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase truncate pr-2">{platform.name}</span>
                        {getStatusIcon(platform.status)}
                      </div>
                      <span className="text-[9px] font-bold uppercase text-slate-500">{platform.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:w-12 flex md:flex-col justify-end md:justify-start items-center gap-2">
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500"><MoreVertical size={20} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900/50 border border-dashed border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
        <Users size={48} className="text-slate-800 mb-4" />
        <h4 className="font-bold">Need more seats?</h4>
        <p className="text-sm text-slate-500 max-w-sm mb-6">Upgrade to our Label Plan to manage multiple artist profiles under one dashboard.</p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all">View Label Plans</button>
      </div>
    </div>
  );
};

export default DistributionManager;
