import { Reveal } from "@/components/motion/Reveal";

type ContactProps = {
  intro: readonly string[];
  email: string;
  emailCta: string;
};

function mailtoHref(address: string) {
  const to = address.trim();
  const subject = encodeURIComponent("Hello");
  return to.length > 0
    ? `mailto:${to}?subject=${subject}`
    : `mailto:?subject=${subject}`;
}

export function Contact({ intro, email, emailCta }: ContactProps) {
  return (
    <div className="max-w-xl space-y-10">
      <div className="space-y-4">
        {intro.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <p className="text-base leading-relaxed text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={intro.length * 0.05}>
        <div className="flex flex-col">
          <a
            href={mailtoHref(email)}
            className="inline-flex w-fit items-center justify-center rounded-md border border-accent bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-accent outline-none transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_12px_28px_-8px_rgba(13,148,136,0.45)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:active:scale-100"
          >
            {emailCta}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
