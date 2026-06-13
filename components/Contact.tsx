import { Reveal } from "@/components/motion/Reveal";
import { outlineButtonClassName } from "@/lib/styles";

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
          <a href={mailtoHref(email)} className={outlineButtonClassName}>
            {emailCta}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
