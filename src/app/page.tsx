"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, UserProfile, Badge } from "@/types";
import { sendMessage } from "@/lib/api";
import { cleanMarkdown } from "@/lib/utils";
import {
  loadProfile,
  saveProfile,
  loadChatHistory,
  saveChatHistory,
  updateStreak,
  createDefaultProfile,
} from "@/lib/storage";
import { getOrCreateSessionId, resetSession } from "@/lib/session";
import {
  addXP,
  checkBadgeUnlocks,
  unlockBadges,
} from "@/lib/gamification";
import { Header } from "@/components/layout/Header";
import { MainLayout } from "@/components/layout/MainLayout";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { Sidebar } from "@/components/gamification/Sidebar";
import { MobileSheet } from "@/components/gamification/MobileSheet";
import { BadgeUnlockModal } from "@/components/gamification/BadgeUnlockModal";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [previousLevel, setPreviousLevel] = useState<number | undefined>();
  const [isHydrated, setIsHydrated] = useState(false);

  const isMobile = useIsMobile();
  const sessionIdRef = useRef<string>("");

  // Load data on mount
  useEffect(() => {
    const loadedProfile = loadProfile();
    const loadedMessages = loadChatHistory();
    sessionIdRef.current = getOrCreateSessionId();

    setProfile(loadedProfile);
    setMessages(loadedMessages);
    setIsHydrated(true);
  }, []);

  // Save profile whenever it changes
  useEffect(() => {
    if (profile && isHydrated) {
      saveProfile(profile);
    }
  }, [profile, isHydrated]);

  // Save messages whenever they change
  useEffect(() => {
    if (isHydrated) {
      saveChatHistory(messages);
    }
  }, [messages, isHydrated]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!profile || isLoading) return;

      // Create user message
      const userMessage: ChatMessage = {
        id: uuidv4(),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Send to n8n webhook
        const response = await sendMessage(content, sessionIdRef.current);

        // Create coach message with cleaned markdown
        const coachMessage: ChatMessage = {
          id: uuidv4(),
          role: "coach",
          content: cleanMarkdown(response.response),
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, coachMessage]);

        // Update gamification
        setPreviousLevel(profile.level);

        // Update streak
        let updatedProfile = updateStreak(profile);

        // Add XP
        const xpResult = addXP(updatedProfile);
        updatedProfile = xpResult.profile;

        // Check for badge unlocks
        const earnedBadges = checkBadgeUnlocks(updatedProfile);
        if (earnedBadges.length > 0) {
          updatedProfile = unlockBadges(updatedProfile, earnedBadges);
          // Show first badge (queue others for later if needed)
          setNewBadge(earnedBadges[0]);
        }

        setProfile(updatedProfile);
      } catch (error) {
        console.error("Failed to send message:", error);

        // Add error message
        const errorMessage: ChatMessage = {
          id: uuidv4(),
          role: "coach",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [profile, isLoading]
  );

  const handleResetChat = useCallback(() => {
    setMessages([]);
    resetSession();
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  const handleCloseBadgeModal = useCallback(() => {
    setNewBadge(null);
  }, []);

  // Show loading state while hydrating
  if (!isHydrated || !profile) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-[var(--gray-500)]">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <MainLayout
        sidebar={
          <Sidebar profile={profile} previousLevel={previousLevel} />
        }
      >
        <Header onResetChat={messages.length > 0 ? handleResetChat : undefined} />
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          level={profile.level}
          onSendMessage={handleSendMessage}
        />
      </MainLayout>

      {/* Mobile gamification sheet */}
      {isMobile && (
        <MobileSheet profile={profile} previousLevel={previousLevel} />
      )}

      {/* Badge unlock celebration */}
      <BadgeUnlockModal badge={newBadge} onClose={handleCloseBadgeModal} />
    </>
  );
}
