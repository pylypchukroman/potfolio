"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/content";

/**
 * Scroll spy for in-page nav + optional desktop sidebar reveal after a section.
 * @param revealDesktopSidebarAfterSectionId — e.g. `"about"`; when omitted, `desktopSidebarRevealed` stays `true`.
 */
export function useActiveNavSection(
  navigation: readonly NavItem[],
  revealDesktopSidebarAfterSectionId?: string,
) {
  const [activeId, setActiveId] = useState("");
  const [desktopSidebarRevealed, setDesktopSidebarRevealed] = useState(false);

  useEffect(() => {
    const ids = navigation.map((item) => item.id);
    const revealId = revealDesktopSidebarAfterSectionId;
    if (ids.length === 0 && !revealId) return;

    const measure = () => {
      if (ids.length > 0) {
        const marker = window.scrollY + window.innerHeight * 0.35;
        let current: string | null = null;
        for (const id of ids) {
          const el = document.getElementById(id);
          if (!el) continue;
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= marker) current = id;
        }
        setActiveId(current ?? "");
      }

      if (revealId) {
        const anchor = document.getElementById(revealId);
        if (!anchor) {
          setDesktopSidebarRevealed(false);
        } else {
          const anchorTop =
            anchor.getBoundingClientRect().top + window.scrollY;
          setDesktopSidebarRevealed(window.scrollY >= anchorTop - 200);
        }
      }
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [navigation, revealDesktopSidebarAfterSectionId]);

  return {
    activeId,
    /** Call when the user picks a section so the highlight updates before scroll finishes. */
    onNavLinkClick: setActiveId,
    desktopSidebarRevealed: revealDesktopSidebarAfterSectionId
      ? desktopSidebarRevealed
      : true,
  };
}
