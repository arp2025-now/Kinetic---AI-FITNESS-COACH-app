"use client";

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-slide-up">
      {/* Coach avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-400)] to-[var(--accent-600)] flex items-center justify-center mt-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-900)" strokeWidth="2.5">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        </svg>
      </div>

      <div className="bg-[var(--gray-900)] border border-[var(--gray-800)] rounded-2xl rounded-bl-md px-5 py-4 shadow-xl">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 rounded-full bg-[var(--accent-400)]" />
          <span className="typing-dot w-2 h-2 rounded-full bg-[var(--accent-400)]" />
          <span className="typing-dot w-2 h-2 rounded-full bg-[var(--accent-400)]" />
        </div>
      </div>
    </div>
  );
}
