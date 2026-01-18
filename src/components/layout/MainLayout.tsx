"use client";

import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export function MainLayout({ children, sidebar }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-[var(--gray-50)]">
      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>

      {/* Sidebar - hidden on mobile */}
      {sidebar && (
        <div className="hidden lg:block">
          {sidebar}
        </div>
      )}
    </div>
  );
}
