"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/Reveal";
import type { NavItem } from "@/lib/content";

/** Ignore scroll-spy while smooth-scrolling after a nav click (ms), if scrollend is missing */
const SPY_PAUSE_MS = 900;

type SidebarProps = {
  name: string;
  headline: string;
  navigation: NavItem[];
};

function useActiveNavSection(sectionIds: readonly string[]) {
  const idsKey = sectionIds.join(",");
  const [activeId, setActiveId] = useState("");
  /** While Date.now() < this, scroll listener must not override the clicked item */
  const pauseSpyUntilRef = useRef(0);
  const measureRef = useRef<() => void>(() => {});
  const resumeSpyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const measureFromScroll = useCallback(() => {
    if (typeof window === "undefined") return;
    if (Date.now() < pauseSpyUntilRef.current) return;

    const ids = [...sectionIds];
    if (ids.length === 0) return;

    const marker = window.scrollY + window.innerHeight * 0.35;
    let current: string | null = null;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= marker) current = id;
    }
    setActiveId(current ?? "");
  }, [sectionIds]);

  useEffect(() => {
    measureRef.current = measureFromScroll;
  }, [measureFromScroll]);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const initial = requestAnimationFrame(() => measureFromScroll());

    const onScroll = () => measureFromScroll();
    const onResize = () => measureFromScroll();

    const onScrollEnd = () => {
      pauseSpyUntilRef.current = 0;
      if (resumeSpyTimerRef.current) {
        clearTimeout(resumeSpyTimerRef.current);
        resumeSpyTimerRef.current = null;
      }
      measureFromScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [idsKey, sectionIds, measureFromScroll]);

  useEffect(
    () => () => {
      if (resumeSpyTimerRef.current) {
        clearTimeout(resumeSpyTimerRef.current);
        resumeSpyTimerRef.current = null;
      }
    },
    [],
  );

  const onNavLinkClick = useCallback((id: string) => {
    if (resumeSpyTimerRef.current) {
      clearTimeout(resumeSpyTimerRef.current);
      resumeSpyTimerRef.current = null;
    }
    pauseSpyUntilRef.current = Date.now() + SPY_PAUSE_MS;
    setActiveId(id);
    resumeSpyTimerRef.current = setTimeout(() => {
      resumeSpyTimerRef.current = null;
      pauseSpyUntilRef.current = 0;
      measureRef.current();
    }, SPY_PAUSE_MS);
  }, []);

  return { activeId, onNavLinkClick };
}

export function Sidebar({
  name,
  headline,
  navigation,
}: SidebarProps) {
  const sectionIds = useMemo(
    () => navigation.map((item) => item.id),
    [navigation],
  );
  const { activeId, onNavLinkClick } = useActiveNavSection(sectionIds);

  return (
    <header className="flex flex-col gap-8">
      <StaggerContainer className="flex flex-col gap-4">
        <StaggerItem>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {name}
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-xs text-base leading-relaxed text-muted">
            {headline}
          </p>
        </StaggerItem>
        <StaggerItem>
          <nav aria-label="On this page">
            <ul className="flex flex-col gap-1 font-mono text-sm">
              {navigation.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      onClick={() => onNavLinkClick(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={
                        "relative inline-block py-1 pl-3 transition-colors duration-200 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:rounded-full before:transition-colors " +
                        (isActive
                          ? "font-medium text-accent before:bg-accent"
                          : "text-muted before:bg-transparent hover:text-accent focus-visible:text-accent")
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </StaggerItem>
      </StaggerContainer>
    </header>
  );
}
