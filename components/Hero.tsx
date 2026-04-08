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
              className="inline-flex w-fit items-center justify-center rounded-md border border-accent bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent/10 focus-visible:bg-accent/10"
            >
              {resumeLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
