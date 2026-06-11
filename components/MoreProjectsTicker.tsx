"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { ExternalIcon, GitHubIcon } from "@/components/icons";
import type { MiniProject } from "@/lib/content";

type MoreProjectsTickerProps = {
  projects: readonly MiniProject[];
};

const ease = [0.22, 1, 0.36, 1] as const;

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
                    {active.tech?.length ? (
                      <p className="mt-4 font-mono text-sm text-muted">
                        {active.tech.join(" · ")}
                      </p>
                    ) : null}
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

