import { Link, useLocation } from "wouter";
import { Home, BarChart2, Settings, Clock } from "lucide-react";

export function TopNav() {
  const [location] = useLocation();
  
  // Only show nav on Boundier app screens
  const showNav = ['/boundier', '/dashboard', '/settings', '/history'].includes(location);

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#000543] border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <Link href="/boundier">
          <div className={`flex flex-col items-center justify-center w-16 py-1 gap-1 ${location === '/boundier' ? 'text-[#0038FF]' : 'text-white/40'}`}>
            <Home size={20} strokeWidth={location === '/boundier' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Home</span>
          </div>
        </Link>
        
        <Link href="/dashboard">
          <div className={`flex flex-col items-center justify-center w-16 py-1 gap-1 ${location === '/dashboard' ? 'text-[#0038FF]' : 'text-white/40'}`}>
            <BarChart2 size={20} strokeWidth={location === '/dashboard' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Stats</span>
          </div>
        </Link>

        <Link href="/history">
          <div className={`flex flex-col items-center justify-center w-16 py-1 gap-1 ${location === '/history' ? 'text-[#0038FF]' : 'text-white/40'}`}>
            <Clock size={20} strokeWidth={location === '/history' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">History</span>
          </div>
        </Link>

        <Link href="/settings">
          <div className={`flex flex-col items-center justify-center w-16 py-1 gap-1 ${location === '/settings' ? 'text-[#0038FF]' : 'text-white/40'}`}>
            <Settings size={20} strokeWidth={location === '/settings' ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Settings</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
