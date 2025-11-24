import { useState } from "react";
import { Link } from "wouter";
import { MOCK_POSTS, Post } from "@/data/mockPosts";
import { PostCard } from "@/components/PostCard";
import { AnalysisSidebar } from "@/components/AnalysisSidebar";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analyzePost, updateVulnerabilityProfile, AnalysisResult } from "@/lib/conscientEngine";
import { storage } from "@/lib/storage";

export function SocialFeed() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const { toast } = useToast();

  // We keep the sidebar logic but trigger it differently now (via Share menu)
  // Or actually, the user said "share button add boundier for indiviual manual post analysis for further stats/ details"
  // "logged under a new tab called History"
  
  // So maybe we don't show the sidebar immediately? Or do we?
  // "further stats/details" implies we might want to see it.
  // Let's show the sidebar for immediate feedback AND save to history.

  const handleAnalyze = (post: Post) => {
    setActivePost(post);
    setSidebarOpen(true);
    
    // Perform analysis and save to history
    const result = analyzePost(post, {
        dwellTimeMs: 4000,
        tapCount: 1,
        scrollSpeed: "normal",
        clickedWithin2s: true,
        openCount: 1
    });

    // Update profile (simulated "reading" it)
    updateVulnerabilityProfile(result.influenceVector, result.distortionVector, result.responseVector);

    // Save to History
    storage.addHistoryItem(result);

    toast({
      title: "Sent to Boundier",
      description: "Analysis saved to History.",
    });
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="bg-white min-h-screen relative overflow-hidden flex flex-col">
      
      {/* Fake App Header - Twitter style */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-6">
         <Link href="/">
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-900 transition-colors">
             <ArrowLeft size={20} />
           </button>
         </Link>
         <h1 className="font-bold text-lg text-gray-900">Home</h1>
      </header>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto">
          {MOCK_POSTS.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onAnalyze={handleAnalyze} 
            />
          ))}
          
          <div className="text-center py-8 text-gray-400 text-sm">
            You're all caught up!
          </div>
        </div>
      </div>

      {/* Analysis Sidebar (Still useful for immediate view) */}
      <AnalysisSidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose} 
        post={activePost}
        onApply={() => {}}
      />

    </div>
  );
}
