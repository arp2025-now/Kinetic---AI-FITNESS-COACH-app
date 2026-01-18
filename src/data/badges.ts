import { Badge } from "@/types";

export const BADGES: Badge[] = [
  // Core badges (permanent)
  {
    id: "first-steps",
    name: "First Steps",
    description: "Start your fitness journey",
    icon: "🏃",
    category: "core",
    rarity: "common",
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Reach Level 5",
    icon: "💪",
    category: "core",
    rarity: "rare",
  },
  {
    id: "committed",
    name: "Committed",
    description: "Reach Level 10",
    icon: "🎯",
    category: "core",
    rarity: "epic",
  },
  {
    id: "elite",
    name: "Elite",
    description: "Reach Level 25",
    icon: "⭐",
    category: "core",
    rarity: "legendary",
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "7-day conversation streak",
    icon: "🔥",
    category: "core",
    rarity: "rare",
  },
  {
    id: "streak-30",
    name: "Monthly Master",
    description: "30-day conversation streak",
    icon: "👑",
    category: "core",
    rarity: "legendary",
  },

  // Hidden badges
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Chat after 11 PM",
    icon: "🦉",
    category: "hidden",
    rarity: "rare",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Chat before 6 AM",
    icon: "🐦",
    category: "hidden",
    rarity: "rare",
  },
  {
    id: "curious",
    name: "Curious Mind",
    description: "Explore many fitness topics",
    icon: "🧠",
    category: "hidden",
    rarity: "epic",
  },

  // Seasonal badges (example - Q1 New Year)
  {
    id: "resolution-keeper",
    name: "Resolution Keeper",
    description: "Stay active in January",
    icon: "🎊",
    category: "seasonal",
    rarity: "rare",
  },
];

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export function getCoreBadges(): Badge[] {
  return BADGES.filter((b) => b.category === "core");
}

export function getHiddenBadges(): Badge[] {
  return BADGES.filter((b) => b.category === "hidden");
}

export function getSeasonalBadges(): Badge[] {
  return BADGES.filter((b) => b.category === "seasonal");
}

export function getDisplayBadges(): Badge[] {
  // Return core badges for display (hidden ones shown only when unlocked)
  return BADGES.filter((b) => b.category === "core" || b.category === "seasonal");
}

export function getRarityColor(rarity: Badge["rarity"]): string {
  switch (rarity) {
    case "common":
      return "var(--gray-400)";
    case "rare":
      return "var(--blue-500)";
    case "epic":
      return "var(--title-personal-coach)";
    case "legendary":
      return "var(--title-fitness-sage)";
  }
}
