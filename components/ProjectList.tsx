"use client";

import Image from "next/image";
import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import type { Project, ProjectDescriptionPart } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

const iconStroke = {
  width: 1.25,
  cap: "round" as const,
  join: "round" as const,
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={iconStroke.width}
      strokeLinecap={iconStroke.cap}
      strokeLinejoin={iconStroke.join}
      aria-hidden
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={iconStroke.width}
      strokeLinecap={iconStroke.cap}
      strokeLinejoin={iconStroke.join}
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function renderDescription(parts: ProjectDescriptionPart[]) {
  return parts.map((part, i) => {
    if (typeof part === "string") {
      return <Fragment key={i}>{part}</Fragment>;
    }
    return (
      <a
        key={i}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
      >
        {part.link}
      </a>
    );
  });
}

function descriptionFor(project: Project) {
  if (project.descriptionRich?.length) {
    return renderDescription(project.descriptionRich);
  }
  return project.description;
}

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  const reduce = useReducedMotion();

  return (
    <ul className="flex flex-col gap-24 lg:gap-28">
      {projects.map((project, index) => (
        <li key={project.title}>
          <Reveal delay={index * 0.06}>
            <motion.article
              className="relative"
              whileHover={
                reduce
                  ? undefined
                  : { transition: { duration: 0.25, ease } }
              }
            >
              {/*
                Second project: swap layout (photo left, text right).
                Indexing is 0-based, so the "second" card is index === 1.
              */}
              {(() => {
                const swapped = index === 1;
                return (
                  <div
                    className={
                      "flex flex-col gap-8 lg:items-start lg:gap-0 " +
                      (swapped ? "lg:flex-row-reverse" : "lg:flex-row")
                    }
                  >
                {/* Preview image — left, large */}
                <div className="group relative z-0 w-full shrink-0 lg:w-[min(100%,62%)] lg:max-w-3xl">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/20 shadow-sm">
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grayscale lg:group-hover:grayscale-0 lg:group-focus-within:grayscale-0 motion-reduce:transition-none"
                      sizes="(max-width: 1024px) 100vw, 640px"
                    />
                  </div>
                </div>

                {/* Meta + overlapping panel — right */}
                <div
                  className={
                    "relative z-10 flex w-full min-w-0 flex-col lg:mt-4 lg:w-[42%] lg:max-w-md lg:flex-1 " +
                    (swapped
                      ? "lg:-mr-16 lg:items-start lg:text-left xl:-mr-24"
                      : "lg:-ml-16 lg:items-end lg:text-right xl:-ml-24")
                  }
                >
                  <p className="font-mono text-sm font-medium text-accent">
                    {project.eyebrow ?? "Featured project"}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent focus-visible:text-accent"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  {project.year ? (
                    <p
                      className={
                        "mt-1 font-mono text-sm text-muted " +
                        (swapped ? "lg:self-start" : "lg:self-end")
                      }
                    >
                      {project.year}
                    </p>
                  ) : null}

                  <div
                    className="mt-6 w-full rounded-lg border p-5 text-left text-sm leading-relaxed text-foreground shadow-[0_18px_40px_-12px_rgba(15,23,42,0.12)] lg:shadow-[0_20px_50px_-15px_rgba(15,23,42,0.14)]"
                    style={{
                      backgroundColor: "var(--project-panel)",
                      borderColor: "var(--project-panel-border)",
                    }}
                  >
                    <p>{descriptionFor(project)}</p>
                  </div>

                  <ul
                    className={
                      "mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted " +
                      (swapped ? "lg:justify-start" : "lg:justify-end")
                    }
                    aria-label="Technologies"
                  >
                    {project.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  {project.repo || project.href ? (
                    <div
                      className={
                        "mt-4 flex gap-5 " +
                        (swapped ? "lg:justify-start" : "lg:justify-end")
                      }
                    >
                      {project.repo ? (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} on GitHub`}
                          className="text-muted transition-colors hover:text-accent focus-visible:text-accent"
                        >
                          <GitHubIcon className="h-5 w-5" />
                        </a>
                      ) : null}
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live site`}
                          className="text-muted transition-colors hover:text-accent focus-visible:text-accent"
                        >
                          <ExternalIcon className="h-5 w-5" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                  </div>
                );
              })()}
            </motion.article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
