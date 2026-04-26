"use client";

import { useEffect, useMemo, useState } from "react";

type HeroProps = {
  intro: readonly string[];
  /** Path to CV PDF under public/, e.g. /resume.pdf */
  resumeHref?: string;
  resumeLabel?: string;
};

export function Hero({
  intro,
  resumeHref,
  resumeLabel = "Résumé",
}: HeroProps) {
  const firstLine = useMemo(() => "Hi, my name is", []);
  const nameLine = "Brittany Chiang.";
  const secondLine = "I build things for the web.";
  const [typedFirstLine, setTypedFirstLine] = useState("");
  const [typedNameLine, setTypedNameLine] = useState("");
  const [typedSecondLine, setTypedSecondLine] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let delay = 0;
    const STEP_MS = 72;
    const LINE_GAP_MS = 260;

    for (let i = 1; i <= firstLine.length; i += 1) {
      const value = firstLine.slice(0, i);
      timers.push(
        setTimeout(() => {
          if (!cancelled) setTypedFirstLine(value);
        }, delay),
      );
      delay += STEP_MS;
    }

    delay += LINE_GAP_MS;

    for (let i = 1; i <= nameLine.length; i += 1) {
      const value = nameLine.slice(0, i);
      timers.push(
        setTimeout(() => {
          if (!cancelled) setTypedNameLine(value);
        }, delay),
      );
      delay += STEP_MS;
    }

    delay += LINE_GAP_MS;

    for (let i = 1; i <= secondLine.length; i += 1) {
      const value = secondLine.slice(0, i);
      timers.push(
        setTimeout(() => {
          if (!cancelled) setTypedSecondLine(value);
        }, delay),
      );
      delay += STEP_MS;
    }

    timers.push(
      setTimeout(() => {
        if (!cancelled) setShowDetails(true);
      }, delay + 140),
    );

    return () => {
      cancelled = true;
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [firstLine]);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="flex w-full flex-1 flex-col scroll-mt-28 pb-4 pt-2 sm:pb-8 sm:pt-4"
    >
      <div className="flex max-w-2xl flex-1 flex-col gap-8">
        <h1 className="text-balance">
          <span className="block font-mono text-sm font-medium tracking-wide text-accent sm:text-base">
            {typedFirstLine}
          </span>
          <span className="mt-3 block text-5xl font-semibold leading-[1.04] tracking-tight text-accent sm:text-6xl lg:text-[4.8rem]">
            {typedNameLine}
          </span>
          <span className="mt-4 block text-4xl font-semibold leading-[1.08] tracking-tight text-foreground/85 sm:text-5xl lg:text-[4rem]">
            {typedSecondLine}
          </span>
        </h1>
        <div
          className={
            "flex flex-col gap-6 border-l-2 border-accent/40 pl-5 transition-opacity duration-500 " +
            (showDetails ? "opacity-100" : "pointer-events-none opacity-0")
          }
        >
          {intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-muted sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
          {resumeHref ? (
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-md border border-accent bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-accent outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_12px_28px_-8px_rgba(13,148,136,0.45)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:active:scale-100"
            >
              {resumeLabel}
              <svg
                className="size-4 shrink-0 opacity-75 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:group-hover:translate-x-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
