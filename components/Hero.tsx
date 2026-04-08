"use client";

type HeroProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  intro: readonly string[];
  /** Path to CV PDF under public/, e.g. /resume.pdf */
  resumeHref?: string;
  resumeLabel?: string;
};

export function Hero({
  eyebrow,
  titleLead,
  titleAccent,
  intro,
  resumeHref,
  resumeLabel = "Résumé",
}: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="flex w-full flex-1 flex-col scroll-mt-28 pb-4 pt-2 sm:pb-8 sm:pt-4"
    >
      <div className="flex max-w-2xl flex-1 flex-col gap-8">
        <p className="font-mono text-sm font-medium text-accent">{eyebrow}</p>
        <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
          <span className="text-foreground">{titleLead}</span>{" "}
          <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
            {titleAccent}
          </span>
        </h1>
        <div className="flex flex-col gap-6 border-l-2 border-accent/40 pl-5">
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
