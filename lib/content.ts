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

export type Project = {
  title: string;
  /** Screenshot under public/ */
  imageSrc: string;
  imageAlt: string;
  description: string;
  /** Small label above the title (e.g. Featured project) */
  eyebrow?: string;
  href?: string;
  /** One repo → plain icon. Two → first is FE, second is BE. */
  repos?: string[];
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
  tech?: string[];
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
  imageSrc: "/photo.webp",
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
    imageSrc: "/balance_tracker.webp",
    imageAlt: "Session-Based Balance Tracker interface",
    description:
      "A full-stack app for tracking financial sessions with real-time balance calculations. Built with secure JWT authentication and token rotation, plus React Query for smooth, synchronized server state.",
    repos: ["https://github.com/pylypchukroman/poker_session_counter", "https://github.com/pylypchukroman/poker_session_counter_server"],
    href: "https://poker-session-counter.onrender.com/",
    tech: ["React", "Node.js", "TypeScript", "MongoDB", "Tailwind CSS", "JWT"],
    year: "2025",
  },
  {
    eyebrow: "Featured project",
    title: "Polymarket Statistic Collector",
    imageSrc: "/project-river.webp",
    imageAlt: "Polymarket statistics collector backend",
    description:
      "A Node.js service that collects and stores real-time prediction market data, using WebSocket connections for live updates and an event-driven architecture for efficient processing.",
    repos: ["https://github.com/pylypchukroman/polymarket_stat_bot"],
    tech: ["Node.js", "TypeScript", "WebSocket", "MongoDB", "Slack API"],
    year: "2025",
  },
  {
    eyebrow: "Featured project",
    title: "Smart Hashtag Generator",
    imageSrc: "/generator.webp",
    imageAlt: "Smart Hashtag Generator web app",
    description:
      "A responsive web app that generates relevant social media hashtags using the OpenAI API. Features configurable hashtag counts and one-click copying to streamline content workflows.",
    repos: ["https://github.com/pylypchukroman/smart_hashtag_generator"],
    href: "https://smart-hashtag-generator.onrender.com/",
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
    id: "car-rental",
    title: "Car Rental",
    description:
      "A React app for browsing and renting cars, with filtering by brand, price, and mileage. Users can save favorites with persisted state using Redux, plus lazy-loaded images for smooth performance.",
    repo: "https://github.com/pylypchukroman/car-rent",
    href: "https://pylypchukroman.github.io/car-rent/",
    tech: ["React", "React Router", "Axios", "Redux Persist"],
  },
  {
    id: "kitty-cat",
    title: "Kitty Cat",
    description:
      "Explore cat breeds, traits, and photos using The Cat API. Features interactive image galleries built with Swiper and smooth data fetching.",
    repo: "https://github.com/pylypchukroman/kitty-cat",
    href: "https://pylypchukroman.github.io/kitty-cat/",
    tech: ["React", "SCSS", "Axios", "Swiper"],
  },
  {
    id: "digiency",
    title: "Digiency",
    description:
      "A fully responsive landing page for a digital agency, built to sharpen my Tailwind CSS skills. Features smooth scroll animations powered by wow.js and Animate.css.\n",
    repo: "https://github.com/pylypchukroman/digiency",
    href: "https://pylypchukroman.github.io/digiency/",
    tech: ["Tailwind", "wow.js", "Animate.css"],
  },
] as const;
