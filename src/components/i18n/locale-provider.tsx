"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/dictionary";

type DictionaryContextValue = {
  dict: Dictionary;
};

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

export function LocaleProvider({
  dict,
  children,
}: DictionaryContextValue & { children: React.ReactNode }) {
  return (
    <DictionaryContext.Provider value={{ dict }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return context;
}
