import studentExam from "@assets/stock_images/student_taking_exam__d486c2a9.jpg";
import shockedStudent from "@assets/stock_images/shocked_student_look_14eef9b2.jpg";
import graduation from "@assets/stock_images/graduation_scholarsh_ce07a8f3.jpg";
import groupStudy from "@assets/stock_images/group_of_students_st_8816a382.jpg";
import teacher from "@assets/stock_images/classroom_teacher_c3a8c085.jpg";

export interface AudioFlag {
  high_tension: boolean;
  speechRate: number;
}

export interface Thumbnail {
  saturation: number;
  faces: number;
  expression: "neutral" | "shocked" | "happy" | "sad";
}

export interface Post {
  id: string;
  type: "headline" | "video" | "image";
  title: string;
  text: string;
  thumbnail: Thumbnail;
  audioFlag: AudioFlag;
  punctuationIntensity: number;
  capsIntensity: number;
  clickbaitWords: string[];
  timestamp: number;
  imageUrl?: string;
  biasScore: number;
}

const now = Date.now();
const hour = 3600 * 1000;
const day = 24 * hour;

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    type: "headline",
    title: "Experts warn board exams may be harder this year",
    text: "New study suggests changing patterns will increase difficulty.",
    thumbnail: { saturation: 0.2, faces: 0, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 1.0 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: [],
    timestamp: now - 3 * hour,
    imageUrl: studentExam,
    biasScore: 0.2
  },
  {
    id: "post-2",
    type: "video",
    title: "This ONE trick will ruin your exam score — watch now!",
    text: "Students accidentally ignore this crucial step.",
    thumbnail: { saturation: 0.9, faces: 1, expression: "shocked" },
    audioFlag: { high_tension: true, speechRate: 1.4 },
    punctuationIntensity: 2,
    capsIntensity: 1,
    clickbaitWords: ["one trick", "ruin", "watch now"],
    timestamp: now - 1 * day,
    imageUrl: shockedStudent,
    biasScore: 0.8
  },
  {
    id: "post-3",
    type: "image",
    title: "Only 2 hours left to claim the scholarship!",
    text: "Limited seats, apply immediately.",
    thumbnail: { saturation: 0.8, faces: 0, expression: "neutral" },
    audioFlag: { high_tension: true, speechRate: 1.2 },
    punctuationIntensity: 1,
    capsIntensity: 1,
    clickbaitWords: ["only 2 hours", "limited"],
    timestamp: now - 10 * hour,
    imageUrl: graduation,
    biasScore: 0.6
  },
  {
    id: "post-4",
    type: "headline",
    title: "You won’t believe what happened at the exam center...",
    text: "A bizarre turn of events shocked students.",
    thumbnail: { saturation: 0.85, faces: 1, expression: "shocked" },
    audioFlag: { high_tension: true, speechRate: 1.6 },
    punctuationIntensity: 3,
    capsIntensity: 0,
    clickbaitWords: ["you won't believe", "shocking"],
    timestamp: now - 4 * day,
    imageUrl: studentExam, // Reuse as generic exam center
    biasScore: 0.9
  },
  {
    id: "post-5",
    type: "image",
    title: "How study groups helped me improve",
    text: "A student shares practical tips with evidence.",
    thumbnail: { saturation: 0.25, faces: 2, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 0.95 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: [],
    timestamp: now - 2 * day,
    imageUrl: groupStudy,
    biasScore: 0.1
  },
  {
    id: "post-6",
    type: "video",
    title: "Survey: Teachers reveal the top mistakes students make",
    text: "Research-based suggestions inside.",
    thumbnail: { saturation: 0.3, faces: 1, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 1.0 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: ["survey", "reveal"],
    timestamp: now - 5 * day,
    imageUrl: teacher,
    biasScore: 0.3
  },
  {
    id: "post-7",
    type: "headline",
    title: "People like you are skipping this chapter — experts say",
    text: "Identity framing and pressure to conform.",
    thumbnail: { saturation: 0.4, faces: 0, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 1.0 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: ["people like you"],
    timestamp: now - 6 * hour,
    imageUrl: studentExam, // Reuse generic exam
    biasScore: 0.7
  },
  {
    id: "post-8",
    type: "image",
    title: "Beautiful sunset at the campus today 🌅",
    text: "Just taking a moment to appreciate the view after a long day of classes.",
    thumbnail: { saturation: 0.6, faces: 0, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 1.0 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: [],
    timestamp: now - 2 * hour,
    imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop",
    biasScore: 0.0
  },
  {
    id: "post-9",
    type: "headline",
    title: "Coffee shop recommendations near the library?",
    text: "Looking for a quiet place to study with good wifi. Any suggestions?",
    thumbnail: { saturation: 0.1, faces: 0, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 1.0 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: [],
    timestamp: now - 30 * 60000, // 30 mins ago
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop",
    biasScore: 0.0
  },
  {
    id: "post-10",
    type: "image",
    title: "My new setup for coding!",
    text: "Finally upgraded my monitor. Productivity boost incoming.",
    thumbnail: { saturation: 0.4, faces: 0, expression: "neutral" },
    audioFlag: { high_tension: false, speechRate: 1.0 },
    punctuationIntensity: 0,
    capsIntensity: 0,
    clickbaitWords: [],
    timestamp: now - 5 * hour,
    imageUrl: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=2003&auto=format&fit=crop",
    biasScore: 0.0
  }
];
