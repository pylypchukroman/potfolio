"use client";

import { useEffect, useState } from "react";
import { SocialDock } from "@/components/SocialDock";
import { NavOnPageLinks } from "@/components/NavOnPageLinks";
import type { NavItem, SocialLink } from "@/lib/content";
import { scrollToSectionById } from "@/lib/scrollToSection";

export type MobileNavMenuProps = {
  name: string;
  headline: string;
  navigation: NavItem[];
  socialLinks: SocialLink[];
  activeId: string;
  onNavLinkClick: (id: string) => void;
};

const LG_MIN_WIDTH = 1024;
/** Slightly under the drawer `duration-300` close so scroll runs after the panel stops intercepting taps. */
const SCROLL_AFTER_CLOSE_MS = 280;

export function MobileNavMenu({
  name,
  headline,
  navigation,
  socialLinks,
  activeId,
  onNavLinkClick,
}: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${LG_MIN_WIDTH}px)`);
    const close = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function goToSection(id: string) {
    onNavLinkClick(id);
    setOpen(false);
    window.setTimeout(() => scrollToSectionById(id), SCROLL_AFTER_CLOSE_MS);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setOpen(false)}
        className={
          open
            ? "fixed inset-0 z-40 bg-background/25 backdrop-blur-sm transition-opacity duration-300 ease-out pointer-events-auto opacity-100"
            : "pointer-events-none fixed inset-0 z-40 bg-background/25 backdrop-blur-sm transition-opacity duration-300 ease-out opacity-0"
        }
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((v) => !v)}
        className="fixed right-5 top-5 z-[60] inline-flex items-center rounded-full border border-border/70 bg-background/95 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur transition-colors duration-200 hover:border-accent/70 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <span className="relative h-3.5 w-5" aria-hidden>
          <span
            className={
              "absolute left-0 top-0 h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out " +
              (open ? "translate-y-[0.42rem] rotate-45" : "")
            }
          />
          <span
            className={
              "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out " +
              (open ? "scale-x-0 opacity-0" : "opacity-100")
            }
          />
          <span
            className={
              "absolute bottom-0 left-0 h-0.5 w-full origin-center rounded-full bg-current transition-transform duration-300 ease-out " +
              (open ? "-translate-y-[0.42rem] -rotate-45" : "")
            }
          />
        </span>
      </button>
      <div
        className={
          open
            ? "fixed inset-y-0 right-0 z-50 h-[100dvh] w-[70vw] max-w-sm origin-top-right overflow-y-auto border-l border-border/70 bg-card/95 p-5 pt-20 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur transition-all duration-300 ease-out pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none fixed inset-y-0 right-0 z-50 h-[100dvh] w-[70vw] max-w-sm origin-top-right overflow-y-auto border-l border-border/70 bg-card/95 p-5 pt-20 shadow-[0_16px_40px_rgba(0,0,0,0.2)] backdrop-blur transition-all duration-300 ease-out -translate-y-2 scale-95 opacity-0"
        }
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
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
          <NavOnPageLinks
            navigation={navigation}
            activeId={activeId}
            onSelect={goToSection}
          />
        </nav>
        <div className="mt-4 border-t border-border/60 pt-3">
          <SocialDock links={socialLinks} />
        </div>
      </div>
    </div>
  );
}
