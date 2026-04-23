"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import type { Experience } from "@/lib/content";

type WorkExperienceProps = {
  experiences: Experience[];
};

function PanelBody({ job }: { job: Experience }) {
  return (
    <>
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        <span className="text-foreground">{job.title}</span>{" "}
        <span className="text-accent">@ {job.company}</span>
      </h3>
      <p className="mt-2 font-mono text-sm text-muted">{job.range}</p>
      {job.summary ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {job.summary}
        </p>
      ) : null}
      <ul className="mt-6 max-w-2xl space-y-3" aria-label="Role highlights">
        {job.bullets.map((item) => (
          <li
            key={item}
            className="relative pl-6 text-sm leading-relaxed text-muted before:absolute before:left-0 before:font-mono before:text-accent before:content-['▹'] sm:text-base"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export function WorkExperience({ experiences }: WorkExperienceProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? "");
  const [panelMinHeight, setPanelMinHeight] = useState(0);
  const panelRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const expKey = experiences.map((e) => e.id).join("|");

  const active =
    experiences.find((e) => e.id === activeId) ?? experiences[0] ?? null;

  const setPanelRef = useCallback(
    (id: string) => (node: HTMLDivElement | null) => {
      if (node) panelRefs.current.set(id, node);
      else panelRefs.current.delete(id);
    },
    [],
  );

  useLayoutEffect(() => {
    const runMeasure = () => {
      let max = 0;
      for (const { id } of experiences) {
        const el = panelRefs.current.get(id);
        if (el) max = Math.max(max, el.scrollHeight);
      }
      if (max > 0) {
        setPanelMinHeight((prev) => (prev === max ? prev : max));
      }
    };

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(runMeasure);
    });

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(runMeasure);
    });
    for (const { id } of experiences) {
      const el = panelRefs.current.get(id);
      if (el) ro.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
    };
  }, [expKey, experiences]);

  if (!active || experiences.length === 0) return null;

  return (
    <div className="w-full min-w-0">
      <div
        role="tablist"
        aria-label="Employers"
        className="flex overflow-x-auto border-b border-border sm:flex-row sm:flex-wrap sm:gap-x-1"
      >
        {experiences.map((job) => {
          const selected = job.id === active.id;
          return (
            <button
              key={job.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${job.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${job.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(job.id)}
              className={
                "relative shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 font-mono text-sm transition-colors max-sm:px-2 max-sm:text-xs " +
                (selected
                  ? "-mb-px border-accent font-medium text-accent"
                  : "border-transparent text-muted hover:text-foreground")
              }
            >
              {job.company}
            </button>
          );
        })}
      </div>

      <div className="pt-8">
        <div
          className="relative w-full min-h-0"
          style={
            panelMinHeight > 0
              ? { minHeight: panelMinHeight }
              : undefined
          }
        >
          {experiences.map((job) => {
            const selected = job.id === active.id;
            return (
              <div
                key={job.id}
                ref={setPanelRef(job.id)}
                role="tabpanel"
                id={`${baseId}-panel-${job.id}`}
                aria-labelledby={`${baseId}-tab-${job.id}`}
                className={
                  selected
                    ? "relative z-10 w-full"
                    : "pointer-events-none absolute inset-x-0 top-0 z-0 opacity-0 select-none"
                }
                aria-hidden={!selected}
              >
                <PanelBody job={job} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
