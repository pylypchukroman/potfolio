"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { MiniProject } from "@/lib/content";

type MoreProjectsTickerProps = {
  projects: readonly MiniProject[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function primaryLinkFor(project: MiniProject) {
  return project.href ?? project.repo ?? null;
}

export function MoreProjectsTicker({ projects }: MoreProjectsTickerProps) {
  const reduce = useReducedMotion();
  const safeProjects = projects.filter((p) => p.title.trim().length > 0);
  const [activeId, setActiveId] = useState<string>(safeProjects[0]?.id ?? "");

  const active = safeProjects.find((p) => p.id === activeId) ?? safeProjects[0] ?? null;

  if (safeProjects.length === 0) return null;

  return (
    <div className="mt-14">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
          More projects
        </p>
      </div>

      <div className="flex flex-col gap-6 rounded-xl bg-card/60 p-4 sm:p-5">
        <div className="relative -mx-1 min-w-0">
          <ul
            className="flex snap-x snap-proximity gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 pb-2 [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]"
            aria-label="More projects list"
          >
            {safeProjects.map((p) => {
              const isActive = active?.id === p.id;
              const link = primaryLinkFor(p);
              const Tag = link ? "a" : "button";

              return (
                <li key={p.id} className="shrink-0 snap-start">
                  <Tag
                    href={link ?? undefined}
                    target={link ? "_blank" : undefined}
                    rel={link ? "noopener noreferrer" : undefined}
                    type={link ? undefined : "button"}
                    onClick={() => setActiveId(p.id)}
                    onMouseEnter={() => setActiveId(p.id)}
                    onFocus={() => setActiveId(p.id)}
                    className={
                      "relative inline-flex h-10 items-center whitespace-nowrap rounded-lg py-1 pl-3 pr-3 text-left font-mono text-sm transition-[color,background-color,opacity] duration-200 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:rounded-full before:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
                      (isActive
                        ? "bg-accent/12 font-medium text-accent before:bg-accent"
                        : "bg-transparent text-foreground/36 before:bg-transparent hover:bg-accent/8 hover:text-foreground/52")
                    }
                  >
                    <span className="pl-1">{p.title}</span>
                  </Tag>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex min-h-56 sm:min-h-72">
          <AnimatePresence mode="wait" initial={false}>
            {active ? (
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 6 }}
                transition={reduce ? { duration: 0 } : { duration: 0.35, ease }}
                className="flex w-full flex-col justify-between rounded-lg border border-border bg-background/60 p-4"
              >
                <div className="flex flex-col gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-medium text-foreground">
                      {active.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {active.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                    {active.href ? (
                      <a
                        href={active.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent"
                      >
                        <ExternalIcon className="h-4 w-4" />
                        Live
                      </a>
                    ) : null}
                    {active.repo ? (
                      <a
                        href={active.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent"
                      >
                        <GitHubIcon className="h-4 w-4" />
                        GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

