"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
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

export function MoreProjectsTicker({ projects }: MoreProjectsTickerProps) {
  const reduce = useReducedMotion();
  const baseId = useId();
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

      <div className="rounded-xl bg-card/60 p-4 sm:p-5 md:p-7">
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <div
            role="tablist"
            aria-label="More projects"
            className="flex overflow-x-auto border-b border-border md:w-64 md:flex-col md:overflow-visible md:border-b-0 md:border-l md:border-border"
          >
            {safeProjects.map((p) => {
              const selected = active?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${p.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  className={
                    "group relative shrink-0 cursor-pointer whitespace-nowrap px-4 py-3 text-left font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
                    // mobile: underline indicator
                    "border-b-2 md:border-b-0 md:pl-6 md:pr-4 " +
                    // desktop: left indicator
                    "md:before:absolute md:before:left-0 md:before:top-0 md:before:h-full md:before:w-0.5 md:before:rounded-full " +
                    (selected
                      ? "border-accent text-accent md:before:bg-accent"
                      : "border-transparent text-muted hover:text-foreground md:before:bg-transparent")
                  }
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate">{p.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="min-w-0 flex-1 md:pl-6">
            <AnimatePresence mode="wait" initial={false}>
              {active ? (
                <motion.div
                  key={active.id}
                  role="tabpanel"
                  id={`${baseId}-panel-${active.id}`}
                  aria-labelledby={`${baseId}-tab-${active.id}`}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 6 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.35, ease }}
                  className="min-h-56 sm:min-h-72"
                >
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-start justify-between gap-4">
                      <h3 className="min-w-0 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {active.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                      {active.description}
                    </p>
                  </div>

                  {(active.href || active.repo) && (
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
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
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

