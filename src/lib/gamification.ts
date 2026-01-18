import { UserProfile, Badge } from "@/types";
import { BADGES, getBadgeById } from "@/data/badges";
import { getTitleForLevel } from "@/data/titles";

export const XP_PER_LEVEL = 10;

export function calculateLevel(totalMessages: number): {
  level: number;
  xp: number;
  xpToNext: number;
} {
  const level = Math.floor(totalMessages / XP_PER_LEVEL) + 1;
  const xp = totalMessages % XP_PER_LEVEL;
  return { level, xp, xpToNext: XP_PER_LEVEL };
}

export function addXP(profile: UserProfile): {
  profile: UserProfile;
  leveledUp: boolean;
  previousLevel: number;
} {
  const previousLevel = profile.level;
  const newTotalMessages = profile.totalMessages + 1;
  const { level, xp } = calculateLevel(newTotalMessages);

  return {
    profile: {
      ...profile,
      totalMessages: newTotalMessages,
      level,
      xp,
    },
    leveledUp: level > previousLevel,
    previousLevel,
  };
}

export function checkBadgeUnlocks(
  profile: UserProfile,
  timestamp: Date = new Date()
): Badge[] {
  const newBadges: Badge[] = [];
  const hour = timestamp.getHours();

  // First Steps - first message
  if (
    profile.totalMessages >= 1 &&
    !profile.unlockedBadges.includes("first-steps")
  ) {
    const badge = getBadgeById("first-steps");
    if (badge) newBadges.push(badge);
  }

  // Dedicated - Level 5
  if (profile.level >= 5 && !profile.unlockedBadges.includes("dedicated")) {
    const badge = getBadgeById("dedicated");
    if (badge) newBadges.push(badge);
  }

  // Committed - Level 10
  if (profile.level >= 10 && !profile.unlockedBadges.includes("committed")) {
    const badge = getBadgeById("committed");
    if (badge) newBadges.push(badge);
  }

  // Elite - Level 25
  if (profile.level >= 25 && !profile.unlockedBadges.includes("elite")) {
    const badge = getBadgeById("elite");
    if (badge) newBadges.push(badge);
  }

  // Week Warrior - 7-day streak
  if (
    profile.currentStreak >= 7 &&
    !profile.unlockedBadges.includes("streak-7")
  ) {
    const badge = getBadgeById("streak-7");
    if (badge) newBadges.push(badge);
  }

  // Monthly Master - 30-day streak
  if (
    profile.currentStreak >= 30 &&
    !profile.unlockedBadges.includes("streak-30")
  ) {
    const badge = getBadgeById("streak-30");
    if (badge) newBadges.push(badge);
  }

  // Night Owl - message after 11 PM
  if (hour >= 23 && !profile.unlockedBadges.includes("night-owl")) {
    const badge = getBadgeById("night-owl");
    if (badge) newBadges.push(badge);
  }

  // Early Bird - message before 6 AM
  if (hour < 6 && !profile.unlockedBadges.includes("early-bird")) {
    const badge = getBadgeById("early-bird");
    if (badge) newBadges.push(badge);
  }

  return newBadges;
}

export function unlockBadges(
  profile: UserProfile,
  badges: Badge[]
): UserProfile {
  const now = new Date().toISOString();
  const newUnlockedBadges = [...profile.unlockedBadges];
  const newBadgeUnlockedAt = { ...profile.badgeUnlockedAt };

  for (const badge of badges) {
    if (!newUnlockedBadges.includes(badge.id)) {
      newUnlockedBadges.push(badge.id);
      newBadgeUnlockedAt[badge.id] = now;
    }
  }

  return {
    ...profile,
    unlockedBadges: newUnlockedBadges,
    badgeUnlockedAt: newBadgeUnlockedAt,
  };
}

export function getDisplayBadges(): Badge[] {
  // Return core badges for display (hidden ones shown only when unlocked)
  return BADGES.filter((b) => b.category === "core" || b.category === "seasonal");
}

export { getTitleForLevel };
