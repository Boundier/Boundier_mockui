import { Post } from "@/data/mockPosts";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, FileText } from "lucide-react";

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <motion.div
      className="mb-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
      whileHover={{ y: -2 }}
      layoutId={`post-${post.id}`}
    >
      {/* Mock User Header */}
      <div className="p-3 flex items-center gap-2 border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-2 w-16 bg-gray-100 rounded" />
        </div>
        <div className="text-gray-300 text-xs">
           {Math.floor((Date.now() - post.timestamp) / 3600000)}h
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-gray-100 aspect-video flex items-center justify-center text-gray-400 overflow-hidden">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}
        
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: post.imageUrl ? 'rgba(0,0,0,0.1)' : `hsl(${post.thumbnail.saturation * 360}, 70%, 50%)`,
            opacity: post.imageUrl ? 1 : 0.2
          }}
        />
        
        {/* Icon Overlay */}
        <div className="relative z-10 bg-black/30 p-3 rounded-full backdrop-blur-sm text-white">
          {post.type === "video" && <Play size={24} fill="currentColor" />}
          {post.type === "image" && <ImageIcon size={24} />}
          {post.type === "headline" && <FileText size={24} />}
        </div>
      </div>

      {/* Text */}
      <div className="p-3">
        <h3 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {post.text}
        </p>
      </div>
      
      {/* Footer Actions */}
      <div className="px-3 pb-3 flex gap-4 text-gray-400">
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded ml-auto" />
      </div>
    </motion.div>
  );
}
