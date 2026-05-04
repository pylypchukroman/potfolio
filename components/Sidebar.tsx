"use client";

import { DesktopSidebar } from "@/components/DesktopSidebar";
import { MobileNavMenu } from "@/components/MobileNavMenu";
import type { NavItem, SocialLink } from "@/lib/content";
import { useActiveNavSection } from "@/lib/useActiveNavSection";

type SidebarProps = {
  name: string;
  headline: string;
  navigation: NavItem[];
  socialLinks: SocialLink[];
};

export function Sidebar({
  name,
  headline,
  navigation,
  socialLinks,
}: SidebarProps) {
  const { activeId, onNavLinkClick, desktopSidebarRevealed } =
    useActiveNavSection(navigation, "about");

  return (
    <>
      <MobileNavMenu
        name={name}
        headline={headline}
        navigation={navigation}
        socialLinks={socialLinks}
        activeId={activeId}
        onNavLinkClick={onNavLinkClick}
      />
      <DesktopSidebar
        name={name}
        headline={headline}
        navigation={navigation}
        socialLinks={socialLinks}
        activeId={activeId}
        onNavLinkClick={onNavLinkClick}
        revealed={desktopSidebarRevealed}
      />
    </>
  );
}
