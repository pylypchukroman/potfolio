"use client";

import Image from "next/image";
import { Fragment } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Project, ProjectDescriptionPart } from "@/lib/content";

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
        className="font-medium text-accent underline decoration-accent/35 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent-hover"
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

type ProjectMetaColumnProps = {
  project: Project;
  align: "left" | "right";
  overlapClass: string;
};

function ProjectMetaColumn({
  project,
  align,
  overlapClass,
}: ProjectMetaColumnProps) {
  const isLeft = align === "left";

  return (
    <div
      className={
        "relative z-10 flex w-full min-w-0 flex-col lg:mt-0 lg:w-[min(100%,44%)] lg:max-w-lg lg:shrink-0 " +
        overlapClass +
        (isLeft
          ? " lg:items-start lg:self-start lg:text-left lg:pr-2"
          : " lg:items-end lg:self-start lg:text-right lg:pl-2")
      }
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent sm:text-sm">
        {project.eyebrow ?? "Featured project"}
      </p>

      <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
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
            "mt-2 font-mono text-sm text-muted " +
            (isLeft ? "lg:self-start" : "lg:self-end")
          }
        >
          {project.year}
        </p>
      ) : null}

      <div
        className="mt-7 w-full rounded-md border p-6 text-left text-[0.9375rem] leading-relaxed text-foreground/95 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)] sm:p-7 lg:shadow-[0_32px_70px_-24px_rgba(0,0,0,0.6)]"
        style={{
          backgroundColor: "var(--project-panel)",
          borderColor: "var(--project-panel-border)",
        }}
      >
        <p>{descriptionFor(project)}</p>
      </div>

      {project.repo || project.href ? (
        <div
          className={
            "mt-6 flex gap-6 " + (isLeft ? "justify-start" : "justify-end")
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
              <GitHubIcon className="h-6 w-6" />
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
              <ExternalIcon className="h-6 w-6" />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type ProjectImageColumnProps = {
  project: Project;
};

function ProjectImageColumn({ project }: ProjectImageColumnProps) {
  return (
    <div className="relative z-0 w-full min-w-0 lg:flex-1">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted/10 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)] sm:aspect-[16/11] lg:aspect-[16/10]">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className={
            "object-cover object-top grayscale transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
            "group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:grayscale-0 motion-reduce:transition-none"
          }
          sizes="(max-width: 1024px) 100vw, min(720px, 55vw)"
        />
      </div>
      <p
        className="mt-4 text-left font-mono text-sm leading-relaxed text-muted lg:mt-5"
        aria-label="Technologies used"
      >
        {project.tech.join(" · ")}
      </p>
    </div>
  );
}

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="flex flex-col gap-28 lg:gap-36">
      {projects.map((project, index) => {
        /** Even: reference layout — copy left, screenshot right, panel overlaps image. Odd: mirrored. */
        const textLeftImageRight = index % 2 === 0;

        return (
          <li key={project.title}>
            <Reveal delay={index * 0.06}>
              <article className="group relative">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
                  {textLeftImageRight ? (
                    <>
                      <ProjectMetaColumn
                        project={project}
                        align="left"
                        overlapClass="lg:-mr-12 xl:-mr-24 2xl:-mr-32"
                      />
                      <ProjectImageColumn project={project} />
                    </>
                  ) : (
                    <>
                      <ProjectImageColumn project={project} />
                      <ProjectMetaColumn
                        project={project}
                        align="right"
                        overlapClass="lg:-ml-12 xl:-ml-24 2xl:-ml-32"
                      />
                    </>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
