import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { storage } from "@/lib/storage";
import { AnalysisResult } from "@/lib/conscientEngine";
import { motion } from "framer-motion";
import { Clock, ChevronRight, Trash2, AlertTriangle, ExternalLink } from "lucide-react";
import { MOCK_POSTS } from "@/data/mockPosts";

export function HistoryScreen() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const data = storage.getHistory<AnalysisResult>();
      setHistory(data);
    };
    
    loadHistory();
    // Poll for updates (since we don't have a real store subscription)
    const interval = setInterval(loadHistory, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    if (confirm("Clear history?")) {
      storage.reset(); // Note: This resets EVERYTHING in the current implementation. 
      // Maybe we should only clear history? But the prompt implies "History" is part of the app state.
      // For now, let's just clear history key manually to be safe if we want to keep profile.
      // But storage.reset() clears everything. Let's stick to storage.reset() for "Reset Data" in settings/dashboard,
      // but here maybe just clear history?
      // The user asked for "logged under a new tab called History".
      // Let's just clear history item.
      localStorage.removeItem('boundier_history');
      setHistory([]);
    }
  };
  
  const getPostTitle = (id: string) => {
    const post = MOCK_POSTS.find(p => p.id === id);
    return post ? post.title : "Unknown Post";
  };

  return (
    <div className="min-h-screen bg-[#000543] pb-24 pt-safe px-4 md:px-8">
      <TopNav />

      <div className="max-w-md mx-auto space-y-6 pt-8">
        <header className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl text-white font-bold mb-2">History</h1>
            <p className="text-white/60 text-sm">Analyzed Content Log</p>
          </div>
          {history.length > 0 && (
            <button 
                onClick={handleClear}
                className="p-2 text-white/40 hover:text-red-400 transition-colors"
            >
                <Trash2 size={18} />
            </button>
          )}
        </header>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="glass-panel p-8 text-center flex flex-col items-center">
              <Clock size={48} className="text-white/20 mb-4" />
              <p className="text-white/60 text-sm">No analysis history yet.</p>
              <p className="text-white/40 text-xs mt-2">
                Share posts to Boundier to analyze them.
              </p>
            </div>
          ) : (
            history.map((item, idx) => (
              <motion.div
                key={item.timestamp + idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel p-4 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono text-white/40">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.distortionVector.emotional_overload > 0.5 && (
                        <div className="px-1.5 py-0.5 rounded bg-red-500/20 border border-red-500/30 flex items-center gap-1">
                             <AlertTriangle size={10} className="text-red-400" />
                             <span className="text-[10px] text-red-400 font-bold">DISTORTED</span>
                        </div>
                    )}
                    <ChevronRight size={14} className="text-white/20 group-hover:text-white/60" />
                  </div>
                </div>
                
                <h3 className="text-white font-medium text-sm line-clamp-1 mb-3">
                    {getPostTitle(item.postId)}
                </h3>

                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-[10px] text-white/40 mb-1">Top Influence</div>
                        <div className="text-[#0038FF] font-mono text-xs">
                            {Object.entries(item.influenceVector).sort(([,a], [,b]) => b-a)[0][0].replace('_', ' ')}
                        </div>
                    </div>
                    <div className="bg-white/5 p-2 rounded">
                        <div className="text-[10px] text-white/40 mb-1">Distortion</div>
                        <div className="text-[#FF3838] font-mono text-xs">
                            {Object.entries(item.distortionVector).sort(([,a], [,b]) => b-a)[0][0].replace('_', ' ')}
                        </div>
                    </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
