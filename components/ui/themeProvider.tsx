"use client";

import { ThemeProvider } from "next-themes";

export function ProvidersTheme({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" storageKey="theme" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}