"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MoreProjectsTicker } from "@/components/MoreProjectsTicker";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { WorkExperience } from "@/components/WorkExperience";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import {
  about,
  contact,
  contactSection,
  experiences,
  experienceSection,
  navigation,
  hero,
  moreProjects,
  projects,
  projectsSection,
  socialLinks,
} from "@/lib/content";

export function PortfolioPage() {
  const credit = (
    <>
      Layout inspired by{" "}
      <a
        href="https://v4.brittanychiang.com/"
        className="text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent focus-visible:text-accent"
        target="_blank"
        rel="noopener noreferrer"
      >
        Brittany Chiang
      </a>
      . Built with Next.js.
    </>
  );

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-6xl py-16 pb-36 pl-4 pr-6 max-sm:pb-44 sm:pl-5 lg:py-24 lg:pb-24 lg:pl-8 lg:pr-12">
        <StaggerContainer className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-24">
          <StaggerItem>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Sidebar
                name={about.name}
                headline={about.headline}
                navigation={navigation}
                socialLinks={socialLinks}
              />
            </aside>
          </StaggerItem>
          <StaggerItem>
            <main
              id="content"
              tabIndex={-1}
              className="min-w-0 scroll-mt-28 outline-none"
            >
              <div className="flex flex-col gap-20 lg:gap-24">
                <Reveal className="flex min-h-[100dvh] w-full flex-col">
                  <Hero
                    eyebrow={hero.eyebrow}
                    titleLead={hero.titleLead}
                    titleAccent={hero.titleAccent}
                    intro={hero.intro}
                    resumeHref={hero.resumeHref}
                    resumeLabel={hero.resumeLabel}
                  />
                </Reveal>

                <Section
                  id="about"
                  title="About"
                  className="flex min-h-[100dvh] w-full flex-1 flex-col"
                >
                  <About
                    imageSrc={about.imageSrc}
                    imageAlt={about.imageAlt}
                    bio={about.bio}
                    location={about.location}
                    skillGroups={about.skillGroups}
                  />
                </Section>

                <Section
                  id="experience"
                  title={experienceSection.title}
                  index={experienceSection.number}
                  className="flex min-h-[100dvh] w-full flex-1 flex-col"
                >
                  <WorkExperience experiences={experiences} />
                </Section>

                <Section
                  id="projects"
                  title={projectsSection.title}
                  index={projectsSection.number}
                  animateContent={false}
                >
                  <ProjectList projects={projects} />
                  <MoreProjectsTicker projects={moreProjects} />
                </Section>

                <Section
                  id="contact"
                  title={contactSection.title}
                  index={contactSection.number}
                  className="flex min-h-[min(70dvh,36rem)] w-full flex-1 flex-col"
                >
                  <div className="space-y-10">
                    <Contact
                      intro={contact.intro}
                      email={contact.email}
                      emailCta={contact.emailCta}
                    />
                    <p className="font-mono text-xs text-muted">{credit}</p>
                  </div>
                </Section>
              </div>
            </main>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
}
