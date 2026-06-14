"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { GitHubIcon, ExternalIcon } from "@/components/icons";
import type { Project } from "@/lib/content";

type Side = "left" | "right";

const ICON_LINK =
  "text-muted transition-colors hover:text-accent focus-visible:text-accent";

const IMAGE_FRAME =
  "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border/50 bg-muted/10 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)] sm:aspect-[16/11] lg:aspect-[16/10] xl:aspect-auto xl:h-[264px] xl:w-[422px]";

const IMAGE_GRAYSCALE =
  "object-cover object-top grayscale transition-[filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:grayscale-0 motion-reduce:transition-none";

const DESCRIPTION_PANEL =
  "relative z-10 mt-7 w-full rounded-md border border-project-panel-border bg-project-panel p-6 text-left text-base leading-relaxed text-foreground shadow-[0_28px_60px_-20px_rgba(0,0,0,0.55)] sm:p-7 lg:w-[158.4%] lg:max-w-[810px] lg:shadow-[0_32px_70px_-24px_rgba(0,0,0,0.6)]";

const PANEL_OVERLAP: Record<Side, string> = {
  left: "lg:-ml-8 xl:-ml-10 2xl:-ml-20",
  right: "lg:-mr-8 xl:-mr-10 2xl:-mr-20",
};

function ProjectLinks({ project, align }: { project: Project; align: Side }) {
  const repos = project.repos ?? [];
  if (repos.length === 0 && !project.href) return null;

  const multi = repos.length > 1;

  return (
    <div
      className={`mt-4 flex gap-6 lg:mt-5 ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      {repos.map((url, i) => {
        const label = i === 0 ? "FE" : "BE";
        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              multi ? `${project.title} ${label} on GitHub` : `${project.title} on GitHub`
            }
            className={`flex flex-col items-center gap-0.5 ${ICON_LINK}`}
          >
            <GitHubIcon className="h-6 w-6" strokeWidth={1.25} />
            {multi && (
              <span className="font-mono text-[0.6rem] uppercase tracking-widest">
                {label}
              </span>
            )}
          </a>
        );
      })}
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} live site`}
          className={ICON_LINK}
        >
          <ExternalIcon className="h-6 w-6" strokeWidth={1.25} />
        </a>
      )}
    </div>
  );
}

function ProjectMetaColumn({
  project,
  mirrored,
  className = "",
}: {
  project: Project;
  mirrored: boolean;
  className?: string;
}) {
  const textSide: Side = mirrored ? "right" : "left";
  const overlapSide: Side = mirrored ? "left" : "right";

  return (
    <div
      className={`relative flex w-full min-w-0 flex-col lg:w-[min(100%,44%)] lg:max-w-lg lg:shrink-0 ${className} ${
        mirrored
          ? "lg:items-end lg:self-start lg:text-right lg:pl-2"
          : "lg:items-start lg:self-start lg:text-left lg:pr-2"
      }`}
    >
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent sm:text-sm">
        {project.eyebrow ?? "Featured project"}
      </p>

      <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {project.title}
      </h3>

      <p
        className={`mt-2 w-full font-mono text-sm leading-relaxed text-muted ${
          textSide === "left" ? "text-left lg:self-start" : "text-right lg:self-end"
        }`}
        aria-label="Technologies used"
      >
        {project.tech.join(" · ")}
      </p>

      <div className={`${DESCRIPTION_PANEL} ${PANEL_OVERLAP[overlapSide]}`}>
        <p>{project.description}</p>
      </div>
    </div>
  );
}

function ProjectImageColumn({
  project,
  mirrored,
  className = "",
}: {
  project: Project;
  mirrored: boolean;
  className?: string;
}) {
  const linkAlign: Side = mirrored ? "left" : "right";

  return (
    <div
      className={`relative z-0 flex w-full min-w-0 flex-col lg:max-w-[422px] lg:basis-[422px] lg:shrink xl:w-[422px] xl:shrink-0 ${
        mirrored ? "lg:items-start" : "lg:items-end"
      } ${className}`}
    >
      <div className={IMAGE_FRAME}>
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          className={IMAGE_GRAYSCALE}
          sizes="(max-width: 1024px) 100vw, 422px"
        />
      </div>
      <ProjectLinks project={project} align={linkAlign} />
    </div>
  );
}

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col gap-16 lg:gap-20 lg:pr-5">
      {projects.map((project, index) => {
        const mirrored = index % 2 === 1;

        return (
          <li key={project.title}>
            <Reveal delay={index * 0.06}>
              <article className="group relative min-w-0">
                <div className="flex min-w-0 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
                  <ProjectMetaColumn
                    project={project}
                    mirrored={mirrored}
                    className={mirrored ? "lg:order-2" : "lg:order-1"}
                  />
                  <ProjectImageColumn
                    project={project}
                    mirrored={mirrored}
                    className={mirrored ? "lg:order-1" : "lg:order-2"}
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
