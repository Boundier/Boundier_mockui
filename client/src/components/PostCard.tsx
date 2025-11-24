import { Post } from "@/data/mockPosts";
import { motion } from "framer-motion";
import { Play, MessageCircle, Repeat2, Heart, Share, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import boundierIcon from "@assets/2_1763890306084.png";

interface PostCardProps {
  post: Post;
  onAnalyze: (post: Post) => void;
}

export function PostCard({ post, onAnalyze }: PostCardProps) {
  return (
    <motion.div
      className="border-b border-gray-100 bg-white p-4 hover:bg-gray-50 transition-colors"
      layoutId={`post-${post.id}`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="font-bold text-gray-900 truncate text-[15px]">User Name</span>
              <span className="text-gray-500 text-[14px] truncate">@username</span>
              <span className="text-gray-500 text-[14px]">·</span>
              <span className="text-gray-500 text-[14px] hover:underline cursor-pointer">
                {Math.floor((Date.now() - post.timestamp) / 3600000)}h
              </span>
            </div>
            <div className="text-gray-400 hover:bg-blue-50 hover:text-blue-500 p-1.5 rounded-full transition-colors -mr-2">
              <MoreHorizontal size={18} />
            </div>
          </div>

          {/* Text */}
          <div className="text-[15px] text-gray-900 leading-normal mb-3 whitespace-pre-wrap break-words">
            <p className="mb-1 font-bold">{post.title}</p>
            {post.text}
          </div>

          {/* Media */}
          {post.imageUrl && (
            <div className="rounded-2xl overflow-hidden border border-gray-200 mb-3 relative aspect-video bg-gray-100">
               <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              {/* Video Overlay */}
              {post.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              )}
              {post.type === 'video' && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                  2:14
                </div>
              )}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex justify-between items-center max-w-[425px] text-gray-500">
            <button className="group flex items-center gap-2 hover:text-blue-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs group-hover:text-blue-500">24</span>
            </button>

            <button className="group flex items-center gap-2 hover:text-green-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                <Repeat2 size={18} />
              </div>
              <span className="text-xs group-hover:text-green-500">12</span>
            </button>

            <button className="group flex items-center gap-2 hover:text-pink-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                <Heart size={18} />
              </div>
              <span className="text-xs group-hover:text-pink-500">148</span>
            </button>

            {/* Share Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                    <Share size={18} />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                  Copy link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                  Share via...
                </DropdownMenuItem>
                <div className="h-px bg-gray-100 my-1" />
                <DropdownMenuItem 
                  onClick={() => onAnalyze(post)}
                  className="cursor-pointer font-medium text-[#0038FF] focus:text-[#0038FF] focus:bg-blue-50 gap-2"
                >
                   <img src={boundierIcon} className="w-4 h-4 rounded-sm object-cover" />
                   Analyze with Boundier
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
