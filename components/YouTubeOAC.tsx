
import React, { useState } from 'react';
import { 
  Youtube, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Music, 
  Users, 
  Play, 
  Info, 
  Layout, 
  History, 
  Settings,
  Sparkles,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const YouTubeOAC: React.FC = () => {
  const [view, setView] = useState<'request' | 'manage'>('request');
  const [submitted, setSubmitted] = useState(false);
  const [generatingBio, setGeneratingBio] = useState(false);
  const [aiBio, setAiBio] = useState('');
  const [artistPrompt, setArtistPrompt] = useState('');
  
  const [formData, setFormData] = useState({
    personalChannel: '',
    topicChannel: '',
    agreedToRequirements: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreedToRequirements && formData.personalChannel && formData.topicChannel) {
      setSubmitted(true);
    }
  };

  const generateAIBio = async () => {
    if (!artistPrompt) return;
    setGeneratingBio(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional and engaging YouTube Artist Bio for an artist with these traits: ${artistPrompt}. 
        The bio should be suitable for the "About" section of an Official Artist Channel. 
        Include a strong opening, mention of musical style, and a call to action. 
        Keep it under 150 words.`,
      });
      setAiBio(response.text || '');
    } catch (error) {
      console.error(error);
      setAiBio('Failed to generate bio. Please try again.');
    } finally {
      setGeneratingBio(false);
    }
  };

  if (submitted && view === 'request') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Request Submitted!</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Your request for an Official Artist Channel has been received. Our team will verify your links and submit them to Google. 
          Verification usually takes 2-4 weeks.
        </p>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-left mb-8">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            <Info size={18} className="text-indigo-400" />
            What happens next?
          </h4>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>• Google will review your release history (minimum 3 official tracks).</li>
            <li>• Your subscribers from personal and topic channels will be merged.</li>
            <li>• The music note badge will appear automatically.</li>
          </ul>
        </div>
        <button 
          onClick={() => { setSubmitted(false); setView('manage'); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all"
        >
          Go to OAC Management
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header with View Toggle */}
      <div className="bg-gradient-to-br from-red-900/40 to-slate-900/40 border border-red-500/20 p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-600/20">
                <Youtube className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold">Official Artist Channel</h2>
            </div>
            
            <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
              <button 
                onClick={() => setView('request')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === 'request' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Youtube size={16} />
                Request OAC
              </button>
              <button 
                onClick={() => setView('manage')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${view === 'manage' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Settings size={16} />
                Manage
              </button>
            </div>
          </div>
          <p className="text-slate-300 max-w-xl">
            {view === 'request' 
              ? "Verify your brand on YouTube. Merge your personal and topic channels into a single, professional artist presence."
              : "Monitor your verification progress and manage your YouTube Artist Press Kit directly from OrbitX Music."}
          </p>
        </div>
        <div className="absolute right-[-5%] top-[-10%] opacity-5 pointer-events-none">
          <Youtube size={300} className="text-white" />
        </div>
      </div>

      {view === 'request' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-bold mb-6">Submit New Request</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center justify-between">
                    <span>Your Personal YouTube Channel URL</span>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
                      Find URL <ExternalLink size={10} />
                    </a>
                  </label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://www.youtube.com/channel/..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition-all"
                    value={formData.personalChannel}
                    onChange={e => setFormData({...formData, personalChannel: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center justify-between">
                    <span>YouTube Topic Channel URL</span>
                    <div className="group relative">
                      <AlertCircle size={14} className="text-slate-500 cursor-help" />
                      <div className="absolute bottom-full mb-2 right-0 w-64 p-2 bg-slate-800 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        This is the "Topic" channel where your distributed music currently lives.
                      </div>
                    </div>
                  </label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://www.youtube.com/channel/..._Topic"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-red-500 outline-none transition-all"
                    value={formData.topicChannel}
                    onChange={e => setFormData({...formData, topicChannel: e.target.value})}
                  />
                </div>

                <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl space-y-3">
                  <h4 className="text-sm font-bold text-red-400">Requirements Check</h4>
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${formData.agreedToRequirements ? 'text-emerald-500' : 'text-slate-600'}`}>
                      <CheckCircle size={16} />
                    </div>
                    <label className="text-sm text-slate-400 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={formData.agreedToRequirements}
                        onChange={e => setFormData({...formData, agreedToRequirements: e.target.checked})}
                      />
                      I have at least <span className="text-white font-bold">3 official releases</span> distributed via OrbitX Music.
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.agreedToRequirements || !formData.personalChannel || !formData.topicChannel}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                >
                  Submit OAC Verification
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-4">Verification Steps</h3>
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Submit Links', status: 'ready' },
                  { step: 2, title: 'Internal Audit', status: 'pending' },
                  { step: 3, title: 'Google Review', status: 'pending' },
                  { step: 4, title: 'OAC Active', status: 'pending' }
                ].map((s, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.status === 'ready' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {s.step}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-bold ${s.status === 'ready' ? 'text-white' : 'text-slate-500'}`}>{s.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Tracker */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <History className="text-red-500" size={20} />
                  Request Status
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                  <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                    <Youtube size={32} className="text-red-600" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-bold">OAC Verification for "Artist Name"</h4>
                    <p className="text-sm text-slate-500 mt-1">Submitted on: April 24, 2024 • Request ID: #YT-9921</p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-xs font-bold flex items-center gap-1">
                        <Loader2 size={12} className="animate-spin" /> Under Review
                      </span>
                      <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-xs font-bold">
                        Expected completion: ~14 days
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <button className="text-sm text-indigo-400 font-bold hover:underline flex items-center gap-1">
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Bio Generator */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-600/10 text-indigo-400 rounded-lg">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AI Artist Bio Generator</h3>
                  <p className="text-sm text-slate-500">Generate a professional bio for your OAC "About" section.</p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm text-slate-400">Describe your style, influences, and career highlights</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none min-h-[100px] text-sm"
                  placeholder="e.g., Indie pop artist from Austin, TX. Influenced by Lana Del Rey. Recently toured with..."
                  value={artistPrompt}
                  onChange={(e) => setArtistPrompt(e.target.value)}
                />
                <button 
                  onClick={generateAIBio}
                  disabled={generatingBio || !artistPrompt}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                >
                  {generatingBio ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  Generate Professional Bio
                </button>
              </div>

              {aiBio && (
                <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-indigo-500/30 animate-in fade-in slide-in-from-top-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">AI Suggestion</h4>
                  <p className="text-sm text-slate-300 leading-relaxed italic">"{aiBio}"</p>
                  <div className="mt-4 flex gap-3">
                    <button 
                      onClick={() => navigator.clipboard.writeText(aiBio)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-4">OAC Features</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-1"><Users size={16} className="text-red-500" /></div>
                  <div>
                    <p className="text-sm font-bold">Subscriber Consolidation</p>
                    <p className="text-xs text-slate-500">All fans are united on one channel.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1"><Play size={16} className="text-red-500" /></div>
                  <div>
                    <p className="text-sm font-bold">Music Content Shelves</p>
                    <p className="text-xs text-slate-500">Albums and Top Tracks shelves enabled.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1"><Layout size={16} className="text-red-500" /></div>
                  <div>
                    <p className="text-sm font-bold">Analytics for Artists</p>
                    <p className="text-xs text-slate-500">Access YouTube Studio app for music.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Info size={18} className="text-indigo-400" />
                OAC Tip
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ensure your channel header image is updated. OAC channels with consistent branding across their distributed music and channel art get verified faster.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeOAC;
