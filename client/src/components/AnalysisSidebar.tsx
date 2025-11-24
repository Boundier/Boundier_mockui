import { Post } from "@/data/mockPosts";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, BarChart2 } from "lucide-react";
import { analyzePost, AnalysisResult, updateVulnerabilityProfile } from "@/lib/conscientEngine";
import { useEffect, useState } from "react";

interface AnalysisSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onApply: () => void;
}

export function AnalysisSidebar({ isOpen, onClose, post, onApply }: AnalysisSidebarProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (isOpen && post) {
      const result = analyzePost(post, {
        dwellTimeMs: 4000, // Mock dwell time
        tapCount: 1,
        scrollSpeed: "normal",
        clickedWithin2s: true,
        openCount: 1
      });
      setAnalysis(result);
      
      // Auto-sync as requested in prompt
      updateVulnerabilityProfile(result.influenceVector, result.distortionVector, result.responseVector);
    }
  }, [isOpen, post]);

  const handleApply = () => {
    if (analysis) {
      updateVulnerabilityProfile(analysis.influenceVector, analysis.distortionVector, analysis.responseVector);
      if (navigator.vibrate) navigator.vibrate(50);
      onApply();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[300px] z-50 p-4 flex flex-col"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="glass-panel-dark flex-1 flex flex-col overflow-hidden text-white border-l border-white/10 shadow-2xl">
            
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent-foreground">
                <Activity size={18} className="text-[#0038FF]" />
                <span className="font-bold text-sm tracking-wide">CONSCIENT ENGINE</span>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
              {post && (
                <div className="flex gap-3 items-start p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-gray-700 rounded shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold leading-tight opacity-90 line-clamp-2">{post.title}</h4>
                    <p className="text-[10px] opacity-60 mt-1">Detected {(Date.now() - post.timestamp) / 3600000 | 0}h ago</p>
                  </div>
                </div>
              )}

              {analysis && (
                <>
                  {/* Influence Vector */}
                  <div>
                    <h5 className="text-xs uppercase tracking-widest opacity-50 mb-3 font-bold">Influence Vector</h5>
                    <div className="space-y-2">
                      {Object.entries(analysis.influenceVector).map(([key, value]) => (
                        <div key={key} className="group">
                          <div className="flex justify-between text-[10px] uppercase mb-0.5 opacity-80">
                            <span>{key.replace('_', ' ')}</span>
                            <span>{(value * 100).toFixed(0)}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-[#0038FF]"
                              initial={{ width: 0 }}
                              animate={{ width: `${value * 100}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Response Vector */}
                  <div>
                    <h5 className="text-xs uppercase tracking-widest opacity-50 mb-3 font-bold">Predicted Response</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(analysis.responseVector).map(([key, value]) => (
                        <div key={key} className="bg-white/5 p-2 rounded border border-white/5">
                          <div className="text-[9px] uppercase opacity-50 truncate">{key}</div>
                          <div className="text-lg font-mono text-[#0038FF]">{(value * 100).toFixed(0)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="bg-[#0038FF]/20 border border-[#0038FF]/30 p-3 rounded-lg">
                    <p className="text-xs leading-relaxed opacity-90">
                      {analysis.explanation}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <button
                onClick={handleApply}
                className="w-full py-3 bg-[#0038FF] hover:bg-[#0026b3] text-white rounded-lg text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-[0.98]"
              >
                <BarChart2 size={16} />
                APPLY TO DASHBOARD
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
