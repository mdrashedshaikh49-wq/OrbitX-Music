
import React from 'react';
import { 
  Globe, 
  Music, 
  TrendingUp, 
  DollarSign, 
  Zap, 
  BarChart3, 
  CheckCircle2,
  Video,
  PlayCircle,
  Tv,
  Users,
  Star,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onStartDistributing: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard, onStartDistributing }) => {
  return (
    <div className="bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Music className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                OrbitX Music
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#video" className="hover:text-rose-400 transition-colors">Video Distribution</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#payouts" className="hover:text-white transition-colors">Royalties & Payouts</a>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={onEnterDashboard}
                className="text-slate-400 hover:text-white font-semibold transition-colors hidden sm:block"
              >
                Log In
              </button>
              <button 
                onClick={onStartDistributing}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-rose-500/10 blur-[100px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-full text-rose-400 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
            <Video size={14} /> Direct Vevo & Apple Music Video Partner
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
            Distribute Your Music & Video <br />
            <span className="bg-gradient-to-r from-rose-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Globally & Professionally
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            OrbitX helps independent artists deliver <span className="text-white font-bold">Unlimited Audio</span> to Spotify and <span className="text-rose-500 font-bold">Premium Music Videos</span> directly to Vevo, Apple Music Video, and Tidal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={onStartDistributing}
              className="group relative px-10 py-5 bg-rose-600 hover:bg-rose-700 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-rose-500/30 flex items-center gap-3"
            >
              Start Distributing
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-slate-500 font-medium">Keep <span className="text-emerald-400">100% of your royalties</span>. No hidden fees.</p>
          </div>

          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" className="h-8" alt="Spotify" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg" className="h-8" alt="Apple Music" />
            <span className="text-3xl font-black italic text-rose-600">vevo</span>
            <span className="text-2xl font-bold tracking-tighter">TIDAL</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Amazon_Music_logo.svg" className="h-8" alt="Amazon" />
          </div>
        </div>
      </section>

      {/* Video Distribution Highlight */}
      <section id="video" className="py-24 px-4 bg-slate-900/20 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-rose-600/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-800 aspect-video shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Premium Music Video" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Live Tracking</p>
                    <p className="text-lg font-bold">Vevo Channel Active</p>
                  </div>
                  <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <PlayCircle size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl w-fit">
                <Tv size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Your Music Video on <br />
                <span className="text-rose-500">Every Big Screen.</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Metadata optimization and high-quality video uploads for direct distribution to the Vevo platform. We handle the technical certification for Apple Music Video and Tidal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Official Vevo Channel Creation",
                  "4K ProRes Video Delivery",
                  "Metadata SEO for Video",
                  "Apple Music TV Syndication"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
              <button 
                onClick={onEnterDashboard}
                className="inline-flex items-center gap-2 text-rose-500 font-bold hover:gap-4 transition-all"
              >
                Learn about Video Distribution <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid - Based on Prompt Requirements */}
      <section id="features" className="py-32 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Complete Artist Ecosystem</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">Comprehensive tools for professional and independent artists under one roof.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="text-indigo-400" />}
              title="Unlimited Distribution"
              desc="Upload unlimited songs with no monthly or annual fees (even on the free plan). Global reach to 220+ platforms."
            />
            <FeatureCard 
              icon={<Award className="text-rose-400" />}
              title="YouTube OAC"
              desc="We help you convert your YouTube channel into an Official Artist Channel (OAC)."
            />
            <FeatureCard 
              icon={<Zap className="text-amber-400" />}
              title="AI Mixing & Mastering"
              desc="Proprietary AI-powered mixing and mastering tools to give artists a professional sound before release."
            />
            <FeatureCard 
              icon={<TrendingUp className="text-emerald-400" />}
              title="Analytics Dashboard"
              desc="Detailed data and graphs showing how many people are listening and how much is being earned from each country."
            />
            <FeatureCard 
              icon={<PlayCircle className="text-purple-400" />}
              title="Smart Links & Pre-save"
              desc="Create pre-save links to build hype before your music releases."
            />
            <FeatureCard 
              icon={<Users className="text-sky-400" />}
              title="Playlist Pitching"
              desc="Apply directly to major playlists. DIY marketing tools for social media engagement."
            />
          </div>
        </div>
      </section>

      {/* Financial Section - "Payout" focus */}
      <section id="payouts" className="py-24 px-4 bg-indigo-600/5 border-t border-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
                Financial Empowerment
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Keep Every Cent. <br />
                <span className="text-indigo-500">Get Paid Faster.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shrink-0">
                    <DollarSign className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">100% Royalties</h4>
                    <p className="text-slate-500 text-sm mt-1">Artists keep 100% of their earned royalties. We never take a cut of your earnings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap className="text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Royalty Advances</h4>
                    <p className="text-slate-500 text-sm mt-1">Get advances on future earnings based on your previous song performance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Fast Payouts</h4>
                    <p className="text-slate-500 text-sm mt-1">Withdraw funds faster than other platforms. No complex thresholds.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <BarChart3 className="text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors" size={120} />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Live Earnings Hub</p>
                  <p className="text-6xl font-black mb-2">$12,402.15</p>
                  <p className="text-emerald-400 font-bold flex items-center gap-2 mb-8">
                    <TrendingUp size={20} /> +$842.00 this month
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600/10 rounded-lg flex items-center justify-center text-indigo-400 font-bold text-xs italic">vv</div>
                        <span className="text-sm font-bold">Vevo Royalty Sync</span>
                      </div>
                      <span className="text-sm font-black">$421.20</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-600/10 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-xs italic">sp</div>
                        <span className="text-sm font-bold">Spotify Direct Feed</span>
                      </div>
                      <span className="text-sm font-black">$2,104.50</span>
                    </div>
                  </div>
                  <button 
                    onClick={onEnterDashboard}
                    className="w-full mt-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    Withdraw Funds Now <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Ready to join the <br /><span className="text-rose-500 italic">OrbitX Elite?</span></h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Start distributing your audio and videos globally with the fastest ingestion pipeline in the industry.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartDistributing}
              className="px-12 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-2xl transition-all shadow-2xl shadow-indigo-600/30"
            >
              Get Started Free
            </button>
            <button className="px-12 py-6 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-3xl font-black text-2xl transition-all">
              Label Services
            </button>
          </div>
          <p className="mt-8 text-slate-500 font-bold flex items-center justify-center gap-2">
            <Star className="text-amber-500 fill-amber-500" size={16} /> Rated 4.9/5 by 10k+ independent creators
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-slate-500">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Music className="text-white" size={18} />
              </div>
              <span className="text-2xl font-bold text-white tracking-tighter">OrbitX Music</span>
            </div>
            <p className="max-w-xs leading-relaxed">The global standard for independent music and video distribution. Direct API access to Vevo, Apple Music, and Spotify.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Audio Distribution</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Video Distribution</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Studio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube OAC</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          © 2024 OrbitX Music Distribution. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-900 hover:border-indigo-500/20 transition-all hover:-translate-y-2 group">
    <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-8 border border-slate-800 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

export default LandingPage;
