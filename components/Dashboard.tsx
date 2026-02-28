
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Upload, 
  BarChart2, 
  Wallet, 
  Wand2, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  Plus,
  CreditCard,
  Youtube,
  Library,
  Link2,
  Orbit,
  Video
} from 'lucide-react';
import Overview from './Overview.tsx';
import AIStudio from './AIStudio.tsx';
import Analytics from './Analytics.tsx';
import WalletView from './WalletView.tsx';
import UploadTrack from './UploadTrack.tsx';
import Plans from './Plans.tsx';
import YouTubeOAC from './YouTubeOAC.tsx';
import DistributionManager from './DistributionManager.tsx';
import Integrations from './Integrations.tsx';
import VideoUploader from './VideoUploader.tsx';

interface DashboardProps {
  onBackToLanding: () => void;
}

export type Tab = 'overview' | 'analytics' | 'wallet' | 'ai-studio' | 'settings' | 'upload' | 'plans' | 'oac' | 'catalog' | 'integrations' | 'video-dist';

const Dashboard: React.FC<DashboardProps> = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'catalog', label: 'My Catalog', icon: Library },
    { id: 'upload', label: 'Audio Distribution', icon: Upload },
    { id: 'video-dist', label: 'Video Distribution', icon: Video },
    { id: 'integrations', label: 'API Integrations', icon: Link2 },
    { id: 'oac', label: 'YouTube OAC', icon: Youtube },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'wallet', label: 'Royalties', icon: Wallet },
    { id: 'ai-studio', label: 'AI Studio', icon: Wand2 },
    { id: 'plans', label: 'Subscription', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Orbit className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">OrbitX Music</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onBackToLanding}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950/50">
          <div className="relative w-96 hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search your tracks or albums..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('upload')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hidden sm:flex"
            >
              <Plus size={16} />
              New Audio
            </button>
            <button 
              onClick={() => setActiveTab('video-dist')}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-all hidden sm:flex"
            >
              <Video size={16} />
              New Video
            </button>
            <button className="relative p-2 text-slate-400 hover:text-slate-100 transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Artist Name</p>
                <p className="text-xs text-slate-500">Free Plan</p>
              </div>
              <img 
                src="https://picsum.photos/seed/artist/40/40" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-slate-700"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
            {activeTab === 'upload' && <UploadTrack onComplete={() => setActiveTab('catalog')} />}
            {activeTab === 'video-dist' && <VideoUploader onComplete={() => setActiveTab('catalog')} />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'wallet' && <WalletView />}
            {activeTab === 'ai-studio' && <AIStudio />}
            {activeTab === 'plans' && <Plans />}
            {activeTab === 'oac' && <YouTubeOAC />}
            {activeTab === 'catalog' && <DistributionManager />}
            {activeTab === 'integrations' && <Integrations />}
            {activeTab === 'settings' && (
              <div className="text-center py-20 text-slate-500 italic">Settings feature coming soon...</div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 flex justify-around p-3 z-50">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`p-2 rounded-lg ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500'}`}
          >
            <item.icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
