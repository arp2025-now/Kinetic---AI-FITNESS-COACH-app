"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getTitleForLevel } from "@/lib/gamification";

interface LevelDisplayProps {
  level: number;
  previousLevel?: number;
}

export function LevelDisplay({ level, previousLevel }: LevelDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const title = getTitleForLevel(level);

  useEffect(() => {
    if (previousLevel !== undefined && level > previousLevel) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [level, previousLevel]);

  return (
    <div className="text-center">
      <div
        className={cn(
          "text-6xl font-bold font-[family-name:var(--font-space-grotesk)] text-[var(--foreground)]",
          isAnimating && "animate-level-up"
        )}
      >
        {level}
      </div>
      <div className="text-xs uppercase tracking-wider text-[var(--gray-400)] mt-1">
        Level
      </div>
      <div
        className="text-sm font-medium mt-2"
        style={{ color: title.color }}
      >
        {title.name}
      </div>
    </div>
  );
}
