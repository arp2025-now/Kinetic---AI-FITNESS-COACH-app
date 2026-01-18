"use client";

import { cn } from "@/lib/utils";
import { Badge as BadgeType } from "@/types";
import { getRarityColor } from "@/data/badges";
import * as Tooltip from "@radix-ui/react-tooltip";

interface BadgeProps {
  badge: BadgeType;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export function Badge({ badge, isUnlocked, unlockedAt }: BadgeProps) {
  const rarityColor = getRarityColor(badge.rarity);

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-200 cursor-default",
              isUnlocked
                ? "bg-[var(--background-tertiary)] border-2 hover:scale-105"
                : "badge-locked bg-[var(--gray-900)] border-2 border-[var(--gray-800)]"
            )}
            style={{
              borderColor: isUnlocked ? rarityColor : undefined,
              boxShadow: isUnlocked ? `0 0 12px ${rarityColor}30` : undefined,
            }}
          >
            {badge.icon}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-[var(--gray-900)] text-[var(--foreground)] px-3 py-2 rounded-lg text-sm max-w-[200px] z-50 border border-[var(--gray-800)]"
            sideOffset={5}
          >
            <div className="font-medium">{badge.name}</div>
            <div className="text-[var(--gray-400)] text-xs mt-0.5">
              {badge.description}
            </div>
            {isUnlocked && unlockedAt && (
              <div className="text-[var(--gray-500)] text-xs mt-1">
                Unlocked {new Date(unlockedAt).toLocaleDateString()}
              </div>
            )}
            {!isUnlocked && badge.category === "hidden" && (
              <div className="text-[var(--gray-500)] text-xs mt-1 italic">
                Hidden badge
              </div>
            )}
            <Tooltip.Arrow className="fill-[var(--gray-900)]" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
