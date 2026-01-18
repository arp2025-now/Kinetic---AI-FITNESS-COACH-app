"use client";

import { UserProfile } from "@/types";
import { LevelDisplay } from "./LevelDisplay";
import { XPProgressBar } from "./XPProgressBar";
import { BadgeGrid } from "./BadgeGrid";
import { StatsCard } from "./StatsCard";

interface SidebarProps {
  profile: UserProfile;
  previousLevel?: number;
}

export function Sidebar({ profile, previousLevel }: SidebarProps) {
  return (
    <aside className="w-80 h-full bg-[var(--background-secondary)] border-l border-[var(--gray-800)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--gray-800)]">
        <h2 className="text-lg font-semibold text-[var(--foreground)] font-[family-name:var(--font-space-grotesk)]">
          Your Progress
        </h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        {/* Level display */}
        <div className="flex justify-center">
          <LevelDisplay level={profile.level} previousLevel={previousLevel} />
        </div>

        {/* XP Progress */}
        <XPProgressBar xp={profile.xp} />

        {/* Stats */}
        <StatsCard profile={profile} />

        {/* Badges */}
        <BadgeGrid profile={profile} />
      </div>
    </aside>
  );
}
