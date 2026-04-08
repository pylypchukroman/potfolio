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
        <div className="flex flex-col border-l-2 border-accent/40 pl-5">
          <a
            href={mailtoHref(email)}
            className="inline-flex w-fit items-center justify-center rounded-md border border-accent bg-transparent px-4 py-2.5 font-mono text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent/10 focus-visible:bg-accent/10"
          >
            {emailCta}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
