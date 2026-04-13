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

export function About({
  imageSrc,
  imageAlt,
  bio,
  location,
  skillGroups,
}: AboutProps) {
  const skills = skillGroups.flatMap((group) => group.items);
  const skillColumns = [[], [], []] as string[][];

  skills.forEach((skill, index) => {
    skillColumns[index % 3].push(skill);
  });

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
      <PhotoReveal className="shrink-0">
        <div className="group relative h-48 w-48 overflow-hidden rounded-2xl border border-border bg-card sm:h-56 sm:w-56">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="224px"
            className="object-cover transition-[filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grayscale lg:group-hover:grayscale-0 lg:group-focus-within:grayscale-0 motion-reduce:transition-none"
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
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skillColumns.map((column, columnIndex) => (
                  <ul
                    key={columnIndex}
                    className="list-disc space-y-2 pl-5 text-sm text-muted"
                  >
                    {column.map((skill) => (
                      <li key={`${columnIndex}-${skill}`} className="break-words">
                        {skill}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
