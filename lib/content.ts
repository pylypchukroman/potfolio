/**
 * Portfolio copy and links — edit this file to personalize the site.
 * Photo: replace public/photo.jpg with your own image (same path, or update about.imageSrc).
 */

export type SocialNetwork = "linkedin" | "facebook" | "leetcode" | "github";

export type SocialLink = {
  network: SocialNetwork;
  /** Shown to screen readers and tooltips */
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
};

/** String segment or inline link (renders accent-colored inside the project panel) */
export type ProjectDescriptionPart =
  | string
  | { link: string; href: string };

export type Project = {
  title: string;
  /** Screenshot under public/ */
  imageSrc: string;
  imageAlt: string;
  /** Plain fallback if descriptionRich is omitted */
  description: string;
  /** Optional mix of text and links for the overlapping panel */
  descriptionRich?: ProjectDescriptionPart[];
  /** Small label above the title (e.g. Featured project) */
  eyebrow?: string;
  href?: string;
  repo?: string;
  tech: string[];
  year?: string;
};

/** Smaller projects shown in the scrolling ticker under Projects */
export type MiniProject = {
  id: string;
  title: string;
  description: string;
  href?: string;
  repo?: string;
};

export type Experience = {
  /** Stable id for tabs (e.g. acme) */
  id: string;
  company: string;
  title: string;
  range: string;
  /** Optional short blurb above the bullets */
  summary?: string;
  bullets: string[];
};

/** Skill category tabs under About (same interaction pattern as Work experience) */
export type SkillGroup = {
  id: string;
  /** Tab label, e.g. Languages */
  label: string;
  items: readonly string[];
};

export const site = {
  title: "Alex Morgan — Portfolio",
  description:
    "Developer portfolio: projects, experience, and background. Built with Next.js.",
  url: "https://example.com",
} as const;

export const navigation: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/** Hero — headline and general intro above the About section */
export const hero = {
  eyebrow: "Hello, I'm",
  /** First part of the main headline (plain) */
  titleLead: "I build thoughtful software",
  /** Accent part of the headline (gradient) */
  titleAccent: "with a great mix of craft and speed.",
  /** Short paragraphs of general information */
  intro: [
    "I care about clear interfaces, solid engineering, and shipping work that holds up over time—whether that’s a dashboard, an API, or something in between.",
    "This site is a snapshot of who I am, what I’ve built, and the stack I like to work in.",
  ],
  /** PDF in public/ — replace public/resume.pdf with your CV */
  resumeHref: "/resume.pdf",
  resumeLabel: "Résumé",
} as const;

/** Number + title + horizontal rule (Brittany Chiang–style section header) */
export const experienceSection = {
  number: "02",
  title: "Where I've worked",
} as const;

export const projectsSection = {
  number: "03",
  title: "Some things I've built",
} as const;

export const contactSection = {
  number: "04",
  title: "Contact",
} as const;

/**
 * Contact block — `email` is only used for the mailto link (not shown on the page).
 * Put your address here so “Say hello” opens the user’s mail app with you in the To field.
 */
export const contact = {
  intro: [
    "I'm open to interesting roles, collaborations, and a good conversation about product or engineering.",
    "The fastest way to reach me is email—I usually reply within a couple of days.",
  ],
  email: "",
  emailCta: "Say hello",
} as const;

export const about = {
  name: "Alex Morgan",
  headline: "Software developer",
  /** Path under public/ — swap the file to use your photo */
  imageSrc: "/photo.jpg",
  imageAlt: "Portrait of Alex Morgan",
  bio: [
    "I build thoughtful, minimal web experiences with a focus on clarity and performance. I enjoy turning complex problems into simple interfaces.",
    "Previously I’ve shipped product features end-to-end, collaborated with design, and cared about accessibility and maintainability.",
    "Outside of work I contribute to small open-source tools and write short technical notes.",
  ],
  location: "San Francisco, CA",
  /** Grouped skills — tabs on top, bullet list below (edit labels and items) */
  skillGroups: [
    {
      id: "languages",
      label: "Languages",
      items: ["TypeScript", "JavaScript", "Python"],
    },
    {
      id: "frameworks",
      label: "Frameworks",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      id: "backend",
      label: "Backend",
      items: ["Node.js"],
    },
    {
      id: "data",
      label: "Data",
      items: ["PostgreSQL", "Redis"],
    },
    {
      id: "tools",
      label: "Tools",
      items: ["Docker", "Git", "Figma"],
    },
  ],
} as const;

/** Work history — tabs across the top, details below (edit for your roles) */
export const experiences: Experience[] = [
  {
    id: "northwind",
    company: "Northwind Labs",
    title: "Senior Software Engineer",
    range: "Jan 2023 — Present",
    summary:
      "Leading delivery for customer-facing analytics and internal platform tools.",
    bullets: [
      "Owned the roadmap for a real-time metrics stack used by 40+ teams; cut p95 query time by roughly 35%.",
      "Mentored three engineers and ran weekly design reviews on API contracts and accessibility.",
      "Partnered with design to ship a unified component library in React and Storybook.",
    ],
  },
  {
    id: "acme",
    company: "Acme Product Co.",
    title: "Software Engineer",
    range: "Jun 2020 — Dec 2022",
    summary:
      "Full-stack work on billing, subscriptions, and the merchant dashboard.",
    bullets: [
      "Implemented Stripe-based invoicing with proration, credits, and idempotent webhooks.",
      "Built admin tooling in Next.js and PostgreSQL; added audit trails for sensitive actions.",
      "Improved CI with parallelized tests and preview deploys on every PR.",
    ],
  },
  {
    id: "startup",
    company: "Brightside Studio",
    title: "Junior Developer",
    range: "Aug 2018 — May 2020",
    summary:
      "Early hire shipping marketing sites and light product features for clients.",
    bullets: [
      "Developed responsive landing pages and CMS-driven blogs for a handful of SaaS clients.",
      "Automated asset pipelines and Lighthouse checks in the deployment workflow.",
      "Supported production incidents and on-call rotation for hosted client properties.",
    ],
  },
];

/** Bottom-left icon dock — set your real profile URLs */
export const socialLinks: SocialLink[] = [
  {
    network: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yourprofile",
  },
  {
    network: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/yourprofile",
  },
  {
    network: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/yourprofile",
  },
  {
    network: "github",
    label: "GitHub",
    href: "https://github.com/yourusername",
  },
];

export const projects: Project[] = [
  {
    eyebrow: "Featured project",
    title: "Atlas Dashboard",
    imageSrc: "/project-atlas.jpg",
    imageAlt: "Atlas Dashboard charts and analytics UI",
    description:
      "Operational dashboard for monitoring jobs and alerts with real-time updates and exportable reports.",
    descriptionRich: [
      "A production-ready ",
      { link: "operations hub", href: "https://example.com" },
      " for teams who need live visibility into jobs, alerts, and exports—with role-aware views, saved filters, and ",
      { link: "CSV reporting", href: "https://example.com" },
      " when leadership needs the numbers fast.",
    ],
    href: "https://example.com",
    repo: "https://github.com",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2025",
  },
  {
    eyebrow: "Featured project",
    title: "River API",
    imageSrc: "/project-river.jpg",
    imageAlt: "Code on a laptop screen",
    description:
      "REST and webhook API for event ingestion with idempotency, retries, and observability.",
    descriptionRich: [
      "Event ingestion API with idempotent writes, automatic retries, and ",
      { link: "OpenTelemetry", href: "https://opentelemetry.io" },
      " tracing—built for high throughput without losing a single message.",
    ],
    href: "https://example.com",
    repo: "https://github.com",
    tech: ["Node.js", "Redis", "OpenTelemetry"],
    year: "2024",
  },
  {
    eyebrow: "Featured project",
    title: "Compass Mobile",
    imageSrc: "/project-compass.jpg",
    imageAlt: "Mobile app on a phone",
    description:
      "Cross-platform field companion with offline-first sync and map overlays.",
    descriptionRich: [
      "Offline-first ",
      { link: "React Native", href: "https://reactnative.dev" },
      " app for crews in low-connectivity areas—map overlays, queued sync, and SQLite-backed drafts until you are back online.",
    ],
    href: "https://example.com",
    repo: "https://github.com",
    tech: ["React Native", "SQLite", "Maps"],
    year: "2024",
  },
];

/**
 * Extra projects under Projects — shows as an infinite scrolling list of names.
 * Hover/focus a name to preview details + links.
 */
export const moreProjects: MiniProject[] = [
  {
    id: "lintkit",
    title: "LintKit",
    description:
      "Small CLI that applies opinionated ESLint/Prettier defaults and keeps teams consistent across repos.",
    repo: "https://github.com",
  },
  {
    id: "notes",
    title: "Notes Sync",
    description:
      "Minimal note app with offline-first sync and conflict resolution for spotty networks.",
    href: "https://example.com",
  },
  {
    id: "image-pipe",
    title: "Image Pipeline",
    description:
      "Build-time image optimization pipeline with responsive sizing and cache-friendly fingerprints.",
  },
  {
    id: "cacheview",
    title: "CacheView",
    description:
      "Tiny web UI for inspecting Redis keys, TTLs, and hit rates while debugging caching behavior.",
    href: "https://example.com",
    repo: "https://github.com",
  },
  {
    id: "formsprint",
    title: "FormSprint",
    description:
      "Accessible form components + validation helpers with great defaults and minimal bundle cost.",
    repo: "https://github.com",
  },
  {
    id: "statuspulse",
    title: "StatusPulse",
    description:
      "Simple incident/status page with RSS updates, uptime graphs, and a lightweight admin workflow.",
    href: "https://example.com",
  },
  {
    id: "snipshare",
    title: "SnipShare",
    description:
      "Pastebin-style snippet sharing with expiring links, syntax highlighting, and private notes.",
    repo: "https://github.com",
  },
  {
    id: "meetmint",
    title: "MeetMint",
    description:
      "Meeting notes helper that turns action items into tasks and exports to Markdown.",
  },
] as const;
