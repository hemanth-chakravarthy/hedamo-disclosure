'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Badge from '../UI/Badge';
import { Product } from '../../lib/mockData';
import { 
  X, FileText, User, Image as ImageIcon, AlertCircle, 
  Volume2, Pause, Play, RotateCcw, ChevronDown, ChevronUp, Quote
} from 'lucide-react';

export default function DetailView({ product, onClose }: { product: Product, onClose: () => void }) {
  const [imageError, setImageError] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  
  // Audio States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const [audioSupported] = useState(() => 
    typeof window !== 'undefined' && 'speechSynthesis' in window
  );
  
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate the text for both Audio and Transcript
  const narrationText = `Disclosure for ${product.name}. Category: ${product.category}. Producer: ${product.producer}. Status: ${product.status}. This disclosure includes ${product.evidenceCount} supporting documents. Last updated on ${new Date(product.updatedAt).toLocaleDateString()}. Disclosure history includes ${product.versions.length} versions. Statement ends.`;

  const startProgressTimer = () => {
    stopProgressTimer();
    progressIntervalRef.current = setInterval(() => {
      setAudioProgress(prev => (prev >= 100 ? 100 : prev + 0.8));
    }, 100);
  };

  const stopProgressTimer = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  const toggleAudio = () => {
    if (!audioSupported) return setAudioError(true);

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
      stopProgressTimer();
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      startProgressTimer();
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText);
      utterance.rate = 0.9;
      utterance.onstart = () => { setIsPlaying(true); startProgressTimer(); };
      utterance.onend = () => { setIsPlaying(false); setAudioProgress(0); stopProgressTimer(); };
      utterance.onerror = () => { setAudioError(true); setIsPlaying(false); };
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setAudioProgress(0);
    stopProgressTimer();
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* FIXED HEADER */}
        <div className="sticky top-0 z-20 bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-0.5">
                Disclosure Profile
              </span>
              <h2 className="text-sm font-bold text-slate-900 truncate">
                {product.name}
              </h2>
            </div>

            {/* CAPSULE AUDIO PLAYER - HIGH VISIBILITY VERSION */}
{audioSupported && (
  <div className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 rounded-full pl-3 pr-1 py-1 shrink-0 shadow-sm">
    <div className="flex items-center gap-2 mr-1">
      <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'}`} />
      <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">Audio</span>
    </div>
    
    {/* Play/Pause Button */}
    <button
      onClick={toggleAudio}
      className={`p-2 rounded-full transition-all transform active:scale-90 shadow-sm ${
        isPlaying 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : isPaused 
            ? 'bg-amber-500 text-white hover:bg-amber-600'
            : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
      }`}
      aria-label={isPlaying ? "Pause Narration" : "Play Narration"}
    >
      {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
    </button>
    
    {/* Restart Button */}
    <button
      onClick={stopAudio}
      disabled={!isPlaying && !isPaused}
      className="p-2 rounded-full bg-white text-slate-600 border border-slate-200 hover:text-red-600 hover:border-red-200 disabled:opacity-30 disabled:grayscale transition-all shadow-sm"
      title="Stop and Reset"
    >
      <RotateCcw size={14} strokeWidth={2.5} />
    </button>
  </div>
)}

            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          {audioProgress > 0 && (
            <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-slate-100">
              <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${audioProgress}%` }} />
            </div>
          )}
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
          
          {/* Institutional Disclaimer */}
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50/40 p-4 text-[13px] text-amber-900 leading-relaxed">
            <div className="flex items-center gap-2 mb-1.5 text-amber-700">
              <AlertCircle size={14} />
              <p className="font-bold uppercase text-[10px] tracking-wider">Transparency Notice</p>
            </div>
            <p>This page presents producer-declared information; it is not certification or verification.</p>
          </div>

          {/* AUDIO TRANSCRIPT SECTION (Newly Added) */}
          {audioSupported && (
            <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => setShowTranscript(!showTranscript)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Quote size={14} className="text-blue-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Narration Transcript</span>
                </div>
                {showTranscript ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {showTranscript && (
                <div className="p-4 border-t border-slate-100 animate-in slide-in-from-top duration-200">
                  <p className="text-sm text-slate-600 leading-relaxed italic bg-slate-50/50 p-3 rounded-lg border border-dashed border-slate-200">
                    &ldquo;{narrationText}&rdquo;
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                    <span>Machine-generated summary based on disclosure metadata</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Product Hero */}
          <div className="flex gap-6 mb-10 items-center">
            <div className="w-24 h-24 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden flex-shrink-0 shadow-sm relative">
              {product.imageUrl && !imageError ? (
                <Image src={product.imageUrl} alt="" fill className="object-cover" onError={() => setImageError(true)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl bg-slate-100">📦</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Badge status={product.status} />
              <h3 className="text-xl font-bold text-slate-900 mt-2 leading-tight break-words">{product.name}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wide">{product.category}</p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
              <div className="flex items-center gap-2 mb-1">
                <User size={12} className="text-slate-400" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Producer</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{product.producer}</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={12} className="text-slate-400" />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Evidence</span>
              </div>
              <p className="text-sm font-semibold text-slate-700">{product.evidenceCount} Files</p>
            </div>
          </div>

          {/* History Section */}
          <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-slate-100 pb-2">
               <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Disclosure History</h4>
             </div>
             <div className="space-y-8">
               {product.versions.map((v, i) => (
                 <div key={v.id} className="relative pl-8 group">
                   {i !== product.versions.length - 1 && <div className="absolute left-[11px] top-6 w-[1px] h-full bg-slate-100" />}
                   <div className="absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full bg-white border border-slate-200 flex items-center justify-center z-10">
                     <div className={`w-2 h-2 rounded-full ${v.status === 'Published' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                   </div>
                   <div className="bg-white p-4 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
                     <div className="flex items-center justify-between mb-2">
                       <p className="text-xs font-bold text-slate-800 uppercase tracking-tighter">Version {product.versions.length - i}.0</p>
                       <span className="text-[10px] font-bold text-slate-400">{v.status}</span>
                     </div>
                     <p className="text-xs text-slate-600 italic">Reported by {v.declaredBy}</p>
                     <p className="mt-2 text-[10px] text-slate-400 font-mono">{new Date(v.timestamp).toLocaleString()}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] text-slate-400 text-center italic leading-relaxed">
            Hedamo serves as a repository for producer-reported data and does not verify the accuracy of information.
          </p>
        </div>
      </div>
    </div>
  );
}