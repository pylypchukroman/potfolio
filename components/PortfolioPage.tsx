"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { MoreProjectsTicker } from "@/components/MoreProjectsTicker";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { WorkExperience } from "@/components/WorkExperience";
import { GitHubIcon } from "@/components/icons";
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
      . Built with Next.js.{" "}
      <a
        href="https://github.com/pylypchukroman/potfolio"
        aria-label="View project source on GitHub"
        className="inline-flex align-middle text-muted transition-colors hover:text-accent focus-visible:text-accent"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon className="h-3.5 w-3.5" strokeWidth={1.25} />
      </a>
    </>
  );

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-5 lg:px-8 lg:pt-24 lg:pb-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-24">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Sidebar
              name={about.name}
              headline={about.headline}
              navigation={navigation}
              socialLinks={socialLinks}
              resumeHref={hero.resumeHref}
              resumeLabel={hero.resumeLabel}
            />
          </aside>
          <main
            id="content"
            tabIndex={-1}
            className="min-w-0 pt-14 outline-none lg:pt-0"
          >
            <div className="flex flex-col">
              <Hero
                name={about.name}
                greeting={hero.greeting}
                tagline={hero.tagline}
                intro={hero.intro}
                resumeHref={hero.resumeHref}
                resumeLabel={hero.resumeLabel}
              />

              <div className="sections-stack">
                <Section id="about" title="About" index="01">
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
                  centerContent
                  className="flex w-full flex-col"
                  footer={
                    <p className="w-full text-left font-mono text-xs text-muted">
                      {credit}
                    </p>
                  }
                >
                  <Contact
                    intro={contact.intro}
                    email={contact.email}
                    emailCta={contact.emailCta}
                  />
                </Section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
