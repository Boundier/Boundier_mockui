import { motion } from "framer-motion";
import { TopNav } from "@/components/TopNav";
import { Shield, Activity, Lock, Wifi, AlertTriangle } from "lucide-react";
import logoImage from "@assets/LogoForHeader-removebg-preview_1763889598297.png";

export function Home() {
  return (
    <div className="min-h-screen bg-[#000543] relative overflow-hidden flex flex-col p-6 pb-24 pt-safe">
      
      {/* Header with Logo Top Left */}
      <header className="flex items-center justify-between mb-8 pt-4">
        <img src={logoImage} alt="Boundier" className="h-8 object-contain" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-500 font-bold tracking-wider uppercase">Active</span>
        </div>
      </header>

      {/* Main Status Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 flex flex-col items-center justify-center text-center mb-6 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0038FF]/10 to-transparent opacity-50" />
        
        <div className="w-32 h-32 rounded-full border-4 border-[#0038FF]/30 flex items-center justify-center mb-6 relative">
           <div className="absolute inset-0 rounded-full border-4 border-t-[#0038FF] border-r-transparent border-b-transparent border-l-transparent animate-spin duration-3000" />
           <Shield size={48} className="text-white" />
        </div>
        
        <h2 className="text-2xl text-white font-bold mb-2">Mind Secure</h2>
        <p className="text-white/60 text-sm max-w-[200px]">
          Real-time influence detection is active across your device.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-panel p-4 flex flex-col gap-2">
          <Activity size={20} className="text-[#0038FF]" />
          <span className="text-2xl text-white font-bold">Low</span>
          <span className="text-white/40 text-[10px] uppercase tracking-wider">Vulnerability</span>
        </div>
        <div className="glass-panel p-4 flex flex-col gap-2">
          <Lock size={20} className="text-[#0038FF]" />
          <span className="text-2xl text-white font-bold">6</span>
          <span className="text-white/40 text-[10px] uppercase tracking-wider">Apps Monitored</span>
        </div>
      </div>

      {/* Recent Activity / Alerts */}
      <div className="flex-1">
        <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
              <AlertTriangle size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">Clickbait Detected</h4>
              <p className="text-white/40 text-[10px]">Social • 2 mins ago</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
             <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
              <Wifi size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">Engine Updated</h4>
              <p className="text-white/40 text-[10px]">System • 1 hour ago</p>
            </div>
          </div>
        </div>
      </div>

      <TopNav />
    </div>
  );
}
