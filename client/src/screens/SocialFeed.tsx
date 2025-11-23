import { useState } from "react";
import { Link } from "wouter";
import { MOCK_POSTS, Post } from "@/data/mockPosts";
import { PostCard } from "@/components/PostCard";
import { AnalysisSidebar } from "@/components/AnalysisSidebar";
import { EdgeIndicator } from "@/components/EdgeIndicator";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart2 } from "lucide-react";

export function SocialFeed() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setActivePost(post);
    setSidebarOpen(true);
  };

  const handleEdgeClick = () => {
    // If no specific post selected, default to the first visible or just the first one
    if (!activePost) setActivePost(MOCK_POSTS[0]);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden flex flex-col">
      
      {/* Fake App Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
           <Link href="/">
             <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
               <ArrowLeft size={20} />
             </button>
           </Link>
           <h1 className="font-bold text-lg text-gray-900 tracking-tight">Social <span className="font-normal text-gray-400 text-sm">(mock)</span></h1>
        </div>
      </header>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto p-4 pt-6">
          {MOCK_POSTS.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={() => handlePostClick(post)} 
            />
          ))}
          
          <div className="text-center py-8 text-gray-400 text-sm">
            End of mock feed
          </div>
        </div>
      </div>

      {/* Edge Indicator */}
      {!sidebarOpen && <EdgeIndicator onClick={handleEdgeClick} />}

      {/* Analysis Sidebar */}
      <AnalysisSidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose} 
        post={activePost}
        onApply={() => {}}
      />

    </div>
  );
}
