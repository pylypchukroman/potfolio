"use client";

import type { SocialLink } from "@/lib/content";

const stroke = {
  width: 1.25,
  cap: "round" as const,
  join: "round" as const,
};

function Icon({
  network,
  className,
}: {
  network: SocialLink["network"];
  className?: string;
}) {
  const cn = className ?? "h-4 w-4";
  const common = {
    className: cn,
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: stroke.width,
    strokeLinecap: stroke.cap,
    strokeLinejoin: stroke.join,
    "aria-hidden": true as const,
  };

  switch (network) {
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" rx="0.5" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    default:
      return null;
  }
}

type SocialDockProps = {
  links: SocialLink[];
};

export function SocialDock({ links }: SocialDockProps) {
  return (
    <div className="pointer-events-none fixed bottom-0 left-2 z-50 flex w-5 flex-col items-center max-sm:left-1.5">
      <nav
        aria-label="Social profiles"
        className="pointer-events-auto mb-3 flex flex-col items-center gap-4"
      >
        {links.map((link) => (
          <a
            key={link.network}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="inline-flex min-h-9 min-w-9 items-center justify-center text-muted transition-colors duration-200 hover:text-accent focus-visible:text-accent"
          >
            <Icon network={link.network} />
          </a>
        ))}
      </nav>
      {/* Short rail: grows upward from the bottom edge of the viewport (not from the top) */}
      <div
        className="h-20 w-px shrink-0 bg-muted/70 max-sm:h-16"
        aria-hidden
      />
    </div>
  );
}
