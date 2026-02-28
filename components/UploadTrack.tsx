import React, { useState } from 'react';
import { 
  Music, 
  ImageIcon, 
  Calendar, 
  Tag, 
  ChevronRight, 
  Upload, 
  CheckCircle, 
  Video, 
  FileVideo, 
  Loader2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { ReleaseType } from '../types';
import { GoogleGenAI } from "@google/genai";

interface UploadTrackProps {
  onComplete?: () => void;
}

const UploadTrack: React.FC<UploadTrackProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); 
  const [releaseType, setReleaseType] = useState<ReleaseType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genre: 'Pop',
    releaseDate: '',
    isrc: '',
    language: 'English',
    description: ''
  });

  const genres = ['Pop', 'Rock', 'Folk', 'Hip Hop', 'Classical', 'Electronic', 'Jazz', 'R&B'];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const selectType = (type: ReleaseType) => {
    setReleaseType(type);
    nextStep();
  };

  const handleAuditMetadata = async () => {
    setIsSubmitting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a Metadata Compliance Officer for ${releaseType === 'Video' ? 'Vevo and Apple Music Video' : 'Spotify and Tidal'}. 
      Audit this release:
      Title: ${formData.title}
      Artist: ${formData.artist}
      Genre: ${formData.genre}
      Description: ${formData.description}
      
      Provide a brief 3-point compliance check:
      1. Title format suitability.
      2. Genre match probability.
      3. Potential platform flags (prohibited keywords etc).
      Keep it very concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setValidationResult(response.text);
      nextStep();
    } catch (error) {
      console.error(error);
      nextStep(); // Proceed anyway in case of error for demo
    } finally {
      setIsSubmitting(false);
    }
  };

  const finalSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API calls to Vevo/Spotify
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold mb-2">Create New Release</h2>
        <p className="text-slate-400">The gateway to professional global distribution.</p>
      </div>

      {/* Stepper */}
      {step > 0 && step < 4 && (
        <div className="flex items-center justify-between mb-12 relative max-w-md mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                step >= s ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              {step > s ? <CheckCircle size={20} /> : s}
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        {step === 0 && (
          <div className="space-y-8 text-center">
            <h3 className="text-2xl font-bold">What are you releasing today?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => selectType('Audio')}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-950/50 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Music size={40} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Audio Track</h4>
                  <p className="text-slate-500 text-sm mt-1">Spotify, Apple, Amazon & 220+ others</p>
                </div>
              </button>
              
              <button 
                onClick={() => selectType('Video')}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-950/50 hover:border-rose-500/50 hover:bg-rose-500/5 transition-all group flex flex-col items-center gap-4"
              >
                <div className="w-20 h-20 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video size={40} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Music Video</h4>
                  <p className="text-slate-500 text-sm mt-1">Vevo, Apple Music, Tidal, Amazon Video</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {releaseType === 'Audio' ? <Music className="text-indigo-400" size={20} /> : <FileVideo className="text-rose-400" size={20} />}
              Step 1: Media Asset Upload
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400">
                  {releaseType === 'Audio' ? 'Audio File (WAV 24-bit preferred)' : 'Video File (ProRes or MP4 1080p+)' }
                </label>
                <div className={`border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all bg-slate-950/50 cursor-pointer group ${releaseType === 'Audio' ? 'hover:border-indigo-500/50' : 'hover:border-rose-500/50'}`}>
                  <div className={`p-4 rounded-full group-hover:scale-110 transition-transform ${releaseType === 'Audio' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    <Upload size={32} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Select {releaseType} File</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {releaseType === 'Audio' ? 'Max 250MB' : 'Max 5GB'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-400">
                  {releaseType === 'Audio' ? 'Cover Art (3000x3000px)' : 'Vevo-Compliant Thumbnail'}
                </label>
                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-purple-500/50 transition-all bg-slate-950/50 cursor-pointer group">
                  <div className="p-4 bg-purple-500/10 rounded-full text-purple-400 group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Select Artwork</p>
                    <p className="text-xs text-slate-500 mt-1">RGB, 300 DPI, JPG/PNG</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={prevStep} className="text-slate-400 hover:text-white px-6 py-3 font-bold">Back</button>
              <button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">Next Step <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Tag className="text-indigo-400" size={20} />
              Step 2: Metadata & Delivery Specs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">{releaseType} Title</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                  placeholder="Official Title"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Primary Artist</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                  placeholder="Artist Name"
                  value={formData.artist}
                  onChange={e => setFormData({...formData, artist: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Primary Genre</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                  value={formData.genre}
                  onChange={e => setFormData({...formData, genre: e.target.value})}
                >
                  {genres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Release Date</label>
                <input 
                  type="date" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none"
                  value={formData.releaseDate}
                  onChange={e => setFormData({...formData, releaseDate: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-slate-400">Description / Credits</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-indigo-500 outline-none min-h-[100px]"
                  placeholder="Lyrics, producer credits, and social links..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button onClick={prevStep} className="text-slate-400 hover:text-white px-6 py-3 font-bold">Back</button>
              <button 
                onClick={handleAuditMetadata}
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {isSubmitting ? 'Auditing Metadata...' : 'Run Metadata Audit'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
              <Sparkles className="text-indigo-400 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-indigo-400">Gemini AI Audit Result</h4>
                <p className="text-xs text-slate-400 mt-1 whitespace-pre-wrap">{validationResult || 'Audit completed with no warnings.'}</p>
              </div>
            </div>

            <div className="text-center py-4">
              <h3 className="text-2xl font-bold">Confirm Global Distribution</h3>
              <p className="text-slate-400 max-w-md mx-auto mt-2">
                Your {releaseType?.toLowerCase()} will be delivered to:
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {releaseType === 'Video' ? (
                  ['Vevo', 'Apple Music', 'Tidal', 'Amazon Video'].map(p => (
                    <span key={p} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-bold">{p}</span>
                  ))
                ) : (
                  ['Spotify', 'Apple Music', 'Amazon', 'Tidal', 'Deezer'].map(p => (
                    <span key={p} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-bold">{p}</span>
                  ))
                )}
                <span className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-full text-xs font-bold">+220 More</span>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <button onClick={prevStep} className="text-slate-400 hover:text-white px-8 py-3 font-bold">Modify Details</button>
              <button 
                onClick={finalSubmit}
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-indigo-500/20"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle size={20} />}
                {isSubmitting ? 'Starting Distribution...' : 'Begin Distribution'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadTrack;