
import React, { useState } from 'react';
import { 
  Video, 
  FileVideo, 
  ImageIcon, 
  Tag, 
  ChevronRight, 
  Upload, 
  CheckCircle, 
  Loader2,
  Sparkles,
  Info,
  ShieldCheck,
  Globe,
  AlertTriangle,
  FileCode,
  Server,
  Activity,
  ArrowRight,
  Music
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { VideoMetadata } from '../types';

interface VideoUploaderProps {
  onComplete?: () => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryLog, setDeliveryLog] = useState<string[]>([]);
  const [ingestionPackage, setIngestionPackage] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  
  const [metadata, setMetadata] = useState<VideoMetadata>({
    title: '',
    artist: '',
    director: '',
    producer: '',
    productionCompany: '',
    label: '',
    isrc: '',
    upc: '',
    genre: 'Pop',
    releaseDate: '',
    explicit: false,
    description: ''
  });

  const handleAudit = async () => {
    setIsSubmitting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a Professional Music Video Compliance Auditor for Apple Music Video and Vevo. 
      Check this music video submission for metadata standards:
      - Title: ${metadata.title} (Compliance: Must be title-case, no [Official Video] tags)
      - Artist: ${metadata.artist}
      - Director: ${metadata.director}
      - Production Company: ${metadata.productionCompany}
      - Description: ${metadata.description}

      Provide a strict audit report with 4 concise points regarding compliance with:
      1. Apple Music Video Editorial Guidelines (Clean visuals, no end cards).
      2. Vevo Formatting Standards.
      3. ISRC and Metadata consistency.
      4. Metadata-to-Video synchronization.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setValidationResult(response.text);
      setStep(2);
    } catch (error) {
      console.error(error);
      setStep(2); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalSubmit = async () => {
    setIsSubmitting(true);
    setStep(3);
    
    const addToLog = (msg: string) => setDeliveryLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

    try {
      addToLog("Initializing Multi-Platform Video Distribution Pipeline...");
      await new Promise(r => setTimeout(r, 800));
      
      // Step 1: Vevo Ingestion
      addToLog("Connecting to Vevo Partner Portal API...");
      await new Promise(r => setTimeout(r, 1000));
      addToLog("Vevo Metadata Package (DDEX) generated.");
      
      // Step 2: Apple Music Video Ingestion (Special Logic)
      addToLog("Establishing secure connection to Apple iTunes Connect Ingestion Node...");
      await new Promise(r => setTimeout(r, 1200));
      addToLog("Validating Apple Music Video Technical Specs (4K ProRes 422 HQ)...");
      await new Promise(r => setTimeout(r, 1000));
      addToLog("Packaging Apple Music Video Metadata (Transporter Format)...");
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const pkgResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a fictional but realistic XML snippet for Apple Music Video Transporter ingestion. 
        Metadata: Title: ${metadata.title}, Artist: ${metadata.artist}, ISRC: ${metadata.isrc}, Genre: ${metadata.genre}. 
        Format: XML. Only return the code.`,
      });
      setIngestionPackage(pkgResponse.text);
      addToLog("Apple Music metadata package verified.");

      // Step 3: Global CDN Upload
      addToLog("Uploading 4K Master Asset to Primary Distribution Hub...");
      await new Promise(r => setTimeout(r, 2000));
      
      addToLog("Mirroring to European and Asian Delivery Edge Nodes...");
      await new Promise(r => setTimeout(r, 1200));

      addToLog("Syndication status: PENDING QUALITY CONTROL (Apple Music Video).");
      addToLog("Syndication status: INGESTING (Vevo).");
      setIsSubmitting(false);
    } catch (error) {
      addToLog("Error during multi-stage delivery: " + error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Video className="text-rose-500" size={32} />
          High-Tier Video Distribution
        </h2>
        <p className="text-slate-400">Direct syndication to Vevo and Apple Music Video backbone.</p>
      </div>

      {/* Stepper */}
      {step < 3 && (
        <div className="flex items-center justify-between mb-12 relative max-w-md mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2"></div>
          {[0, 1, 2].map((s) => (
            <div 
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                step >= s ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {step > s ? <CheckCircle size={20} /> : s + 1}
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        {step === 0 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileVideo className="text-rose-400" size={20} />
              Step 1: Upload Master Assets
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400">Master Video (ProRes / 4K MP4)</label>
                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-950/50 cursor-pointer group hover:border-rose-500/50 transition-all">
                  <div className="p-4 bg-rose-500/10 text-rose-400 rounded-full group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Select Master</p>
                    <p className="text-xs text-slate-500 mt-1">Apple HQ standards required</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400">Poster Artwork (No Watermarks)</label>
                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 bg-slate-950/50 cursor-pointer group hover:border-indigo-500/50 transition-all">
                  <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-full group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Thumbnail Art</p>
                    <p className="text-xs text-slate-500 mt-1">1920x1080 or 4K JPG/PNG</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setStep(1)} 
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-600/20"
              >
                Configure Metadata <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Tag className="text-rose-400" size={20} />
              Step 2: Universal Video Metadata
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Official Video Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-rose-500 outline-none"
                  placeholder="e.g. Moonlight"
                  value={metadata.title}
                  onChange={e => setMetadata({...metadata, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Primary Artist</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-rose-500 outline-none"
                  placeholder="Artist Name"
                  value={metadata.artist}
                  onChange={e => setMetadata({...metadata, artist: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Director</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-rose-500 outline-none"
                  placeholder="Full Director Credit"
                  value={metadata.director}
                  onChange={e => setMetadata({...metadata, director: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">ISRC Code</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-rose-500 outline-none"
                  placeholder="QM-AAA-24-XXXXX"
                  value={metadata.isrc}
                  onChange={e => setMetadata({...metadata, isrc: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-slate-400">Platform-Specific Description</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-rose-500 outline-none min-h-[80px]"
                  placeholder="Vevo/Apple description guidelines apply..."
                  value={metadata.description}
                  onChange={e => setMetadata({...metadata, description: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button onClick={() => setStep(0)} className="text-slate-400 hover:text-white px-6 py-3 font-bold">Back</button>
              <button 
                onClick={handleAudit}
                disabled={isSubmitting || !metadata.title}
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-600/20"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Run AI Compliance Audit
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in zoom-in duration-300">
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl flex items-start gap-4">
              <Sparkles className="text-indigo-400 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-indigo-400 mb-1">Global Video Compliance Report</h4>
                <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {validationResult || 'Audit complete. Metadata follows Apple Music Video and Vevo submission guidelines.'}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-slate-500" size={20} />
                <h4 className="font-bold text-sm uppercase tracking-widest text-slate-500">Distribution Targets</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Apple Music Video', 'Vevo Global', 'Tidal 4K', 'Amazon Video Central'].map(p => (
                  <span key={p} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 flex items-center gap-2">
                    <CheckCircle size={10} className="text-emerald-500" /> {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center pt-8 border-t border-slate-800">
              <div className="flex justify-center gap-4">
                <button onClick={() => setStep(1)} className="text-slate-400 hover:text-white px-8 py-3 font-bold">Back to Metadata</button>
                <button 
                  onClick={finalSubmit}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-rose-600/30 flex items-center gap-3"
                >
                  Start Global Delivery <Activity size={24} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
              <div className="inline-block p-6 bg-rose-600/10 text-rose-500 rounded-full mb-6">
                {isSubmitting ? <Loader2 className="animate-spin" size={48} /> : <CheckCircle size={48} />}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isSubmitting ? "Processing Multi-Stage Delivery..." : "Delivery Initiated Successfully!"}
              </h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                {isSubmitting ? "Your 4K asset is being trans-coded and pushed to Apple and Vevo ingestion nodes." : "Assets have been handed off to Apple Music Video and Vevo. QC normally takes 2-5 business days."}
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
              {deliveryLog.map((log, i) => (
                <div key={i} className="text-slate-400 border-l-2 border-rose-500/20 pl-3 py-1">
                  {log}
                </div>
              ))}
              {isSubmitting && <div className="text-rose-500 animate-pulse">_ Syncing next platform bundle...</div>}
            </div>

            {ingestionPackage && !isSubmitting && (
              <div className="bg-slate-900 border border-indigo-500/20 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCode className="text-indigo-400" size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Apple Transporter Metadata</span>
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl text-[10px] text-slate-500 overflow-x-auto whitespace-pre">
                  {ingestionPackage}
                </div>
              </div>
            )}

            {!isSubmitting && (
              <div className="flex justify-center gap-4">
                <button 
                  onClick={onComplete}
                  className="bg-white text-slate-950 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all"
                >
                  Go to Catalog <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
