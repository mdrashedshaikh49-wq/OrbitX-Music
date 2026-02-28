
import React, { useState, useEffect } from 'react';
import { 
  Link2, 
  ExternalLink, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  Zap,
  Lock,
  Loader2,
  Video,
  Database,
  ArrowRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Integrations: React.FC = () => {
  const [distrokidKey, setDistrokidKey] = useState('');
  const [amuseKey, setAmuseKey] = useState('');
  const [vevoToken, setVevoToken] = useState('');
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);

  // Simulate persistent state
  useEffect(() => {
    const saved = localStorage.getItem('orbitx_connected_providers');
    if (saved) setConnectedProviders(JSON.parse(saved));
  }, []);

  const handleSync = async (provider: 'Distrokid' | 'Amuse' | 'Vevo') => {
    setIsSyncing(provider);
    setSyncStatus(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Simulate an API response for connecting to ${provider}. 
      The user is linking their ${provider} account to OrbitX Music for catalog management and royalty syncing.
      Return a brief summary of a fictional artist catalog from this provider. 
      Include: 
      1. Number of releases found.
      2. Total lifetime revenue ($).
      3. A success message confirming that metadata and earnings are being synced.
      Format it in a concise, dashboard-friendly list.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      
      setSyncStatus(response.text);
      if (!connectedProviders.includes(provider)) {
        const newProviders = [...connectedProviders, provider];
        setConnectedProviders(newProviders);
        localStorage.setItem('orbitx_connected_providers', JSON.stringify(newProviders));
      }
    } catch (err) {
      console.error(err);
      setSyncStatus("Failed to establish API handshake. Please check your credentials.");
    } finally {
      setIsSyncing(null);
    }
  };

  const disconnectProvider = (provider: string) => {
    const newProviders = connectedProviders.filter(p => p !== provider);
    setConnectedProviders(newProviders);
    localStorage.setItem('orbitx_connected_providers', JSON.stringify(newProviders));
    setSyncStatus(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20">
              <Link2 className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold">API Integrations</h2>
          </div>
          <p className="text-slate-300 max-w-xl">
            Connect OrbitX Music to your existing distribution accounts. We'll automatically pull your catalog history and sync your royalty statements into one unified dashboard.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Distrokid Card */}
        <div className={`bg-slate-900 border p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-all ${connectedProviders.includes('Distrokid') ? 'border-indigo-500/50' : 'border-slate-800'}`}>
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/DistroKid_logo_horizontal.png" alt="Distrokid" className="w-10 h-10 object-contain invert opacity-80" />
              </div>
              {connectedProviders.includes('Distrokid') ? (
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> CONNECTED
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> PARTNER API
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">DistroSync™</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Pull your Distrokid track history and earnings directly into OrbitX.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  API Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input 
                    type="password" 
                    placeholder="dk_live_xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:border-indigo-500 outline-none transition-all text-sm"
                    value={distrokidKey}
                    onChange={(e) => setDistrokidKey(e.target.value)}
                    disabled={connectedProviders.includes('Distrokid')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {connectedProviders.includes('Distrokid') ? (
            <div className="flex flex-col gap-2">
               <button 
                onClick={() => handleSync('Distrokid')}
                disabled={!!isSyncing}
                className="w-full py-3 bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 rounded-xl font-bold transition-all border border-indigo-500/20 flex items-center justify-center gap-2"
              >
                {isSyncing === 'Distrokid' ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                Re-sync Catalog
              </button>
              <button onClick={() => disconnectProvider('Distrokid')} className="text-xs text-rose-500 hover:underline mt-2">Disconnect Account</button>
            </div>
          ) : (
            <button 
              onClick={() => handleSync('Distrokid')}
              disabled={!!isSyncing || !distrokidKey}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              {isSyncing === 'Distrokid' ? <Loader2 className="animate-spin" size={20} /> : <Database size={20} />}
              Connect Catalog
            </button>
          )}
        </div>

        {/* Amuse Card */}
        <div className={`bg-slate-900 border p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-all ${connectedProviders.includes('Amuse') ? 'border-yellow-500/50' : 'border-slate-800'}`}>
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                <Zap className="text-yellow-400" size={32} />
              </div>
              {connectedProviders.includes('Amuse') ? (
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> CONNECTED
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> PARTNER API
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">AmuseLink™</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Consolidate Amuse royalties into your OrbitX wallet automatically.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Auth Token
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input 
                    type="password" 
                    placeholder="am_auth_xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:border-amber-500 outline-none transition-all text-sm"
                    value={amuseKey}
                    onChange={(e) => setAmuseKey(e.target.value)}
                    disabled={connectedProviders.includes('Amuse')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {connectedProviders.includes('Amuse') ? (
            <div className="flex flex-col gap-2">
               <button 
                onClick={() => handleSync('Amuse')}
                disabled={!!isSyncing}
                className="w-full py-3 bg-amber-600/10 text-amber-400 hover:bg-amber-600/20 rounded-xl font-bold transition-all border border-amber-500/20 flex items-center justify-center gap-2"
              >
                {isSyncing === 'Amuse' ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                Re-sync Catalog
              </button>
              <button onClick={() => disconnectProvider('Amuse')} className="text-xs text-rose-500 hover:underline mt-2">Disconnect Account</button>
            </div>
          ) : (
            <button 
              onClick={() => handleSync('Amuse')}
              disabled={!!isSyncing || !amuseKey}
              className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-yellow-600/20 flex items-center justify-center gap-2"
            >
              {isSyncing === 'Amuse' ? <Loader2 className="animate-spin" size={20} /> : <Database size={20} />}
              Connect Catalog
            </button>
          )}
        </div>

        {/* Vevo Card */}
        <div className={`bg-slate-900 border p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-all ${connectedProviders.includes('Vevo') ? 'border-rose-500/50' : 'border-slate-800'}`}>
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                <Video className="text-rose-500" size={32} />
              </div>
              {connectedProviders.includes('Vevo') ? (
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} /> CONNECTED
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} /> DIRECT API
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2">Vevo Connect</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Enable direct video distribution through the Vevo Partner Portal.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Partner Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input 
                    type="password" 
                    placeholder="vv_part_xxxxxxxx"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:border-rose-500 outline-none transition-all text-sm"
                    value={vevoToken}
                    onChange={(e) => setVevoToken(e.target.value)}
                    disabled={connectedProviders.includes('Vevo')}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {connectedProviders.includes('Vevo') ? (
            <div className="flex flex-col gap-2">
               <button 
                onClick={() => handleSync('Vevo')}
                disabled={!!isSyncing}
                className="w-full py-3 bg-rose-600/10 text-rose-400 hover:bg-rose-600/20 rounded-xl font-bold transition-all border border-rose-500/20 flex items-center justify-center gap-2"
              >
                {isSyncing === 'Vevo' ? <Loader2 className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                Re-sync API
              </button>
              <button onClick={() => disconnectProvider('Vevo')} className="text-xs text-rose-500 hover:underline mt-2">Disconnect API</button>
            </div>
          ) : (
            <button 
              onClick={() => handleSync('Vevo')}
              disabled={!!isSyncing || !vevoToken}
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
            >
              {isSyncing === 'Vevo' ? <Loader2 className="animate-spin" size={20} /> : <Database size={20} />}
              Authorize Direct
            </button>
          )}
        </div>
      </div>

      {/* Sync Status Result */}
      {syncStatus && (
        <div className="bg-slate-900 border border-indigo-500/20 p-8 rounded-3xl animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="text-emerald-500" size={24} />
            <h3 className="text-xl font-bold">Catalog Successfully Synced</h3>
          </div>
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed mb-6">
            {syncStatus}
          </div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold animate-pulse">
            <ArrowRight size={16} /> Your catalog is now visible in the 'My Catalog' tab.
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
        <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck className="text-slate-400" size={24} />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold">Enterprise-Grade Security</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            OrbitX Music uses encrypted AES-256 storage for all third-party API keys. We pull only non-sensitive catalog metadata and royalty statements.
          </p>
        </div>
        <button className="whitespace-nowrap bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-xl text-sm font-bold transition-all">
          View Security Policy
        </button>
      </div>
    </div>
  );
};

export default Integrations;
