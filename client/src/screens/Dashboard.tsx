import { useState, useEffect } from "react";
import { TopNav } from "@/components/TopNav";
import { 
  getVulnerabilityProfile, 
  getDistortionProfile,
  getPatternGraph, 
  resetData, 
  InfluenceVector, 
  DistortionVector,
  IntegratedPattern
} from "@/lib/conscientEngine";
import { VulnerabilityRadar } from "@/components/VulnerabilityRadar";
import { PatternLineChart } from "@/components/PatternLineChart";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle, Layers, Network } from "lucide-react";

export function Dashboard() {
  const [profile, setProfile] = useState<InfluenceVector | null>(null);
  const [distortion, setDistortion] = useState<DistortionVector | null>(null);
  const [pattern, setPattern] = useState<IntegratedPattern[]>([]);
  const [latestMetrics, setLatestMetrics] = useState<{echo: number, exposure: number} | null>(null);

  const refreshData = () => {
    setProfile(getVulnerabilityProfile());
    setDistortion(getDistortionProfile());
    
    const currentPattern = getPatternGraph();
    setPattern(currentPattern);
    
    if (currentPattern.length > 0) {
      const last = currentPattern[currentPattern.length - 1];
      setLatestMetrics({
        echo: last.echo_risk,
        exposure: last.exposure_health
      });
    }
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 1000); // Real-time sync
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    if (confirm("Reset all demo data?")) {
      resetData();
      refreshData();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#000543] pb-24 pt-safe px-4 md:px-8">
      <TopNav />

      <div className="max-w-md mx-auto space-y-6 pt-8">
        <header className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl text-white font-bold mb-2">Stats</h1>
            <p className="text-white/60 text-sm">Real-time Influence & Distortion Analysis</p>
          </div>
          <button 
            onClick={handleReset}
            className="p-2 text-white/40 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </header>

        <div className="flex flex-col gap-6">
          {/* Combined Profiles Grid */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Vulnerability Profile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6"
            >
              <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0038FF] rounded-full" />
                VULNERABILITY PROFILE
              </h3>
              {profile && <VulnerabilityRadar data={profile} />}
              <div className="mt-4 text-center text-white/40 text-xs">
                Susceptibility to influence cues
              </div>
            </motion.div>

            {/* Distortion Detection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-panel p-6"
            >
              <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
                <AlertTriangle size={12} className="text-[#FF3838]" />
                DISTORTION SIGNALS
              </h3>
              <div className="space-y-4">
                {distortion && Object.entries(distortion).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-xs text-white/80 mb-1 uppercase">
                      <span>{key.replace('_', ' ')}</span>
                      <span className="font-mono">{Math.round(value * 100)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#FF3838]"
                        initial={{ width: 0 }}
                        animate={{ width: `${value * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-white/40 text-xs">
                Structural reality bending
              </div>
            </motion.div>
          </div>

          {/* Pattern Graph */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6"
          >
            <h3 className="text-white font-bold text-sm mb-6 flex items-center gap-2">
              <ActivityIcon />
              INTEGRATED PATTERN
            </h3>
            <PatternLineChart data={pattern} />
             <div className="mt-4 flex justify-center gap-6 text-[10px]">
              <span className="flex items-center gap-1 text-[#0038FF]"><span className="w-2 h-2 rounded-full bg-[#0038FF]"></span> Influence</span>
              <span className="flex items-center gap-1 text-[#FF3838]"><span className="w-2 h-2 rounded-full bg-[#FF3838]"></span> Distortion</span>
              <span className="flex items-center gap-1 text-[#FFB800]"><span className="w-2 h-2 rounded-full bg-[#FFB800]"></span> Echo Risk</span>
            </div>
          </motion.div>

          {/* Echo & Exposure Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="glass-panel p-4">
              <h4 className="text-white/60 text-xs font-bold mb-2 flex items-center gap-2">
                <Layers size={12} /> ECHO CHAMBER
              </h4>
              <div className="text-2xl font-bold text-[#FFB800] font-mono">
                {latestMetrics ? Math.round(latestMetrics.echo * 100) : 0}%
              </div>
              <p className="text-[10px] text-white/40 mt-1">Viewpoint collapse risk</p>
            </div>

            <div className="glass-panel p-4">
              <h4 className="text-white/60 text-xs font-bold mb-2 flex items-center gap-2">
                <Network size={12} /> EXPOSURE
              </h4>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                {latestMetrics ? Math.round(latestMetrics.exposure * 100) : 0}%
              </div>
              <p className="text-[10px] text-white/40 mt-1">Information diversity</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function ActivityIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}
