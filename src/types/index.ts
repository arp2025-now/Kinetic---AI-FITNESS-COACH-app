export interface ChatMessage {
  id: string;
  role: "user" | "coach";
  content: string;
  timestamp: string;
}

export interface UserProfile {
  id: string;
  sessionId: string;
  createdAt: string;

  // Gamification
  level: number;
  xp: number;
  totalMessages: number;

  // Badges
  unlockedBadges: string[];
  badgeUnlockedAt: Record<string, string>;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "core" | "seasonal" | "hidden";
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface CoachTitle {
  id: string;
  name: string;
  minLevel: number;
  maxLevel: number;
  color: string;
}

export interface GameState {
  profile: UserProfile;
  chatHistory: ChatMessage[];
  isLoading: boolean;
  newBadge: Badge | null;
}
