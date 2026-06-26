"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { LoadingScreen } from "@/components/LoadingScreen";

const InitialLoadContext = createContext(true);

export function useInitialLoadReady() {
  return useContext(InitialLoadContext);
}

export function InitialLoadGate({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowLoader(false);
      setReady(true);
    }
  }, []);

  const handleComplete = useCallback(() => {
    setShowLoader(false);
    setReady(true);
  }, []);

  return (
    <InitialLoadContext.Provider value={ready}>
      {showLoader ? <LoadingScreen onComplete={handleComplete} /> : null}
      <div className={ready ? undefined : "invisible"} aria-hidden={!ready}>
        {children}
      </div>
    </InitialLoadContext.Provider>
  );
}
