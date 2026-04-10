"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

/** Shared easing for scroll / entrance motion */
export const motionEase = [0.22, 1, 0.36, 1] as const;

function useRevealVariants(delay = 0): Variants {
  const reduce = useReducedMotion();
  if (reduce) {
    return {
      hidden: { opacity: 1, y: 0, scale: 1 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 28, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, delay, ease: motionEase },
    },
  };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "variants">;

/** Viewport tuned so sections animate when you scroll them into view */
const revealViewport = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px -14% 0px",
} as const;

export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  const variants = useRevealVariants(delay);
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "variants">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : 0.07,
            delayChildren: reduce ? 0 : 0.04,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: reduce ? 1 : 0,
          y: reduce ? 0 : 10,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: motionEase },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function PhotoReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, scale: 0.98 }
      }
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.45, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}
