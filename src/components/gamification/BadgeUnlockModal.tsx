"use client";

import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import confetti from "canvas-confetti";
import { Badge as BadgeType } from "@/types";
import { getRarityColor } from "@/data/badges";

interface BadgeUnlockModalProps {
  badge: BadgeType | null;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  const hasPlayedConfetti = useRef(false);

  useEffect(() => {
    if (badge && !hasPlayedConfetti.current) {
      hasPlayedConfetti.current = true;

      // Fire confetti with gold/amber theme
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#fbbf24", "#f59e0b", "#d97706"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#fbbf24", "#f59e0b", "#d97706"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }

    return () => {
      hasPlayedConfetti.current = false;
    };
  }, [badge]);

  if (!badge) return null;

  const rarityColor = getRarityColor(badge.rarity);

  return (
    <Dialog.Root open={!!badge} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--background-secondary)] border border-[var(--gray-800)] rounded-2xl p-8 max-w-sm w-full shadow-2xl z-50 animate-slide-up">
          <div className="text-center">
            <div className="text-sm uppercase tracking-wider text-[var(--accent-400)] mb-4 font-medium">
              Achievement Unlocked!
            </div>

            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-4 border-4 bg-[var(--background-tertiary)]"
              style={{
                borderColor: rarityColor,
                boxShadow: `0 0 30px ${rarityColor}40`
              }}
            >
              {badge.icon}
            </div>

            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2 font-[family-name:var(--font-space-grotesk)]">
              {badge.name}
            </h2>
            <p className="text-[var(--gray-400)] mb-6">{badge.description}</p>

            <div
              className="text-xs uppercase tracking-wider font-medium mb-6"
              style={{ color: rarityColor }}
            >
              {badge.rarity} Badge
            </div>

            <button
              onClick={onClose}
              className="w-full h-12 rounded-xl bg-[var(--accent-500)] text-[var(--gray-900)] font-medium hover:bg-[var(--accent-400)] transition-colors"
            >
              Awesome!
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
