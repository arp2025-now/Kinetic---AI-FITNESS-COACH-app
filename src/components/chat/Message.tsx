"use client";

import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types";

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Coach avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-400)] to-[var(--accent-600)] flex items-center justify-center mr-3 mt-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-900)" strokeWidth="2.5">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          </svg>
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] px-5 py-4 text-[15px] leading-[1.7]",
          isUser
            ? "bg-gradient-to-r from-[var(--accent-500)] to-[var(--accent-600)] text-[var(--gray-900)] rounded-2xl rounded-br-md font-medium shadow-lg shadow-[var(--accent-500)]/20"
            : "bg-[var(--gray-900)] text-[var(--gray-100)] rounded-2xl rounded-bl-md border border-[var(--gray-800)] shadow-xl"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--gray-800)] flex items-center justify-center ml-3 mt-1 border border-[var(--gray-700)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}
