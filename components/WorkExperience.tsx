"use client";

import { useId, useState } from "react";
import type { Experience } from "@/lib/content";

type WorkExperienceProps = {
  experiences: Experience[];
};

function PanelBody({ job }: { job: Experience }) {
  return (
    <>
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        <span className="text-foreground">{job.title}</span>{" "}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 transition-colors hover:underline focus-visible:underline"
        >
          @ {job.company}
        </a>
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

  const active =
    experiences.find((e) => e.id === activeId) ?? experiences[0] ?? null;

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
                "relative shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-4 py-2.5 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-6 " +
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

      <div className="grid pt-8">
        {experiences.map((job) => {
          const selected = job.id === active.id;
          return (
            <div
              key={job.id}
              role="tabpanel"
              id={`${baseId}-panel-${job.id}`}
              aria-labelledby={`${baseId}-tab-${job.id}`}
              aria-hidden={!selected}
              className={
                "col-start-1 row-start-1 w-full " +
                (selected ? "" : "invisible")
              }
            >
              <PanelBody job={job} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
