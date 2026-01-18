import { UserProfile, ChatMessage } from "@/types";
import { getOrCreateSessionId, getOrCreateUserId } from "./session";

const PROFILE_KEY = "kinetic_profile";
const CHAT_KEY = "kinetic_chat_history";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function createDefaultProfile(): UserProfile {
  return {
    id: getOrCreateUserId(),
    sessionId: getOrCreateSessionId(),
    createdAt: new Date().toISOString(),
    level: 1,
    xp: 0,
    totalMessages: 0,
    unlockedBadges: [],
    badgeUnlockedAt: {},
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: "",
  };
}

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return createDefaultProfile();

  const stored = localStorage.getItem(PROFILE_KEY);
  if (!stored) {
    const profile = createDefaultProfile();
    saveProfile(profile);
    return profile;
  }

  try {
    return JSON.parse(stored) as UserProfile;
  } catch {
    const profile = createDefaultProfile();
    saveProfile(profile);
    return profile;
  }
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadChatHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(CHAT_KEY);
  if (!stored) return [];

  try {
    const messages = JSON.parse(stored) as ChatMessage[];
    // Keep last 50 messages for display
    return messages.slice(-50);
  } catch {
    return [];
  }
}

export function saveChatHistory(messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  // Keep last 50 messages
  const toSave = messages.slice(-50);
  localStorage.setItem(CHAT_KEY, JSON.stringify(toSave));
}

export function updateStreak(profile: UserProfile): UserProfile {
  const today = getToday();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (profile.lastActiveDate === today) {
    // Already active today, no change
    return profile;
  }

  if (profile.lastActiveDate === yesterdayStr) {
    // Continuing streak
    const newStreak = profile.currentStreak + 1;
    return {
      ...profile,
      currentStreak: newStreak,
      longestStreak: Math.max(profile.longestStreak, newStreak),
      lastActiveDate: today,
    };
  }

  // Streak broken or first activity
  return {
    ...profile,
    currentStreak: 1,
    longestStreak: Math.max(profile.longestStreak, 1),
    lastActiveDate: today,
  };
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(CHAT_KEY);
  localStorage.removeItem("kinetic_session_id");
  localStorage.removeItem("kinetic_user_id");
}
