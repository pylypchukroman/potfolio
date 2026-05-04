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
};

export function DesktopSidebar({
  name,
  headline,
  navigation,
  socialLinks,
  activeId,
  onNavLinkClick,
  revealed,
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
            <NavOnPageLinks
              navigation={navigation}
              activeId={activeId}
              onSelect={goToSection}
            />
          </nav>
        </StaggerItem>
        <StaggerItem>
          <SocialDock links={socialLinks} mode="inline" />
        </StaggerItem>
      </StaggerContainer>
    </header>
  );
}
