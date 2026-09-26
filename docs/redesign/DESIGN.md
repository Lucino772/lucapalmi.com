# v1 · Workstation

A close evolution of today's site: dark, monospace, royal blue, the line
drawing of Luca at his desk. Same DNA, but set like a carefully configured
editor rather than a hacker-movie terminal. Calm surfaces, one accent, strict
columns, nothing blinking.

## Audit of the current site (what stays, what goes)

Keep:

- Dark-first identity, monospace UI, royal-blue accent.
- The line drawing. It is the most personal asset and the only image on the
  home page.
- The "I tend to" list: it is the most human piece of copy.

Fix:

- Light mode is broken (dark text on dark surfaces, white-only colours
  hard-coded everywhere).
- The bordered card stack (home hero, article grid, project grid) chops
  content into identical boxes and hides hierarchy.
- Emoji buttons ("See what I've built 🛠️") and the two-CTA hero.
- Two monospace families used interchangeably with no role.
- Article grid only works with covers; notes have no cover and would look
  broken.
- Hard-coded `#4169E1`, `#292936`, `text-white/75` sprinkled across files; no
  tokens.
- 404 links "Blog" to `/projects`; mobile nav is white in dark mode; icon
  links use `title` instead of an accessible name; no focus styles.

## Signature idea

**The site reads like a well-kept workstation.** Every section is addressed
by its path (`~/writing`, `~/projects`, `~/.hobbies`), content is set in
aligned columns like a good `ls -l` or `git log`, and the line drawing draws
itself once on the home page, then the laptop screen quietly lights up in the
accent blue. That glow is the only "effect" on the whole site.

## Colour tokens

One cool grey family, one accent. Semantic tokens live in `@theme` (light
values) and are overridden under `.dark`.

| Token          | Dark (default feel) | Light ("light editor") | Use                             |
| -------------- | ------------------- | ---------------------- | ------------------------------- |
| `bg`           | `#14161b`           | `#fbfbfc`              | page                            |
| `raised`       | `#1a1d23`           | `#f2f4f7`              | code, hover rows, menus         |
| `line`         | `#2a2e37`           | `#dfe3ea`              | hairlines, borders              |
| `fg`           | `#dde1e8`           | `#1b1f27`              | primary text (13.8 / 16.0 : 1)  |
| `muted`        | `#9aa1ae`           | `#555c69`              | secondary text (7.0 / 6.5 : 1)  |
| `faint`        | `#828996`           | `#636a78`              | column keys, dates (≥ 4.6 : 1)  |
| `accent`       | `#8ea8ff`           | `#2b50c8`              | links, active tab, essay marker |
| `accent-solid` | `#4169e1`           | `#4169e1`              | laptop glow, selection, focus   |

Syntax colours are a small, desaturated set (keyword, string, number,
comment, title, attr) defined per mode, so highlight.js works in both themes
without a third-party stylesheet.

## Type

- **Inconsolata** (variable, self-hosted): the whole UI. Narrow, calm, reads
  well at 15 to 16 px. Weights 400 / 500 / 600 / 700.
- **Cascadia Code** (self-hosted): code only (inline and blocks). The editor
  font is used where there is actual code, which gives the two monospaces
  distinct jobs.
- **Literata** (self-hosted, mandatory): article prose and the essay dek.

Scale (px, 1.25-ish, deliberately tight): 13 · 14 · 16 · 18 · 22 · 28 · 40.
Prose: Literata 18 px / 1.75 on desktop, 17 px on mobile, measure ≤ 68ch.
Tabular numerals everywhere dates and years line up.

## Spacing and grid

- 4 px base; section rhythm 64 / 96 px desktop, 48 / 64 px mobile.
- Container 1120 px, 24 px gutters (20 px mobile). Content is left aligned.
- Log rows use a fixed column grid: `date 11ch | kind 6ch | title 1fr`.
- Radius: 6 px on code blocks and menus, 3 px on small chips, 0 on rows.

## Pages

**Nav.** Wordmark `luca palmisano` left. Right: `writing`, `projects` as
editor tabs (active tab gets a 2 px accent underline), GitHub and LinkedIn
icons with accessible names, theme toggle. Sticky, translucent `bg`, hairline
bottom border only after scroll-safe (always present, 1 px).

**Mobile nav.** Menu button (aria-expanded) opens a panel under the header:
path-style links, socials, theme toggle. Escape and route change close it.

**Home.**

```
┌──────────────────────────────────────────────┬───────────────────┐
│ ~ whoami                                     │                   │
│ Luca Palmisano, Senior Software Engineer     │   line drawing    │
│ I build well-designed software systems,      │   (draws itself,  │
│ end to end: from the infrastructure up to    │   screen glows)   │
│ the tools people use.                        │                   │
│ focus     backend & distributed systems, …   │                   │
│ tend to   break complex problems down …      │                   │
│ elsewhere github  linkedin                   │                   │
├──────────────────────────────────────────────┴───────────────────┤
│ ~/writing                                             all entries │
│ 2026-09-12  note   A LoRaWAN gateway on a Raspberry Pi, …        │
│ 2026-01-02  essay  From Imperative Qt to State-Driven UI …  6 min │
│                    Building desktop UIs with Python is …          │
├───────────────────────────────────────────────────────────────────┤
│ ~/projects                                                        │
│ ● active  2026  orka       Run GPU workloads across …   infra     │
├───────────────────────────────────────────────────────────────────┤
│ ~/.hobbies   one quiet two-column line list                       │
└───────────────────────────────────────────────────────────────────┘
```

Essays are heavier than notes: title in `fg` 18 px semibold plus a Literata
dek line; notes are a single line in `muted` weight 400.

**Writing (`/articles`).** Title, one-line description, kind filter
(`all · essays · notes` as a tablist-like link group synced to `?kind=`),
then the log grouped by year. Scales to dozens of notes.

**Essay.** Path breadcrumb `~/writing/essay`, meta line (date, reading time,
tags as `#tag`), 40 px monospace title, Literata italic dek, cover in a 6 px
frame with the AI prompt disclosure underneath, then Literata prose.

**Note.** Same shell, compact: meta line, 28 px title, no dek emphasis, no
cover. A thin accent rule at left of the header marks it as a note.

**Projects.** `~/projects` listing. Featured rows: status dot + status, year,
name, description, tags, links (case study, source). Listed projects in a
tighter table: year, name, one-liner.

**404.** A helpful "command not found": shows the requested path and offers
`cd ~`, `cd ~/writing`, `cd ~/projects` as real links.

**Footer.** A status-bar strip: name and year, a quiet availability line
("Open to freelance work and interesting roles"), GitHub and LinkedIn.

## Motion

- Home drawing: each path's outline is stroked in with `stroke-dashoffset`
  (top to bottom, staggered, ~2.6 s total), fill fades in behind it, then the laptop screen
  fades up to a 14 % accent glow. Runs once, never blocks reading.
- Hero text: 240 ms opacity fade only.
- Hover: row background to `raised`, title to `accent` (120 ms colour only).
- Collapsible: 200 ms height/opacity.
- `prefers-reduced-motion`: all of the above disabled; drawing shows final
  state immediately.

## Deliberately avoided

Blinking cursors, fake typing, green-on-black, scanlines, bordered card
grids, emoji buttons, two-CTA hero, gradients, glass, all-caps eyebrows,
Unix permission strings (`drwxr-xr-x`) that encode nothing.
