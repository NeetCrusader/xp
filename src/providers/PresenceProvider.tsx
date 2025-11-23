"use client";

import { createContext, type ReactNode, useContext } from "react";
import { usePresence } from "@/hooks";
import type { Presence } from "@/types/presence";

interface PresenceContextType {
  presence: Presence | null;
  isConnected: boolean;
}

const PresenceContext = createContext<PresenceContextType | undefined>(
  undefined,
);

export function PresenceProvider({ children }: { children: ReactNode }) {
  const { presence, isConnected } = usePresence();

  return (
    <PresenceContext.Provider value={{ presence, isConnected }}>
      {children}
    </PresenceContext.Provider>
  );
}

export function usePresenceContext() {
  const context = useContext(PresenceContext);
  if (context === undefined) {
    throw new Error(
      "usePresenceContext must be used within a PresenceProvider",
    );
  }
  return context;
}
