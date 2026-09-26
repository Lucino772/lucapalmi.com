# Redesign brief: lucapalmi.com

Shared brief for every redesign variant. Read it fully before designing.

## Who Luca is

Senior Software Engineer. Started on the full-stack and cloud side, moved into
backend systems, infrastructure, internal platforms and software architecture.
Recently: AI product infrastructure (agent harnesses, developer tooling,
desktop applications, systems running across local and cloud environments).

He wants to be known for **building well-designed software systems end to
end**: backend and distributed systems, developer tools, desktop apps,
infrastructure, and the architecture connecting them. He enjoys problems mixing
product thinking, systems design and developer experience.

He does **not** want to be framed as "a Python engineer" or "a frontend
engineer". No single language or technology should dominate the identity.

## What the site is for

1. **Primary: a home for his writing.** Two kinds:
    - **Essays**: long, deep pieces that showcase system-design competence.
    - **Notes**: short, frequent, "today I tried this, here is what I think".
2. **Secondary: a calling card** linked from GitHub, LinkedIn, a CV.
3. Always present but quiet: hiring and freelance interest. No hard sell.

Audience is broad and technical. Topics range from very technical deep-dives
to high-level opinion (AI workflows, etc.). Do not tunnel into one topic.

The site must look good with **few items** (3 essays, a handful of notes, 4
featured projects) and still scale to dozens of notes.

## Content (already in the repo, use it, do not invent more)

- `src/content/about.ts`: name, role, **headline**, focus areas, "I tend to"
  list, hobbies, links. The headline is canonical and must be used verbatim:
    > I build well-designed software systems, end to end: from the
    > infrastructure up to the tools people use.
- `src/content/projects.json`: 4 featured projects (orka, envelop, qtcompose,
  stillhead) with type/status/year/tags, and 8 listed ones with one-liners.
- `src/content/articles/*.mdx`: 3 essays and 3 **draft placeholder notes**
  (`kind: "note"`, `draft: true`). Drafts appear in `pnpm dev` only and are
  filtered from production builds. Notes have no cover image. Essays may.
- `src/lib/cms.ts`: `getArticles()` / `getArticle()`, metadata has `kind`,
  `draft`, optional `cover`.
- `public/images/portrait-line.svg`: SVG trace of the hand-drawn line
  illustration of Luca at his desk (29 filled paths, `fill="currentColor"`,
  viewBox `0 0 2000 2675`). The original raster is
  `public/images/desktop-dimmed.webp`. Luca likes this drawing; the current
  home page uses it but "feels a bit simple". Making it more alive is welcome.
- `src/components/theme.tsx`: `themeScript` (no-flash, already in layout),
  `useTheme()`, and an unstyled `ThemeToggle`. Dark mode = `.dark` class on
  `<html>`; Tailwind `dark:` variant is already wired.

## Personal details

- Show: GitHub and LinkedIn links.
- Hobbies: show them, but quietly. They add personality, they must not compete
  with the professional side. Technical hobbies (hardware, Raspberry Pi, IoT,
  LoRaWAN, networking, game servers, Minecraft modding, LEGO) say something
  real about how he thinks: understanding how things work, turning ideas into
  working systems. Personal: cooking, travelling, improving things around him.
- Never show: photo, location/country, current employer, CV download.

## Hard constraints

- **Keep**: all routes (`/`, `/projects`, `/articles`, `/articles/[slug]`,
  404), `metadata`/SEO/Open Graph, JSON-LD, PostHog, the MDX pipeline,
  existing `/articles/*` URLs. The section is **labelled "Writing"** in the UI
  but stays at `/articles`.
- **Keep Literata for long-form article prose** (Luca likes it). Everything
  else about typography is open; fonts must be self-hosted via
  `next/font/local` (woff2 in `src/fonts/`). You may add new font files if you
  can obtain them as woff2 (e.g. from Google Fonts / Fontsource via curl);
  prefer the fonts already present when they fit.
- **Light and dark mode both work** on every page. Pick the default that suits
  the variant's direction, but the other mode must be designed, not an
  afterthought. The OS preference decides unless the user toggles.
- **Motion**: native scrolling only, never hijack or smooth-scroll the page,
  no scroll-snapping sections, no pinning. Content is never hidden waiting on
  JS. Everything respects `prefers-reduced-motion`. Nothing over ~600ms
  (a one-off drawing animation on the home page may run longer if it never
  blocks reading). Allowed: load-in reveals, hover/focus micro-interactions,
  in-view fades, CSS View Transitions between pages.
- **Lightweight**: static site, no animation libraries (no Motion, GSAP,
  Three.js). CSS, SVG and minimal client JS. `lucide-react` is available.
  Do not add new runtime dependencies.
- **Accessibility**: keyboard reachable, visible focus, WCAG AA contrast in
  both modes, alt text, semantic landmarks, icon-only links labelled.
- Tone: confident, precise, human. Not salesy, not template-y, no emoji
  buttons, no "AI slop" (purple gradients, glassmorphism cards, generic hero
  with two CTA buttons).

## Pages in scope

- `/`: home. Hero with the headline, a sense of who he is, latest writing
  (essays + notes), selected projects, quiet hobbies block, links.
- `/articles`: "Writing". One feed of essays and notes; the two kinds must be
  visually distinct (notes compact, essays prominent). Filter or grouping is
  optional.
- `/articles/[slug]`: both an **essay** layout (may have cover, AI-generated
  cover prompt disclosure via `AiImageDescription`, reading time, tags) and a
  **note** layout (no cover, compact header). Code blocks (highlight.js),
  callouts, collapsibles and the `Technologies` component must look right.
- `/projects`: featured (4) and listed (8). Status (`early`/`active`) and year
  are available.
- 404, desktop nav, mobile nav, footer, theme toggle.

## Decisions after review (these override anything above)

- **Article pages**: one centred column, no side columns or margin content.
  Long articles get a section rail (see `useArticleSections`).
- **No essay/note distinction in the UI.** `kind` stays in the content data
  but is not displayed or used for layout anywhere: one article template,
  no kind labels, no separate notes columns or sizes.
- **Topics, not technologies.** Articles carry `topics` (see
  `src/content/topics.ts`). The Writing page filters by topic only. Tags
  (technologies) remain descriptive on article pages and are not filters.
- **Writing page is a timeline**: chronological, newest first, grouped by
  year. Every entry shows a thumbnail; articles without a cover get a
  generated fallback thumbnail in the variant's visual language.
