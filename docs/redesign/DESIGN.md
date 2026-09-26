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

One cool grey family, one accent: the royal blue `#4169E1` of the original
site. `#4169E1` itself is used for every non-text accent (active tab and
filter underlines, rail tick, timeline markers, focus rings, selection, the
laptop glow, thumbnail accents). Small text uses `accent-text`, a tint (dark)
or shade (light) of the same 225° hue, because `#4169E1` is only 3.7:1 on
the dark page and 4.4:1 on the light `raised` surface. Contrast figures are
against `bg`; `accent-text` stays ≥ 5.5:1 on `raised` and `accent-soft` too.

Semantic tokens live in `@theme` (light
values) and are overridden under `.dark`.

| Token         | Dark (default feel) | Light ("light editor") | Use                                                      |
| ------------- | ------------------- | ---------------------- | -------------------------------------------------------- |
| `bg`          | `#14161b`           | `#fbfbfc`              | page                                                     |
| `raised`      | `#1a1d23`           | `#f2f4f7`              | code, hover rows, menus                                  |
| `line`        | `#2a2e37`           | `#dfe3ea`              | hairlines, borders                                       |
| `fg`          | `#dde1e8`           | `#1b1f27`              | primary text (13.8 / 16.0 : 1)                           |
| `muted`       | `#9aa1ae`           | `#555c69`              | secondary text (7.0 / 6.5 : 1)                           |
| `faint`       | `#828996`           | `#636a78`              | column keys, dates (≥ 4.6 : 1)                           |
| `accent`      | `#4169e1`           | `#4169e1`              | royal blue: fills, rules, ticks, focus (3.73 / 4.69 : 1) |
| `accent-text` | `#7b97ea`           | `#3558c7`              | links, small accent text (6.43 / 6.02 : 1)               |
| `accent-soft` | `#181e31`           | `#eef1fb`              | callout surface                                          |

Syntax colours are a small, desaturated set (keyword, string, number,
comment, title, attr) defined per mode, so highlight.js works in both themes
without a third-party stylesheet.

## Type

- **Inconsolata** (variable, self-hosted): the whole UI. Narrow, calm, reads
  well at 15 to 16 px. Weights 400 / 500 / 600 / 700.
- **Cascadia Code** (self-hosted): code only (inline and blocks). The editor
  font is used where there is actual code, which gives the two monospaces
  distinct jobs.
- **Literata** (self-hosted, mandatory): article prose and subtitles.

Scale (px, 1.25-ish, deliberately tight): 13 · 14 · 16 · 18 · 22 · 28 · 40.
Prose: Literata 18 px / 1.75 on desktop, 17 px on mobile, measure ≤ 68ch.
Tabular numerals everywhere dates and years line up.

## Spacing and grid

- 4 px base; section rhythm 64 / 96 px desktop, 48 / 64 px mobile.
- Container 1120 px, 24 px gutters (20 px mobile). Content is left aligned.
- Log rows use a fixed column grid: `date 10ch | title 1fr | minutes`.
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
│ 2026-09-12  A LoRaWAN gateway on a Raspberry Pi, …         2 min │
│ 2026-01-02  From Imperative Qt to State-Driven UI …        6 min │
│                    Building desktop UIs with Python is …          │
├───────────────────────────────────────────────────────────────────┤
│ ~/projects                                                        │
│ ● active  2026  orka       Run GPU workloads across …   infra     │
├───────────────────────────────────────────────────────────────────┤
│ ~/.hobbies   one quiet two-column line list                       │
└───────────────────────────────────────────────────────────────────┘
```

Every entry gets the same row: date, semibold title with a Literata italic
subtitle, reading time. (No essay/note distinction anywhere in the UI.)

**Home, "fit" layout (review option, `html[data-home-layout="fit"]`).** The
same page, switched with a `fit:` Tailwind variant, so both layouts are
server-rendered and there is no flash. Only the whoami section is kept and it
fills exactly one screen (`min-height: calc(100svh - header)`, content
vertically centred): `~ $ whoami`, name and role, the headline (sized with
`svh` so it shrinks on short screens), focus areas on one line joined by
`/`, then `~ $ ls` and two large directory rows as the entry points:

```
writing/    latest A LoRaWAN gateway on a Raspberry Pi…      6 entries
projects/   orka, envelop, qtcompose, stillhead             12 projects
```

Each row is a full-width link between hairlines; on hover it gets the
`raised` surface, a 2px royal-blue bar at its left edge and an accent name,
the same language as the active tabs. The drawing (with its one-off
animation) sits on the right, height-bound to `min(64svh, 40rem)`. On
mobile it moves above the text at 18svh. The hobbies, the latest-writing log,
the project rows and the site footer are hidden. On very short viewports
the page grows rather than clipping (verified at 1440×560). The dev-only
layout switch is a small `home | scroll | fit` segmented control in the
editor-tab style: bottom-right on desktop, and top-right under the nav on
mobile, clear of the entry rows.

**Page titles (Writing, Projects).** No hero, kicker or intro paragraph; the
intro sentences live only in each page's `metadata.description`. The `<h1>`
is the page's path, set the way an editor shows the current folder:
`~/writing` sits at the left of the topic tab bar, split from the tabs by a
short vertical hairline, so the title and filters are one row. `~/projects`
sits in the gutter on the same line as the `ls -l` column headers
(`status year name description type`), with the "Featured" label below it
next to the first row. Neither costs any extra height: the first timeline
entry starts ~175px below the nav, the first project ~105px.

**Writing (`/articles`).** The `~/writing` + topic-tab row spans the normal
page container (title on the logo's left edge, tabs on one row at 1280 and
1440, original tab padding); only the timeline below is centred, in a 48rem
column. Design panel: `data-writing-align="left"` pins the list to the left
edge; `data-writing-bar="list"` restores the earlier variant where bar and
list share one 61rem column (centred, or left with the list). Without the
attributes you get the defaults: page-width bar, centred list. A timeline in the language of
`git log --graph`.
One hairline spine runs down the left; each year is a small filled accent
square on the spine followed by the year, and each entry hangs off the
spine by a hollow node that turns accent on hover. Every entry gets the same
treatment: a 16:10 thumbnail (176px desktop, 88px mobile), then date and
reading time, title, Literata italic subtitle (hidden below 640px) and
topics. Covers use `next/image` with `sizes` of 176px/88px.

_Fallback thumbnail_ (`InkThumbnail`, adopted from the Sketchbook variant at
Luca's request): a small pen sketch of the article's first topic (one motif
per topic: chip, boxes, cylinder, globe…), with a seeded wobble, tilt and
corner hatching from the slug, so the same article always gets the same
sketch. The drawings are unchanged; only the colours map to Workstation
tokens: tile `raised`, strokes `--color-sketch` (`#1b1f27` light, a slightly
softened `#c3c8d1` dark so it sits with the muted home drawing), hatching
`faint`, and one royal-blue `accent` detail. Strokes stay at a constant width
at 176px and 88px. The earlier code-pane tile (`FallbackThumb`) remains as a
design-panel option.

_Topic filter_: "All" plus every topic with at least one visible article,
each with its count, styled like the nav's editor tabs (`aria-pressed`
buttons). The selection is read from `?topic=` on the client through
`useSyncExternalStore` and written back with `history.replaceState`, so the
page stays statically prerendered and shows everything without JS. A
visually hidden `aria-live` line announces "2 of 6 filed under
Architecture"; there is no visible count or sort caption. Empty years are
hidden; an unknown topic gets an empty state with a "Show all writing"
button. On mobile the `~/writing` title stays put and the tabs scroll
horizontally beside it, fading out at the right edge to show there is more.

**Article layout (one template for everything).** One centred column, nothing beside
it. The header sits on the 40rem measure: `../writing` back link, then a meta
line set like a timeline entry (`2026-01-02  6 min read`), the 40px title, the
Literata italic subtitle, and topics as accent links to `/articles?topic=`.
Technology tags stay as quiet `#tag` text in the end matter. Prose is Literata on a 40rem
measure (~70ch). The cover breaks out symmetrically to 52rem, and code blocks
break out 2.5rem on each side from 1024px up; both stay centred. The article
ends with a hairline and `../writing` / `Back to top`. (The first version put
the file info in a left gutter; it became an empty column on long articles, so
it moved into the header.)

**Section rail.** Only on articles with 3 or more h2s and viewports of at
least 1280px. Fixed to the right edge (20px inset), vertically centred, like
the change markers in an editor's scrollbar gutter: one 12px, 2px-high
rounded tick per section. Upcoming ticks are `faint` at 45 %, passed ones
`muted`, and the active one is 24px wide in `accent`. The rail is visible only
while the reader is in the article body. On hover or focus-within, the rail
gets a `bg` panel with a hairline border and 6px radius, and section titles
appear right-aligned next to their ticks (Inconsolata 13px, up to 2 lines,
12rem wide below 1440px and 15rem above, so the panel clears code blocks at
1280). Links are real anchors with `aria-current="location"`; headings get
`scroll-margin-top` so they land below the sticky header.

**Projects.** `~/projects` listing (title as above). Featured rows: status dot + status, year,
name, description, tags, links (case study, source). Listed projects, under a
"Smaller things" label in the gutter, in a tighter table: year, name, one-liner.

**404.** A helpful "command not found": shows the requested path and offers
`cd ~`, `cd ~/writing`, `cd ~/projects` as real links.

**Footer.** A status-bar strip: name and year, a quiet availability line
("Open to freelance work and interesting roles"), GitHub and LinkedIn.

## Design panel (development only)

A "Design" button bottom-right opens the shared review panel (surfaces in
the editor palette: `raised`, `line`, Inconsolata). It also holds the
Scroll/Fit home switch. Every control defaults to the current look, and CSS
carries the defaults as `var()` fallbacks, so production, which has no panel
and no script, renders exactly the defaults.

| Group        | Control                | Drives                                                                    | Range            | Default |
| ------------ | ---------------------- | ------------------------------------------------------------------------- | ---------------- | ------- |
| Writing list | List alignment         | `data-writing-align`                                                      | centre / left    | centre  |
| Writing list | Thumbnail width        | `--writing-thumb-width` (mobile half)                                     | 96–280px         | 176px   |
| Writing list | Title size             | `--writing-title-size` (mobile ≤16px)                                     | 14–26px          | 17px    |
| Writing list | Space between entries  | `--writing-entry-gap` (entry padding)                                     | 0–64px           | 16px    |
| Home         | Headline size          | `--home-headline-size` (scroll ≥768px; caps the fit clamp)                | 28–56px          | 40px    |
| Home         | Drawing size (%)       | `--home-drawing-size` (width in scroll, height in fit)                    | 50–110           | 100     |
| Home         | Drawing animation      | `data-portrait-animation`                                                 | draw in / static | draw in |
| Glow         | Laptop screen glow (%) | `--screen-glow`, scales the per-mode glow opacity (0.12 light, 0.22 dark) | 0–300            | 100     |

## Motion

- Home drawing: each path's outline is stroked in with `stroke-dashoffset`
  (top to bottom, staggered, ~2.6 s total), fill fades in behind it, then the laptop screen
  fades up to a 14 % accent glow. Runs once, never blocks reading.
- Hero text: 240 ms opacity fade only.
- Hover: row background to `raised`, title to `accent` (120 ms colour only).
- Collapsible: 200 ms height/opacity.
- Section rail: 200 ms opacity in/out with the article body; tick width
  and colour 200 ms; titles fade in over 150 ms. Anchor jumps scroll
  smoothly on article pages only, and only without reduced motion.
- `prefers-reduced-motion`: all of the above disabled; drawing shows final
  state immediately.

## Deliberately avoided

Blinking cursors, fake typing, green-on-black, scanlines, bordered card
grids, emoji buttons, two-CTA hero, gradients, glass, all-caps eyebrows,
Unix permission strings (`drwxr-xr-x`) that encode nothing.
