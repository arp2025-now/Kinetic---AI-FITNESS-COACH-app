"use client";

import { Drawer } from "vaul";
import { UserProfile } from "@/types";
import { LevelDisplay } from "./LevelDisplay";
import { XPProgressBar } from "./XPProgressBar";
import { BadgeGrid } from "./BadgeGrid";
import { StatsCard } from "./StatsCard";
import { getTitleForLevel } from "@/lib/gamification";

interface MobileSheetProps {
  profile: UserProfile;
  previousLevel?: number;
}

export function MobileSheet({ profile, previousLevel }: MobileSheetProps) {
  const title = getTitleForLevel(profile.level);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="fixed bottom-20 right-4 z-40 flex items-center gap-2 bg-[var(--background-secondary)] rounded-full px-4 py-2 shadow-lg border border-[var(--gray-800)] hover:border-[var(--gray-700)] transition-all glow-accent">
          <span
            className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]"
            style={{ color: title.color }}
          >
            {profile.level}
          </span>
          <div className="w-16 h-2 rounded-full bg-[var(--gray-800)] overflow-hidden">
            <div
              className="h-full xp-gradient rounded-full transition-all duration-500"
              style={{ width: `${(profile.xp / 10) * 100}%` }}
            />
          </div>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-[var(--background-secondary)] border-t border-[var(--gray-800)] rounded-t-3xl z-50 max-h-[85vh] flex flex-col">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[var(--gray-700)] my-4" />

          <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-8 space-y-8">
            {/* Level display */}
            <div className="flex justify-center pt-2">
              <LevelDisplay level={profile.level} previousLevel={previousLevel} />
            </div>

            {/* XP Progress */}
            <XPProgressBar xp={profile.xp} />

            {/* Stats */}
            <StatsCard profile={profile} />

            {/* Badges */}
            <BadgeGrid profile={profile} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
