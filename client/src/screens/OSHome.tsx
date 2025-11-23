import { Link } from "wouter";
import { motion } from "framer-motion";
import { Wifi, Battery, Signal } from "lucide-react";
import logoImage from "@assets/LogoForHeader-removebg-preview_1763889598297.png";

export function OSHome() {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Wallpaper */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-blue-900/40" />
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-60"
          alt="Wallpaper"
        />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Status Bar */}
      <div className="relative z-10 px-6 py-3 flex justify-between items-center text-white/80 text-xs font-medium">
        <span>{currentTime}</span>
        <div className="flex gap-2">
          <Signal size={14} />
          <Wifi size={14} />
          <Battery size={14} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col p-6">
        {/* Date/Time Widget */}
        <div className="mt-8 mb-auto">
          <h1 className="text-6xl font-thin text-white tracking-tighter mb-1">{currentTime}</h1>
          <p className="text-white/80 text-lg font-light">{currentDate}</p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          
          {/* Boundier App Icon */}
          <Link href="/boundier">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#000543] flex items-center justify-center shadow-lg border border-white/10 group-hover:border-[#0038FF] transition-colors relative overflow-hidden">
                 <div className="absolute inset-0 bg-[#0038FF]/20" />
                 <span className="text-white font-bold text-2xl italic">b_</span>
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md">Boundier</span>
            </motion.div>
          </Link>

          {/* Social Mock Icon */}
          <Link href="/social">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center shadow-lg border border-white/10 relative">
                 <div className="w-8 h-8 border-2 border-white rounded-lg" />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md">Social</span>
            </motion.div>
          </Link>

          {/* Mock Icons for realism */}
          {['Mail', 'Maps', 'Camera', 'Photos'].map((app, i) => (
            <div key={i} className="flex flex-col items-center gap-2 opacity-80 grayscale hover:grayscale-0 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md">{app}</span>
            </div>
          ))}

        </div>

        {/* Dock */}
        <div className="mt-auto bg-white/10 backdrop-blur-xl rounded-[2rem] p-4 flex justify-around items-center mb-4 border border-white/5">
           {[1,2,3,4].map((i) => (
             <div key={i} className="w-12 h-12 rounded-xl bg-white/20 shadow-inner" />
           ))}
        </div>
      </div>
    </div>
  );
}
