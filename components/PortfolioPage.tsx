"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { ProjectList } from "@/components/ProjectList";
import { Section } from "@/components/Section";
import { Sidebar } from "@/components/Sidebar";
import { SocialDock } from "@/components/SocialDock";
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
  projects,
  projectsSection,
  socialLinks,
} from "@/lib/content";

export function PortfolioPage() {
  return (
    <div className="min-h-full">
      <SocialDock links={socialLinks} />
      <div className="mx-auto max-w-6xl py-16 pb-36 pl-4 pr-6 max-sm:pb-44 sm:pl-5 lg:py-24 lg:pb-24 lg:pl-8 lg:pr-12">
        <StaggerContainer className="grid grid-cols-1 gap-16 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-20 lg:gap-24">
          <StaggerItem>
            <aside className="md:sticky md:top-28 md:self-start">
              <Sidebar
                name={about.name}
                headline={about.headline}
                navigation={navigation}
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
                >
                  <ProjectList projects={projects} />
                </Section>

                <Section
                  id="contact"
                  title={contactSection.title}
                  index={contactSection.number}
                  className="flex min-h-[min(70dvh,36rem)] w-full flex-1 flex-col"
                >
                  <Contact
                    intro={contact.intro}
                    email={contact.email}
                    emailCta={contact.emailCta}
                  />
                </Section>

                <Reveal>
                  <p className="font-mono text-xs text-muted">
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
                  </p>
                </Reveal>
              </div>
            </main>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
}
