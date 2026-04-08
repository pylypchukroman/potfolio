"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useId, useState } from "react";
import type { SkillGroup } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

type SkillTabsProps = {
  groups: readonly SkillGroup[];
};

export function SkillTabs({ groups }: SkillTabsProps) {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(groups[0]?.id ?? "");
  const active = groups.find((g) => g.id === activeId) ?? groups[0] ?? null;

  const focusTab = useCallback(
    (id: string) => {
      document.getElementById(`${baseId}-tab-${id}`)?.focus();
    },
    [baseId],
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = groups[(index + 1) % groups.length];
        setActiveId(next.id);
        queueMicrotask(() => focusTab(next.id));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = groups[(index - 1 + groups.length) % groups.length];
        setActiveId(next.id);
        queueMicrotask(() => focusTab(next.id));
      } else if (e.key === "Home") {
        e.preventDefault();
        const next = groups[0];
        setActiveId(next.id);
        queueMicrotask(() => focusTab(next.id));
      } else if (e.key === "End") {
        e.preventDefault();
        const next = groups[groups.length - 1];
        setActiveId(next.id);
        queueMicrotask(() => focusTab(next.id));
      }
    },
    [groups, focusTab],
  );

  if (!active || groups.length === 0) return null;

  return (
    <div
      role="tablist"
      aria-label="Skill categories"
      aria-orientation="vertical"
      className="flex w-full min-w-0 flex-col gap-y-0.5"
    >
      {groups.map((group, index) => {
        const selected = group.id === active.id;
        return (
          <motion.div
            key={group.id}
            className="relative flex items-baseline gap-5 rounded-lg py-1.5 pl-2 pr-2 sm:gap-8"
            initial={reduceMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, delay: index * 0.06, ease }
            }
          >
            {selected && reduceMotion ? (
              <div
                className="absolute inset-0 rounded-lg bg-accent/12"
                aria-hidden
              />
            ) : null}
            {selected && !reduceMotion ? (
              <motion.div
                layoutId="skills-row-highlight"
                className="absolute inset-0 rounded-lg bg-accent/12"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                aria-hidden
              />
            ) : null}

            <motion.button
              type="button"
              role="tab"
              id={`${baseId}-tab-${group.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${group.id}`}
              tabIndex={0}
              onClick={() => setActiveId(group.id)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 520, damping: 28 }}
              className={
                "relative z-10 w-32 shrink-0 cursor-pointer rounded py-1 pl-3 text-left font-mono text-sm transition-[color,opacity] duration-200 before:absolute before:left-0 before:top-1 before:bottom-1 before:z-10 before:w-0.5 before:rounded-full before:transition-colors sm:w-36 sm:text-base " +
                (selected
                  ? "cursor-default font-medium text-accent before:bg-accent"
                  : "text-foreground/36 before:bg-transparent hover:text-foreground/52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background")
              }
            >
              {group.label}
            </motion.button>
            <div
              role="tabpanel"
              id={`${baseId}-panel-${group.id}`}
              aria-labelledby={`${baseId}-tab-${group.id}`}
              hidden={!selected}
              className="relative z-10 min-h-[1.25rem] min-w-0 flex-1 py-1 sm:min-h-[1.375rem] sm:py-1.5"
            >
              {selected ? (
                <motion.span
                  key={group.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.32, ease, delay: 0.05 }
                  }
                  className="inline-block select-text text-sm leading-snug text-foreground/85 sm:text-base"
                >
                  {group.items.join(", ")}
                </motion.span>
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
