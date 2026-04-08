import Image from "next/image";
import { PhotoReveal, Reveal } from "@/components/motion/Reveal";
import { SkillTabs } from "@/components/SkillTabs";
import type { SkillGroup } from "@/lib/content";

type AboutProps = {
  imageSrc: string;
  imageAlt: string;
  bio: readonly string[];
  location: string;
  skillGroups: readonly SkillGroup[];
};

export function About({
  imageSrc,
  imageAlt,
  bio,
  location,
  skillGroups,
}: AboutProps) {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
      <PhotoReveal className="shrink-0">
        <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-border bg-card sm:h-44 sm:w-44">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="176px"
            className="object-cover"
            priority
          />
        </div>
      </PhotoReveal>
      <div className="min-w-0 flex-1 space-y-6">
        <div className="space-y-4">
          {bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-base leading-relaxed text-muted">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal delay={bio.length * 0.05}>
            <p className="font-mono text-sm text-foreground/80">{location}</p>
          </Reveal>
        </div>
        {skillGroups.length > 0 ? (
          <Reveal delay={(bio.length + 1) * 0.05}>
            <div>
              <h3 className="font-mono text-sm font-medium uppercase tracking-widest text-muted">
                Skills
              </h3>
              <div className="mt-4">
                <SkillTabs groups={skillGroups} />
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
