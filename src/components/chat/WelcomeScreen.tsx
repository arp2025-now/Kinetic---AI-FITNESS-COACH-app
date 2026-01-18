"use client";

import { getTitleForLevel } from "@/lib/gamification";

interface WelcomeScreenProps {
  level: number;
  onSuggestedPrompt: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
  "Help me create a workout plan",
  "What should I eat before a workout?",
  "How do I stay motivated to exercise?",
  "Tips for building muscle",
];

export function WelcomeScreen({ level, onSuggestedPrompt }: WelcomeScreenProps) {
  const title = getTitleForLevel(level);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-md">
        {/* Logo/Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-400)] to-[var(--accent-600)] flex items-center justify-center mx-auto mb-6 glow-accent">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gray-900)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </div>

        {/* Welcome text */}
        <h1 className="text-2xl font-semibold text-[var(--foreground)] mb-2 font-[family-name:var(--font-space-grotesk)]">
          Welcome to Kinetic
        </h1>
        <p className="text-[var(--gray-400)] mb-2">
          Your personal AI fitness coach
        </p>
        <p className="text-sm mb-8" style={{ color: title.color }}>
          Coach status: {title.name}
        </p>

        {/* Suggested prompts */}
        <div className="space-y-3">
          <p className="text-sm text-[var(--gray-500)] mb-4">
            Try asking about:
          </p>
          <div className="grid grid-cols-1 gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onSuggestedPrompt(prompt)}
                className="text-left px-4 py-3 rounded-xl border border-[var(--gray-800)] text-[var(--gray-300)] hover:bg-[var(--background-tertiary)] hover:border-[var(--gray-700)] hover:text-[var(--foreground)] transition-all duration-150 text-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
