
import React, { useState } from 'react';
import { Wand2, Mic2, Sparkles, Send, Loader2, Music4, Headphones, FileAudio, Video, Share2, Camera, Layers } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIStudio: React.FC = () => {
  const [trackDescription, setTrackDescription] = useState('');
  const [activeMode, setActiveMode] = useState<'mastering' | 'marketing' | 'video' | 'social'>('mastering');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!trackDescription.trim()) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let prompt = '';
      let systemInstruction = '';

      if (activeMode === 'mastering') {
        systemInstruction = "You are an AI Mixing & Mastering Engineer. We provide proprietary AI-powered mixing and mastering tools to give artists professional sound before release.";
        prompt = `Analyze the following track description for AI-assisted mastering: "${trackDescription}". 
        Provide a detailed "Pre-Release Sound Report":
        1. Recommended EQ Profile for professional clarity.
        2. Dynamic Range Optimization settings.
        3. Stereo Enhancement suggestion.
        4. Final LUFS (Loudness) target for Spotify vs Apple Music.`;
      } else if (activeMode === 'marketing') {
        systemInstruction = "You are a Music Marketing Expert. specializing in playlist pitching and smart links.";
        prompt = `Generate a Marketing Suite for this track: "${trackDescription}".
        1. Playlist Pitching Draft: A compelling 200-character pitch for Spotify Editorial.
        2. Smart Link Tagline: A short, viral-ready tagline for your Bio link.
        3. Pre-save Buzz Campaign: 3 creative ideas to build hype before release.`;
      } else if (activeMode === 'video') {
        systemInstruction = "You are a Vevo/YouTube SEO Expert. We specialize in metadata optimization for direct distribution to the Vevo platform.";
        prompt = `Generate Vevo and YouTube SEO metadata for a music video described as: "${trackDescription}".
        1. Optimized Title (Compliance-safe).
        2. Vevo-formatted Description with Artist/Director credits.
        3. 3 High-CTR Thumbnail Concepts.
        4. YouTube Tag Cloud (maximized for discovery).`;
      } else {
        systemInstruction = "You are a DIY Marketing Growth Hacker for musicians.";
        prompt = `Create a DIY Social Media Ad Campaign strategy for: "${trackDescription}".
        1. 7-Day Content Calendar for Instagram Reels/TikTok.
        2. Ad Copy Suite: Generate 3 high-converting ad captions.
        3. Hook Ideas: 5 different video hook ideas for short-form content.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction
        }
      });
      
      setAiResponse(response.text || 'Sorry, no results found.');
    } catch (error) {
      console.error(error);
      setAiResponse('Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-3xl font-bold">Artist Tools Suite</h2>
          </div>
          <p className="text-slate-300 max-w-xl">
            Professional sound and marketing, powered by OrbitX AI. Use our proprietary AI-powered tools to give your music a professional sound before release.
          </p>
        </div>
        <div className="absolute right-[-5%] top-[-10%] opacity-10 pointer-events-none">
          <Music4 size={300} className="text-white" />
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-4 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl w-fit">
        <button 
          onClick={() => { setActiveMode('mastering'); setAiResponse(''); }}
          className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMode === 'mastering' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Layers size={18} />
          AI Mastering
        </button>
        <button 
          onClick={() => { setActiveMode('marketing'); setAiResponse(''); }}
          className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMode === 'marketing' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Wand2 size={18} />
          Smart Links
        </button>
        <button 
          onClick={() => { setActiveMode('video'); setAiResponse(''); }}
          className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMode === 'video' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Camera size={18} />
          Vevo SEO
        </button>
        <button 
          onClick={() => { setActiveMode('social'); setAiResponse(''); }}
          className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
            activeMode === 'social' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Share2 size={18} />
          DIY Ad Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Mic2 className="text-indigo-400" size={20} />
            Details & Context
          </h3>
          <textarea
            value={trackDescription}
            onChange={(e) => setTrackDescription(e.target.value)}
            placeholder={
              activeMode === 'mastering' 
              ? "e.g., Heavy electronic track with aggressive bass. Needs more clarity in vocals..."
              : activeMode === 'marketing'
              ? "e.g., Chill lo-fi track for Spotify 'Lo-fi Beats' pitching..."
              : activeMode === 'video'
              ? "e.g., Music video shot in a rainy city, neon aesthetic..."
              : "e.g., Promoting a summer anthem to Gen Z audience on TikTok..."
            }
            className="w-full h-48 bg-slate-950 border border-slate-800 rounded-xl p-4 focus:outline-none focus:border-indigo-500 transition-all resize-none mb-4"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !trackDescription}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${loading || !trackDescription ? 'bg-slate-800 text-slate-500' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20'}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
            Process with AI
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-purple-400" size={20} />
            Professional Analysis
          </h3>
          {aiResponse ? (
            <div className="flex-1 overflow-y-auto">
              <div className="bg-slate-950/50 p-6 rounded-xl border border-slate-800 text-slate-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                {aiResponse}
              </div>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(aiResponse)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  Copy All
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 py-10 opacity-40">
              <Sparkles size={48} className="mb-4" />
              <p className="text-center italic text-sm">Submit your project details to see AI insights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStudio;
