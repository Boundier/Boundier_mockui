import { Post } from "../data/mockPosts";
import { storage } from "./storage";

export interface InfluenceVector {
  fear: number;
  urgency: number;
  hype: number;
  authority: number;
  curiosity: number;
  visual_hype: number;
}

export interface DistortionVector {
  emotional_overload: number;
  selective_framing: number;
  narrative_skew: number;
}

export interface EchoChamberMetrics {
  viewpoint_diversity: number; // 0-1 (1 is high diversity)
  repetition_score: number;    // 0-1 (1 is high repetition)
  alignment_trend: number;     // 0-1 (1 is high alignment)
}

export interface ExposureMetrics {
  source_variety: number;      // 0-1
  topic_breadth: number;       // 0-1
}

export interface ResponseVector {
  engagement: number;
  hesitation: number;
  fixation: number;
  clickbait_response: number;
}

export interface InteractionMetrics {
  dwellTimeMs: number;
  tapCount: number;
  scrollSpeed: "fast" | "slow" | "normal";
  clickedWithin2s: boolean;
  openCount: number;
}

export interface AnalysisResult {
  influenceVector: InfluenceVector;
  distortionVector: DistortionVector;
  responseVector: ResponseVector;
  explanation: string;
  timestamp: number;
  postId: string;
}

export interface IntegratedPattern {
  influence: number;
  distortion: number;
  echo_risk: number;
  exposure_health: number;
  timestamp: number;
}

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export function analyzePost(post: Post, interaction: InteractionMetrics): AnalysisResult {
  // Influence Vector Calculation
  let fear = 0;
  const lowerTitle = post.title.toLowerCase();
  
  if (["warn", "danger", "risk", "ruin", "experts warn"].some(w => lowerTitle.includes(w))) fear += 0.6;
  if (post.audioFlag.high_tension) fear += 0.2;
  if (post.thumbnail.expression === "shocked") fear += 0.2;

  let urgency = 0;
  if (["now", "today", "last", "only", "limited"].some(w => lowerTitle.includes(w))) urgency += 0.5;
  if (post.punctuationIntensity >= 1 || post.capsIntensity >= 1) urgency += 0.2;
  if (post.thumbnail.saturation > 0.7) urgency += 0.2;

  let hype = 0;
  if (post.clickbaitWords.length > 0) hype += 0.6;
  if (["you won't believe", "shocking"].some(w => lowerTitle.includes(w))) hype += 0.2;

  let authority = 0;
  if (["expert", "study", "research", "survey", "experts"].some(w => lowerTitle.includes(w))) authority += 0.5;

  let curiosity = 0;
  if (lowerTitle.includes("?") || lowerTitle.includes("...") || lowerTitle.startsWith("guess")) curiosity += 0.4;

  let visual_hype = clamp(post.thumbnail.saturation * 0.7 + (post.thumbnail.faces > 0 ? 0.1 : 0), 0, 1);

  const influenceVector: InfluenceVector = {
    fear: clamp(fear, 0, 1),
    urgency: clamp(urgency, 0, 1),
    hype: clamp(hype, 0, 1),
    authority: clamp(authority, 0, 1),
    curiosity: clamp(curiosity, 0, 1),
    visual_hype,
  };

  // Distortion Detection Logic
  // Emotional Overload: High fear/hype/urgency
  const emotional_overload = clamp((fear + hype + urgency) / 3 + (post.punctuationIntensity > 0 ? 0.2 : 0), 0, 1);
  
  // Selective Framing: Authority + Fear/Hype (using authority to push emotion)
  const selective_framing = clamp((authority * 0.5 + (fear + hype) * 0.5), 0, 1);
  
  // Narrative Skew: High bias words + low diversity in phrasing (simulated)
  const narrative_skew = clamp(post.biasScore * 1.2, 0, 1);

  const distortionVector: DistortionVector = {
    emotional_overload,
    selective_framing,
    narrative_skew
  };

  // Response Vector Calculation
  const engagement = clamp(interaction.dwellTimeMs / 8000, 0, 1);
  
  let hesitation = 0;
  if (interaction.dwellTimeMs < 300 && interaction.tapCount > 0) hesitation = 0.6;
  else hesitation = 0.1; // small value

  let fixation = 0;
  if (interaction.openCount > 1 || interaction.dwellTimeMs > 6000) fixation = 1;
  else fixation = clamp(interaction.dwellTimeMs / 6000, 0, 1);

  const clickbait_response = interaction.clickedWithin2s ? 1 : 0;

  const responseVector: ResponseVector = {
    engagement,
    hesitation,
    fixation,
    clickbait_response,
  };

  // Explanation Generation
  const scores = Object.entries(influenceVector).sort(([, a], [, b]) => b - a);
  const top2 = scores.slice(0, 2).map(([k]) => k);
  const distScores = Object.entries(distortionVector).sort(([, a], [, b]) => b - a);
  const topDist = distScores[0][0].replace('_', ' ');
  
  const explanation = `Detected high ${top2.join(" & ")} cues. Distortion signal: ${topDist}.`;

  return {
    influenceVector,
    distortionVector,
    responseVector,
    explanation,
    timestamp: Date.now(),
    postId: post.id,
  };
}

export function updateVulnerabilityProfile(influence: InfluenceVector, distortion: DistortionVector, response: ResponseVector) {
  const currentProfile = storage.getProfile<InfluenceVector>({
    fear: 0, urgency: 0, hype: 0, authority: 0, curiosity: 0, visual_hype: 0
  });

  const responseMagnitude = (response.engagement + response.hesitation + response.fixation + response.clickbait_response) / 4;
  
  const newProfile = { ...currentProfile };
  (Object.keys(newProfile) as Array<keyof InfluenceVector>).forEach(key => {
    const input = influence[key] * responseMagnitude;
    newProfile[key] = 0.15 * input + 0.85 * currentProfile[key];
  });

  storage.saveProfile(newProfile);
  
  // Update Distortion Profile (EWMA)
  const currentDistortion = storage.getDistortion<DistortionVector>({
    emotional_overload: 0, selective_framing: 0, narrative_skew: 0
  });
  
  const newDistortion = { ...currentDistortion };
  (Object.keys(newDistortion) as Array<keyof DistortionVector>).forEach(key => {
     const input = distortion[key] * responseMagnitude;
     newDistortion[key] = 0.15 * input + 0.85 * currentDistortion[key];
  });
  storage.saveDistortion(newDistortion);

  // Update Integrated Pattern Graph
  const sumInfluence = Object.values(influence).reduce((a, b) => a + b, 0);
  const avgInfluence = sumInfluence / 6;
  
  const sumDistortion = Object.values(distortion).reduce((a, b) => a + b, 0);
  const avgDistortion = sumDistortion / 3;

  // Mock Echo/Exposure metrics evolution
  const prevPattern = storage.getPattern<IntegratedPattern>();
  const last = prevPattern[prevPattern.length - 1] || { echo_risk: 0.3, exposure_health: 0.7 };
  
  // If high distortion + high engagement -> Echo risk up, Exposure health down
  const echoDelta = (avgDistortion * responseMagnitude) * 0.1;
  const newEcho = clamp(last.echo_risk + echoDelta - 0.02, 0, 1); // Natural decay
  
  const exposureDelta = (avgDistortion * responseMagnitude) * 0.1;
  const newExposure = clamp(last.exposure_health - exposureDelta + 0.01, 0, 1); // Natural recovery

  const newPoint: IntegratedPattern = {
    influence: avgInfluence,
    distortion: avgDistortion,
    echo_risk: newEcho,
    exposure_health: newExposure,
    timestamp: Date.now()
  };
  
  prevPattern.push(newPoint);
  if (prevPattern.length > 20) prevPattern.shift(); // Keep last 20
  storage.savePattern(prevPattern);
}

export function getVulnerabilityProfile() {
  const profile = storage.getProfile<InfluenceVector | null>(null);
  
  if (!profile) {
    // Default profile based on mock posts (Fear, Hype, Urgency)
    return {
      fear: 0.45,
      urgency: 0.3,
      hype: 0.6,
      authority: 0.2,
      curiosity: 0.1,
      visual_hype: 0.4
    };
  }
  
  return profile;
}

export function getDistortionProfile() {
  const profile = storage.getDistortion<DistortionVector | null>(null);
  if (!profile) {
    return {
      emotional_overload: 0.3,
      selective_framing: 0.4,
      narrative_skew: 0.2
    };
  }
  return profile;
}

export function getPatternGraph(): IntegratedPattern[] {
  const pattern = storage.getPattern<IntegratedPattern>();
  
  if (pattern.length === 0) {
    // Generate mock history
    return Array.from({ length: 10 }).map((_, i) => ({
      influence: 0.3 + Math.random() * 0.4,
      distortion: 0.2 + Math.random() * 0.3,
      echo_risk: 0.2 + (i * 0.05),
      exposure_health: 0.8 - (i * 0.04),
      timestamp: Date.now() - (10 - i) * 1000
    }));
  }
  
  return pattern;
}

export function resetData() {
  storage.reset();
}
