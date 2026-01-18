"use client";

interface HeaderProps {
  onResetChat?: () => void;
}

export function Header({ onResetChat }: HeaderProps) {
  return (
    <header className="h-16 border-b border-[var(--gray-800)] bg-[var(--background-secondary)] flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--accent-400)] to-[var(--accent-600)] flex items-center justify-center glow-accent">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--gray-900)"
            strokeWidth="2.5"
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
        <span className="text-lg font-semibold text-[var(--foreground)] font-[family-name:var(--font-space-grotesk)]">
          Kinetic
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onResetChat && (
          <button
            onClick={onResetChat}
            className="h-9 px-4 rounded-lg text-sm text-[var(--gray-400)] hover:text-[var(--foreground)] hover:bg-[var(--gray-800)] transition-colors border border-[var(--gray-800)] hover:border-[var(--gray-700)]"
          >
            New Chat
          </button>
        )}
      </div>
    </header>
  );
}
