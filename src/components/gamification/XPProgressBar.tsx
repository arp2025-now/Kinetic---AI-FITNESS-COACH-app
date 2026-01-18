"use client";

import { Progress } from "@/components/ui/Progress";
import { XP_PER_LEVEL } from "@/lib/gamification";

interface XPProgressBarProps {
  xp: number;
}

export function XPProgressBar({ xp }: XPProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-[var(--gray-500)] mb-2">
        <span>Progress to next level</span>
        <span>{xp}/{XP_PER_LEVEL}</span>
      </div>
      <Progress value={xp} max={XP_PER_LEVEL} variant="gradient" />
    </div>
  );
}
