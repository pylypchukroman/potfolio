"use client";

import { SocialDock } from "@/components/SocialDock";
import { NavOnPageLinks } from "@/components/NavOnPageLinks";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/Reveal";
import type { NavItem, SocialLink } from "@/lib/content";
import { scrollToSectionById } from "@/lib/scrollToSection";

export type DesktopSidebarProps = {
  name: string;
  headline: string;
  navigation: NavItem[];
  socialLinks: SocialLink[];
  activeId: string;
  onNavLinkClick: (id: string) => void;
  /** Fades the sidebar in after the user reaches the configured anchor section. */
  revealed: boolean;
  resumeHref?: string;
  resumeLabel?: string;
};

export function DesktopSidebar({
  name,
  headline,
  navigation,
  socialLinks,
  activeId,
  onNavLinkClick,
  revealed,
  resumeHref,
  resumeLabel = "Résumé",
}: DesktopSidebarProps) {
  function goToSection(id: string) {
    onNavLinkClick(id);
    scrollToSectionById(id);
  }

  return (
    <header
      className={
        "hidden flex-col gap-8 transition-opacity duration-300 lg:flex " +
        (revealed ? "opacity-100" : "pointer-events-none opacity-0")
      }
    >
      <StaggerContainer className="flex flex-col gap-4">
        <StaggerItem>
          <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {name}
          </p>
        </StaggerItem>
        <StaggerItem>
          <div className="flex flex-col gap-3">
            <p className="max-w-xs text-base leading-relaxed text-muted">
              {headline}
            </p>
            {resumeHref ? (
              <span className="group/resume relative w-fit">
                <span
                  className="pointer-events-none absolute -inset-x-5 -inset-y-2 rounded-lg bg-accent/[30.25%] opacity-[0.85] blur-xl transition-opacity duration-300 group-hover/resume:opacity-100 group-focus-within/resume:opacity-100 motion-reduce:transition-none"
                  aria-hidden
                />
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-base leading-relaxed text-accent transition-colors hover:text-accent-hover focus-visible:text-accent-hover"
                >
                  {resumeLabel}
                </a>
              </span>
            ) : null}
          </div>
        </StaggerItem>
        <StaggerItem>
          <nav aria-label="On this page">
            <NavOnPageLinks
              navigation={navigation}
              activeId={activeId}
              onSelect={goToSection}
            />
          </nav>
        </StaggerItem>
        <StaggerItem>
          <SocialDock links={socialLinks} />
        </StaggerItem>
      </StaggerContainer>
    </header>
  );
}
