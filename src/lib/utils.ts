import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clean markdown formatting from AI responses for a more human-like appearance
 */
export function cleanMarkdown(text: string): string {
  return text
    // Remove headers (### Header -> Header)
    .replace(/^#{1,6}\s+/gm, "")
    // Remove bold (**text** -> text)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    // Remove italic (*text* -> text)
    .replace(/\*([^*]+)\*/g, "$1")
    // Remove bullet points at start of lines
    .replace(/^[\s]*[-*]\s+/gm, "• ")
    // Remove numbered list markers but keep content
    .replace(/^\d+\.\s+/gm, "")
    // Remove code blocks
    .replace(/```[^`]*```/g, "")
    // Remove inline code
    .replace(/`([^`]+)`/g, "$1")
    // Clean up multiple newlines
    .replace(/\n{3,}/g, "\n\n")
    // Trim whitespace
    .trim();
}
