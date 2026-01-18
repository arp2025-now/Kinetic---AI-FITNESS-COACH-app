"use client";

import { ChatMessage } from "@/types";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { WelcomeScreen } from "./WelcomeScreen";

interface ChatContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
  level: number;
  onSendMessage: (message: string) => void;
}

export function ChatContainer({
  messages,
  isLoading,
  level,
  onSendMessage,
}: ChatContainerProps) {
  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {hasMessages ? (
        <MessageList messages={messages} isLoading={isLoading} />
      ) : (
        <WelcomeScreen level={level} onSuggestedPrompt={onSendMessage} />
      )}
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
}
