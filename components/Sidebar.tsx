"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SocialDock } from "@/components/SocialDock";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/Reveal";
import type { NavItem, SocialLink } from "@/lib/content";

/** Ignore scroll-spy while smooth-scrolling after a nav click (ms), if scrollend is missing */
const SPY_PAUSE_MS = 900;

type SidebarProps = {
  name: string;
  headline: string;
  navigation: NavItem[];
  socialLinks: SocialLink[];
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
  socialLinks,
}: SidebarProps) {
  const sectionIds = useMemo(
    () => navigation.map((item) => item.id),
    [navigation],
  );
  const { activeId, onNavLinkClick } = useActiveNavSection(sectionIds);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed right-5 top-5 z-50 lg:hidden">
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
          className={
            "pointer-events-none fixed inset-0 bg-background/25 backdrop-blur-sm transition-opacity duration-250 ease-out " +
            (isMenuOpen ? "pointer-events-auto opacity-100" : "opacity-0")
          }
        />
        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex items-center rounded-full border border-border/70 bg-background/95 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur transition-colors duration-200 hover:border-accent/70 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          <span className="relative h-3.5 w-5" aria-hidden>
            <span
              className={
                "absolute left-0 top-0 h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out " +
                (isMenuOpen ? "translate-y-[0.42rem] rotate-45" : "")
              }
            />
            <span
              className={
                "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-all duration-250 ease-out " +
                (isMenuOpen ? "scale-x-0 opacity-0" : "opacity-100")
              }
            />
            <span
              className={
                "absolute bottom-0 left-0 h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out " +
                (isMenuOpen ? "-translate-y-[0.42rem] -rotate-45" : "")
              }
            />
          </span>
        </button>
        <div
          className={
            "pointer-events-none fixed inset-y-0 right-0 top-0 h-[100dvh] w-[70vw] origin-top-right overflow-y-auto border-l border-border/70 bg-card/95 p-5 pt-20 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur transition-all duration-250 ease-out " +
            (isMenuOpen
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "-translate-y-2 scale-95 opacity-0")
          }
        >
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
            className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-muted transition-colors duration-200 hover:border-accent/70 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          >
            <span className="relative h-3.5 w-3.5" aria-hidden>
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rotate-45 rounded-full bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 -rotate-45 rounded-full bg-current" />
            </span>
          </button>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{headline}</p>
          <nav id="mobile-nav" aria-label="On this page" className="mt-4">
            <ul className="flex flex-col gap-1 font-mono text-sm">
              {navigation.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      onClick={() => {
                        onNavLinkClick(item.id);
                        setIsMenuOpen(false);
                      }}
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
          <div className="mt-4 border-t border-border/60 pt-3">
            <SocialDock links={socialLinks} mode="inline" />
          </div>
        </div>
      </div>

      <header className="hidden flex-col gap-8 lg:flex">
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
          <StaggerItem>
            <SocialDock links={socialLinks} mode="inline" />
          </StaggerItem>
        </StaggerContainer>
      </header>
    </>
  );
}
