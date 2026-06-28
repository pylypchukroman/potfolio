# potfolio

Personal portfolio site for [Roman Pylypchuk](https://romanpylypchuk.dev). Single-page layout inspired by [Brittany Chiang's v4 portfolio](https://v4.brittanychiang.com/), built with Next.js App Router.

## Features

- **Hero, About, Experience, Projects, Contact** — sticky sidebar navigation on desktop, mobile menu on smaller screens
- **Scroll-driven motion** — section reveals and hero entrance via Framer Motion
- **Loading screen** — CSS comet animation on every page load (desktop: 20×20px lead square; mobile/tablet: 12×12px). Skipped when `prefers-reduced-motion` is enabled
- **Content-driven** — copy, projects, experience, and links live in one file for easy edits
- **Vercel Analytics** — optional page analytics in production

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack in dev)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

## Customize the site

Most site content is in [`lib/content.ts`](lib/content.ts):

- `site` — title, description, URL, Open Graph image
- `about` — name, bio, photo, skills
- `hero`, `contact`, `socialLinks`
- `experiences`, `projects`, `moreProjects`

Replace assets under `public/` (e.g. `photo.webp`, `resume.pdf`, project screenshots).

Loading animation styles: [`app/globals.css`](app/globals.css) (`.loading-screen`, `.loading-fly-square`). Logic: [`components/InitialLoadGate.tsx`](components/InitialLoadGate.tsx), [`components/LoadingScreen.tsx`](components/LoadingScreen.tsx).

## Project structure

```
app/              App Router layout, global styles, home page
components/       UI sections and loading screen
lib/content.ts    Portfolio copy and data
public/           Static assets (images, resume, OG image)
```

## Deploy

Deploy on [Vercel](https://vercel.com) or any platform that supports Next.js. Set `site.url` in `lib/content.ts` to your production domain for correct metadata.
