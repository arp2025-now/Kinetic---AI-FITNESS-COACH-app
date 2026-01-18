"use client";

import { Badge } from "./Badge";
import { getDisplayBadges, getBadgeById } from "@/data/badges";
import { UserProfile } from "@/types";

interface BadgeGridProps {
  profile: UserProfile;
}

export function BadgeGrid({ profile }: BadgeGridProps) {
  const displayBadges = getDisplayBadges();

  // Also show unlocked hidden badges
  const unlockedHiddenBadges = profile.unlockedBadges
    .map((id) => getBadgeById(id))
    .filter((b) => b && b.category === "hidden");

  const allBadges = [...displayBadges, ...unlockedHiddenBadges].filter(
    (b): b is NonNullable<typeof b> => b !== undefined
  );

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-[var(--gray-300)]">Achievements</h3>
      <div className="grid grid-cols-4 gap-2">
        {allBadges.map((badge) => (
          <Badge
            key={badge.id}
            badge={badge}
            isUnlocked={profile.unlockedBadges.includes(badge.id)}
            unlockedAt={profile.badgeUnlockedAt[badge.id]}
          />
        ))}
      </div>
      <p className="text-xs text-[var(--gray-400)]">
        {profile.unlockedBadges.length} / {allBadges.length} unlocked
      </p>
    </div>
  );
}
