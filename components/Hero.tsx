"use client";

import { motion, useReducedMotion } from "framer-motion";

import { motionEase } from "@/components/motion/Reveal";
import { outlineButtonClassName, sectionScrollClassName } from "@/lib/styles";

type HeroProps = {
  name: string;
  greeting: string;
  tagline: string;
  intro: readonly string[];
  /** Path to CV PDF under public/, e.g. /resume.pdf */
  resumeHref?: string;
  resumeLabel?: string;
};

export function Hero({
  name,
  greeting,
  tagline,
  intro,
  resumeHref,
  resumeLabel = "Résumé",
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const ease = motionEase;

  return (
    <motion.section
      id="hero"
      aria-label="Introduction"
      className={`flex w-full flex-1 flex-col pb-4 sm:pb-8 ${sectionScrollClassName}`}
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
            {greeting}
          </motion.span>
          <motion.span
            className="mt-3 block text-5xl font-semibold leading-[1.04] tracking-tight text-accent sm:text-6xl lg:text-[4.5rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.4, ease }}
          >
            {name}
          </motion.span>
          <motion.span
            className="mt-4 block text-4xl font-semibold leading-[1.08] tracking-tight text-muted sm:text-5xl lg:text-[3.5rem]"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.56, ease }}
          >
            {tagline}
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
              className={`group ${outlineButtonClassName}`}
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
