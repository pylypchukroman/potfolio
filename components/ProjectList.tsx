"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { GitHubIcon, ExternalIcon } from "@/components/icons";
import type { Project } from "@/lib/content";

type ProjectMetaColumnProps = {
  project: Project;
  align: "left" | "right";
  overlapClass: string;
  className?: string;
};

function ProjectMetaColumn({
  project,
  align,
  overlapClass,
  className,
}: ProjectMetaColumnProps) {
  const isLeft = align === "left";

  return (
    <div
      className={
        "relative z-10 flex w-full min-w-0 flex-col lg:mt-0 lg:w-[min(100%,44%)] lg:max-w-lg lg:shrink-0 " +
        overlapClass +
        (className ? ` ${className}` : "") +
        (isLeft
          ? " lg:items-start lg:self-start lg:text-left lg:pr-2"
          : " lg:items-end lg:self-start lg:text-right lg:pl-2")
      }
    >
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent sm:text-sm">
        {project.eyebrow ?? "Featured project"}
      </p>

      <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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

      <div className="mt-7 w-full rounded-md border border-project-panel-border bg-project-panel p-6 text-left text-base leading-relaxed text-foreground shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)] sm:p-7 lg:shadow-[0_32px_70px_-24px_rgba(0,0,0,0.6)]">
        <p>{project.description}</p>
      </div>

      {(project.repos?.length || project.href) ? (
        <div
          className={
            "mt-6 flex gap-6 " + (isLeft ? "justify-start" : "justify-end")
          }
        >
          {(project.repos ?? []).map((url, i) => {
            const multi = (project.repos?.length ?? 0) > 1;
            const label = i === 0 ? "FE" : "BE";
            return (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={multi ? `${project.title} ${label} on GitHub` : `${project.title} on GitHub`}
                className="flex flex-col items-center gap-0.5 text-muted transition-colors hover:text-accent focus-visible:text-accent"
              >
                <GitHubIcon className="h-6 w-6" strokeWidth={1.25} />
                {multi && (
                  <span className="font-mono text-[0.6rem] uppercase tracking-widest">{label}</span>
                )}
              </a>
            );
          })}
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className="text-muted transition-colors hover:text-accent focus-visible:text-accent"
            >
              <ExternalIcon className="h-6 w-6" strokeWidth={1.25} />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type ProjectImageColumnProps = {
  project: Project;
  className?: string;
};

function ProjectImageColumn({ project, className }: ProjectImageColumnProps) {
  return (
    <div
      className={
        "relative z-0 w-full min-w-0 lg:flex-1" + (className ? ` ${className}` : "")
      }
    >
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
    <ul className="flex flex-col gap-16 lg:gap-20">
      {projects.map((project, index) => {
        /** Even: reference layout — copy left, screenshot right, panel overlaps image. Odd: mirrored. */
        const textLeftImageRight = index % 2 === 0;
        const metaAlign = textLeftImageRight ? ("left" as const) : ("right" as const);
        const metaOverlap = textLeftImageRight
          ? "lg:-mr-8 xl:-mr-16 2xl:-mr-24"
          : "lg:-ml-8 xl:-ml-16 2xl:-ml-24";

        return (
          <li key={project.title}>
            <Reveal delay={index * 0.06}>
              <article className="group relative">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
                  <ProjectMetaColumn
                    project={project}
                    align={metaAlign}
                    overlapClass={metaOverlap}
                    className={textLeftImageRight ? "lg:order-1" : "lg:order-2"}
                  />
                  <ProjectImageColumn
                    project={project}
                    className={textLeftImageRight ? "lg:order-2" : "lg:order-1"}
                  />
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
