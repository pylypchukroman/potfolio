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
  url: string;
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
  title: "Roman Pylypchuk — Portfolio",
  description:
    "Full-stack developer portfolio: projects, experience, and technical background.",
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
  intro: [
    "I'm a full-stack developer based in Sydney who gets a kick out of building things that work. There's something satisfying about taking a rough idea, working through the hard parts, and ending up with a product that actually does what it's supposed to.",
    "I mostly work in the JavaScript ecosystem: React and Next.js on the front end, Node.js on the back end.",
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
    "I'm always open to new opportunities — whether it's a full-stack position, frontend or backend work, or a freelance collaboration. ",
    "Feel free to reach out if you have a project in mind or just want to connect. I'll get back to you as soon as I can!",
  ],
  email: "romanpylypchuk@gmail.com",
  emailCta: "Say hello",
} as const;

export const about = {
  name: "Roman Pylypchuk",
  headline: "Full-Stack Developer",
  /** Path under public/ — swap the file to use your photo */
  imageSrc: "/photo.jpg",
  imageAlt: "Portrait of Roman Pylypchuk",
  bio: [
    "Hello! My name is Roman, and I enjoy building things that work on the internet. My interest in web development started in 2022 when I completed a bootcamp and learned that I really liked solving problems and shipping things that actually matter.",
    "Fast-forward to today, and I've had the privilege of working at a product company, a design studio, and launching solo freelance projects. I've built features for products with real users, worked in small teams on complex problems, and learned what it takes to ship something people care about. Right now I'm studying at TAFE NSW while taking on freelance work.",
    "My main focus these days is building full-stack web products with clean code and attention to detail. I'm particularly drawn to real-time systems and projects that involve integrating AI APIs. I work mostly with React, Next.js, Node.js, and MongoDB/PostgreSQL.",
  ],
  location: "Sydney, NSW",
  /** Grouped skills — tabs on top, bullet list below (edit labels and items) */
  skillGroups: [
    {
      id: "languages",
      label: "Languages",
      items: ["JavaScript", "TypeScript", "HTML", "CSS", "Node.js"],
    },
    {
      id: "frameworks",
      label: "Frameworks",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      id: "backend",
      label: "Backend",
      items: ["REST APIs", "WebSocket"],
    },
    {
      id: "data",
      label: "Data",
      items: ["MongoDB", "PostgreSQL"],
    },
    {
      id: "tools",
      label: "Tools",
      items: ["Git", "GitHub"],
    },
  ],
} as const;

/** Work history — tabs across the top, details below (edit for your roles) */
export const experiences: Experience[] = [
  {
    id: "freelance",
    company: "Freelance",
    url: "https://www.linkedin.com/in/roman-pylypchuk-dev/",
    title: "Back End Developer",
    range: "Mar 2025 — Present",
    summary:
      "Worked on freelance backend projects: building real-time data pipelines, designing APIs, and setting up automated notification systems. Handled everything from data modeling to deployment and production monitoring.",
    bullets: [
      "Built RESTful APIs and real-time WebSocket integrations for processing live data streams.",
      "Implemented backend data flows: fetching, processing, and storing live data in MongoDB.",
      "Set up automated Slack notifications that improved response times for end users.",
      "Integrated third-party APIs and services, including OpenAI and Gemini, into production workflows.",
    ],
  },
  {
    id: "control",
    company: "Control",
    url: "https://cntrl.site/",
    title: "Full Stack Developer",
    range: "Feb 2022 — Jun 2023",
    summary:
      "Part of a small dev team building a web-based design tool with an active and growing user base. Worked across the full stack: shipping new features, fixing bugs, writing tests, and keeping the codebase healthy.",
    bullets: [
      "Built interactive UI features including object scaling and scroll-based animations.",
      "Added media embedding support for third-party platforms like YouTube and Vimeo.",
      "Wrote unit tests with Jest to catch regressions and maintain code quality.",
      "Updated multiple npm packages and resolved type and compatibility issues.",
      "Collaborated closely with designers to ensure pixel-perfect implementation across devices.",
    ],
  },
  {
    id: "mom-design",
    company: "MOM Design",
    url: "https://momdesign.nyc/",
    title: "Front End Developer",
    range: "Jan 2023 — Jun 2023",
    summary:
      "Worked at a design agency turning Figma and Adobe XD mockups into fully responsive websites. Communicated directly with clients and delivered under tight deadlines.",
    bullets: [
      "Built pixel-accurate, responsive pages using React and Tailwind CSS.",
      "Gathered client feedback and shipped revisions quickly to meet project timelines.",
      "Wrote clean, modular code to make future updates and maintenance straightforward.",
      "Ensured consistent design implementation across desktop and mobile devices."
    ],
  },
];

/** Bottom-left icon dock — set your real profile URLs */
export const socialLinks: SocialLink[] = [
  {
    network: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com",
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
    href: "https://github.com",
  },
];

export const projects: Project[] = [
  {
    eyebrow: "Featured project",
    title: "Session-Based Balance Tracker",
    imageSrc: "/project-atlas.jpg",
    imageAlt: "Session-Based Balance Tracker interface",
    description:
      "Full-stack app for tracking cash and tournament session entries with balance calculations and secure authentication.",
    descriptionRich: [
      "Full-stack application with JWT auth using HttpOnly refresh tokens and secure token rotation. Includes Axios interceptors for automatic access token refresh and ",
      { link: "React Query", href: "https://tanstack.com/query/latest" },
      " for efficient server-state synchronization.",
    ],
    tech: ["React", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS", "JWT"],
    year: "2025",
  },
  {
    eyebrow: "Featured project",
    title: "Polymarket Statistic Collector",
    imageSrc: "/project-river.jpg",
    imageAlt: "Polymarket statistics collector backend",
    description:
      "Node.js service that collects and stores prediction market data with live updates and event-based processing.",
    descriptionRich: [
      "Built for personal research with live data scripts, WebSocket event tracking, and a MongoDB schema designed for efficient retrieval and analysis.",
    ],
    tech: ["Node.js", "TypeScript", "WebSocket", "Axios", "MongoDB", "Slack API"],
    year: "2025",
  },
  {
    eyebrow: "Featured project",
    title: "Smart Hashtag Generator",
    imageSrc: "/project-compass.jpg",
    imageAlt: "Smart Hashtag Generator web app",
    description:
      "Responsive web app that generates social hashtags using OpenAI API and improves post workflow speed.",
    descriptionRich: [
      "Generates configurable hashtag sets from user prompts with one-click clipboard copy and fully responsive UI for desktop and mobile usage.",
    ],
    tech: ["React", "SASS", "OpenAI API"],
    year: "2024",
  },
];

/**
 * Extra projects under Projects — shows as an infinite scrolling list of names.
 * Hover/focus a name to preview details + links.
 */
export const moreProjects: MiniProject[] = [
  {
    id: "youtube-vimeo-embed",
    title: "Editor Embed Support",
    description:
      "Added YouTube and Vimeo embedding support in a production web design editor used by 1,000+ active users.",
    repo: "https://github.com/yourprofile/youtube-vimeo-embed",
  },
  {
    id: "object-scaling-animation",
    title: "Scaling & Scroll Animations",
    description:
      "Built object scaling and scroll-based animation features in a collaborative design tool.",
    repo: "https://github.com/yourprofile/object-scaling-animation",
  },
  {
    id: "websocket-monitoring-tool",
    title: "Real-Time Market Monitor",
    description:
      "Sole-built backend utility tracking 20 simultaneous live events and pushing Slack alerts on market changes.",
    repo: "https://github.com/yourprofile/websocket-monitoring-tool",
  },
  {
    id: "secure-auth-flow",
    title: "Secure Session Auth Flow",
    description:
      "Implemented JWT + HttpOnly refresh token rotation with Axios interceptors for seamless authenticated UX.",
    repo: "https://github.com/yourprofile/secure-auth-flow",
  },
  {
    id: "ai-api-integration",
    title: "AI API Integrations",
    description:
      "Integrated OpenAI and Gemini APIs into projects with prompt handling, response parsing, and error management.",
    repo: "https://github.com/yourprofile/ai-api-integration",
  },
  {
    id: "responsive-client-sites",
    title: "Responsive Client Websites",
    description:
      "Delivered multiple responsive websites from Figma/Adobe XD mockups while handling direct client feedback.",
    repo: "https://github.com/yourprofile/responsive-client-sites",
  },
  {
    id: "testing-regression-guard",
    title: "Jest Regression Coverage",
    description:
      "Added Jest tests for core editor features to catch regressions early in a live product workflow.",
    repo: "https://github.com/yourprofile/testing-regression-guard",
  },
  {
    id: "dependency-modernization",
    title: "Dependency Upgrades",
    description:
      "Upgraded npm dependencies and resolved type/compatibility issues in an actively used product codebase.",
    repo: "https://github.com/yourprofile/dependency-modernization",
  },
] as const;
