import Image from "next/image";
import { PhotoReveal, Reveal } from "@/components/motion/Reveal";
import type { SkillGroup } from "@/lib/content";

type AboutProps = {
  imageSrc: string;
  imageAlt: string;
  bio: readonly string[];
  location: string;
  skillGroups: readonly SkillGroup[];
};

function SkillGroups({ groups }: { groups: readonly SkillGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div>
      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
        Tech Stack
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent">
              {group.label}
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
              {group.items.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <div className="group relative h-48 w-48 overflow-hidden rounded-2xl border border-border bg-card sm:h-56 sm:w-56">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="224px"
            className="object-cover grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:grayscale-0 motion-reduce:transition-none"
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
            <p className="font-mono text-sm text-muted">{location}</p>
          </Reveal>
        </div>
        {skillGroups.length > 0 ? (
          <Reveal delay={(bio.length + 1) * 0.05}>
            <SkillGroups groups={skillGroups} />
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
