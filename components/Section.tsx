"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { motionEase } from "@/components/motion/Reveal";

/** Tall sections: ratio 0.2 can never be met on short viewports (visible slice < 20% of section height). */
const sectionViewport = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px -14% 0px",
} as const;

function useSectionVariants(): { container: Variants; item: Variants } {
  const reduce = useReducedMotion();
  if (reduce) {
    return {
      container: {
        hidden: {},
        visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
      },
      item: {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0, transition: { duration: 0 } },
      },
    };
  }
  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.11,
          delayChildren: 0.07,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 26 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: motionEase },
      },
    },
  };
}

type SectionProps = {
  id: string;
  title: string;
  /** Optional numbered prefix + horizontal rule (e.g. portfolio projects block) */
  index?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  id,
  title,
  index,
  children,
  className = "",
}: SectionProps) {
  const { container, item } = useSectionVariants();

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
      variants={container}
    >
      {index != null ? (
        <motion.h2
          id={`${id}-heading`}
          variants={item}
          className="mb-10 flex w-full min-w-0 flex-wrap items-center gap-x-3 gap-y-2 font-sans text-lg font-semibold tracking-tight text-foreground sm:gap-x-4"
        >
          <span className="shrink-0 font-mono text-base font-medium text-accent">
            {index}.
          </span>
          <span className="min-w-0 shrink">{title}</span>
          <span
            className="hidden h-px min-h-px min-w-[2rem] flex-1 bg-border sm:block"
            aria-hidden
          />
        </motion.h2>
      ) : (
        <motion.h2
          id={`${id}-heading`}
          variants={item}
          className="mb-6 font-mono text-sm font-medium uppercase tracking-widest text-muted"
        >
          {title}
        </motion.h2>
      )}
      <motion.div variants={item} className="min-w-0">
        {children}
      </motion.div>
    </motion.section>
  );
}
