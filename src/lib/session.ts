import { v4 as uuidv4 } from "uuid";

const SESSION_KEY = "kinetic_session_id";
const USER_ID_KEY = "kinetic_user_id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function getOrCreateUserId(): string {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function resetSession(): void {
  if (typeof window === "undefined") return;

  const newSessionId = uuidv4();
  localStorage.setItem(SESSION_KEY, newSessionId);
}
