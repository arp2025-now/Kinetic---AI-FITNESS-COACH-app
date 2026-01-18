"use client";

import { UserProfile } from "@/types";

interface StatsCardProps {
  profile: UserProfile;
}

export function StatsCard({ profile }: StatsCardProps) {
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[var(--background-tertiary)] rounded-xl p-3 border border-[var(--gray-800)]">
        <div className="text-2xl font-bold text-[var(--foreground)] font-[family-name:var(--font-space-grotesk)]">
          {profile.totalMessages}
        </div>
        <div className="text-xs text-[var(--gray-500)]">Total messages</div>
      </div>
      <div className="bg-[var(--background-tertiary)] rounded-xl p-3 border border-[var(--gray-800)]">
        <div className="text-2xl font-bold text-[var(--accent-400)] font-[family-name:var(--font-space-grotesk)]">
          {profile.currentStreak}
        </div>
        <div className="text-xs text-[var(--gray-500)]">Day streak</div>
      </div>
      <div className="bg-[var(--background-tertiary)] rounded-xl p-3 border border-[var(--gray-800)]">
        <div className="text-2xl font-bold text-[var(--foreground)] font-[family-name:var(--font-space-grotesk)]">
          {profile.longestStreak}
        </div>
        <div className="text-xs text-[var(--gray-500)]">Best streak</div>
      </div>
      <div className="bg-[var(--background-tertiary)] rounded-xl p-3 border border-[var(--gray-800)]">
        <div className="text-sm font-bold text-[var(--foreground)] font-[family-name:var(--font-space-grotesk)]">
          {joinDate}
        </div>
        <div className="text-xs text-[var(--gray-500)]">Member since</div>
      </div>
    </div>
  );
}
