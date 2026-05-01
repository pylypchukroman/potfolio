"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();
  const firstLine = "Hi, my name is";
  const nameLine = "Roman Pylypchuk.";
  const secondLine = "I build full-stack products for the web.";
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.section
      id="hero"
      aria-label="Introduction"
      className="flex w-full flex-1 flex-col scroll-mt-28 pb-4 pt-2 sm:pb-8 sm:pt-4"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 1.4, ease }}
    >
      <div className="flex max-w-2xl flex-1 flex-col gap-8">
        <motion.h1
          className="text-balance"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay: 0.16, ease }}
        >
          <motion.span
            className="block font-mono text-sm font-medium tracking-wide text-accent sm:text-base"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.28 }}
          >
            {firstLine}
          </motion.span>
          <motion.span
            className="mt-3 block text-5xl font-semibold leading-[1.04] tracking-tight text-accent sm:text-6xl lg:text-[4.8rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.4, ease }}
          >
            {nameLine}
          </motion.span>
          <motion.span
            className="mt-4 block text-4xl font-semibold leading-[1.08] tracking-tight text-foreground/85 sm:text-5xl lg:text-[4rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.56, ease }}
          >
            {secondLine}
          </motion.span>
        </motion.h1>
        <motion.div
          className="flex flex-col gap-6 border-l-2 border-accent/40 pl-5"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay: 0.68, ease }}
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
        </motion.div>
      </div>
    </motion.section>
  );
}
