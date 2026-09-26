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
by its path (`~/writing`, `~/projects`), content is set in
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
against `bg`; `accent-text` stays ≥ 5.5:1 on `raised` too.

Semantic tokens live in `@theme` (light values) and are overridden under
`.dark`. There are two neutral palettes, switched with the design panel's
"Surfaces" control (`data-surfaces`). The accent family is shared.

**Warm paper (default).** Borrowed from the Sketchbook variant (V2) and
applied to the whole neutral family so borders, surfaces and grey text all
share the warm hue. Contrast figures are the minimum across `bg`, `raised`
and `accent-soft`.

| Token         | Dark      | Light     | Use / contrast (dark · light)                     |
| ------------- | --------- | --------- | ------------------------------------------------- |
| `bg`          | `#1c1d1f` | `#efede7` | page (V2 paper)                                   |
| `raised`      | `#232427` | `#e7e4dc` | code, hover rows, thumbnail tiles (V2 paper-2)    |
| `line`        | `#414141` | `#c9c8c4` | hairlines, borders (V2 ink at 18 % over paper)    |
| `fg`          | `#e9e5dc` | `#1d1e22` | primary text (12.0 · 12.9 : 1), V2 ink            |
| `muted`       | `#aaa69c` | `#57554f` | secondary text (6.2 · 5.8 : 1), V2 ink-2          |
| `faint`       | `#939087` | `#625f58` | dates, keys (4.7 · 4.9 : 1), darker than V2 ink-3 |
| `accent-text` | `#7b97ea` | `#3558c7` | links, small accent text (5.4 · 4.8 : 1)          |
| `sketch`      | `#d3cfc6` | `#1d1e22` | pen strokes in fallback thumbnails                |

V2's ink-3 (`#77746c` / `#8f8c84`) is only ~3:1 as text, so `faint` is a
darker (light) or lighter (dark) step of the same warm grey. Syntax colours
on the warm code surface: light keyword 5.2, string 4.8, number `#8a5100` 5.1,
comment `#66625a` 4.8, title 4.9, attr 4.8; dark all ≥ 5.5 except comment
`#8f8b82` at 4.6. `#4169E1` itself stays for non-text accents only (3.2 : 1 on
dark `raised`, 3.8 : 1 on light `raised`); the skip link is white on
`#4169E1` at 4.85 : 1. `theme-color` defaults to the paper backgrounds and a
small client sync keeps it on the live `--color-bg` (theme toggle and
palette switch).

**Cool (original V1)**, `html[data-surfaces="cool"]`. Pixel-identical to
the earlier Workstation (verified by screenshot diff).

| Token         | Dark      | Light     | Use / contrast (against `bg`)                   |
| ------------- | --------- | --------- | ----------------------------------------------- |
| `bg`          | `#14161b` | `#fbfbfc` | page                                            |
| `raised`      | `#1a1d23` | `#f2f4f7` | code, hover rows, menus                         |
| `line`        | `#2a2e37` | `#dfe3ea` | hairlines, borders                              |
| `fg`          | `#dde1e8` | `#1b1f27` | primary text (13.8 / 16.0 : 1)                  |
| `muted`       | `#9aa1ae` | `#555c69` | secondary text (7.0 / 6.5 : 1)                  |
| `faint`       | `#828996` | `#636a78` | column keys, dates (≥ 4.6 : 1)                  |
| `accent`      | `#4169e1` | `#4169e1` | royal blue: fills, rules, focus (3.73 / 4.69:1) |
| `accent-text` | `#7b97ea` | `#3558c7` | links, small accent text (6.43 / 6.02 : 1)      |

**Current site**, `html[data-surfaces="current"]`. The live lucapalmi.com
(`main`) is dark only, with neutral untinted greys. Dark maps it directly;
light is an **extrapolated** neutral counterpart (no live equivalent).
Contrast is the minimum across `bg`, `raised` and `accent-soft`.

| Token         | Dark      | Light     | Notes (contrast dark · light)                                     |
| ------------- | --------- | --------- | ----------------------------------------------------------------- |
| `bg`          | `#272727` | `#f4f4f4` | live `--color-secondary`                                          |
| `raised`      | `#242424` | `#ebebeb` | live `--color-primary`: darker than the page, kept as on the site |
| `line`        | `#3a3a48` | `#d6d6d6` | lighter step of the live `#292936`, which is ~1.04:1, invisible   |
| `fg`          | `#e9e9e9` | `#1f1f1f` | white at 90 % (11.0 · 13.6 : 1)                                   |
| `muted`       | `#c9c9c9` | `#555555` | white at 75 %, the live body text (8.1 · 6.1 : 1)                 |
| `faint`       | `#9e9e9e` | `#636363` | white at 55 % (5.0 · 5.0 : 1)                                     |
| `accent-text` | `#7b97ea` | `#3558c7` | the live link tint (4.7 · 5.1 : 1)                                |
| `sketch`      | `#d9d9d9` | `#1f1f1f` | thumbnail pen strokes                                             |

Code comments use `#939393` (dark, 5.1 : 1) and `#666666` (light, 4.8 : 1)
on the code surface; the other syntax colours are shared with the paper
palette and stay ≥ 5.1 : 1.

**Scroll rows.** The topic tab row is only a horizontal scroll container
below 768px (`overflow-y: hidden`, scrollbar hidden, right-edge fade as the
affordance, active underline drawn inside the tab). From `md` up it is
`overflow: visible`, so no scrollbar can appear. Code blocks set
`overflow-y: hidden` next to their horizontal scroll.

**Callouts** (`Callout`, types note / tip / warning). A tinted box: the
type colour at 11% (`color-mix` over transparent) with a 1px border at 28%,
6px radius, 14px × 20px padding, no bar, no monospace label or header strip,
so callouts never read as code blocks. The label is lowercase ("note",
"tip", "warning", via `text-transform`; `aria-label` keeps "Note" etc.) in
Literata italic 15px and the type's text tint. The body is Literata 17px:
note and tip use `--color-callout-muted`, a tone between secondary and main
text chosen per palette and mode so it clears 7 : 1 on every tint (lowest
7.07 : 1, paper light note); warning keeps full-contrast `fg`. `aside
aria-label={label}`. Design panel: "Callout style" (`data-callout-style="bar"`:
2px left bar, 7% tint, square corners) and "Callout text"
(`data-callout-text="full"`: full-contrast body for every type).

| Type    | Fill (dark · light)   | Label text (dark · light) | Label contrast, min over palettes (dark · light) |
| ------- | --------------------- | ------------------------- | ------------------------------------------------ |
| note    | `#4169e1` · `#4169e1` | `#7b97ea` · `#3558c7`     | 4.79 · 4.65                                      |
| tip     | `#3fa36b` · `#3fa36b` | `#62c08c` · `#256b46`     | 5.76 · 4.96                                      |
| warning | `#e0a526` · `#b7791f` | `#e8b64a` · `#80530f`     | 6.51 · 5.08                                      |

Light tip and warning text are deeper than first specced (`#2d7a4f` was
4.05 : 1 and `#8a5a12` 4.52 : 1 on warm paper). Body text on every tint is
≥ 10 : 1.

## Type

- **Inconsolata** (variable, self-hosted): the whole UI. Narrow, calm, reads
  well at 15 to 16 px. Weights 400 / 500 / 600 / 700.
- **Cascadia Code** (self-hosted): code only (inline and blocks). The editor
  font is used where there is actual code, which gives the two monospaces
  distinct jobs.
- **Literata** (self-hosted, mandatory): article prose and subtitles.

Scale (px, 1.25-ish, deliberately tight): 13 · 14 · 16 · 18 · 22 · 28 · 40.
Prose: Literata 18 px / 1.75 on desktop, 17 px on mobile, measure 726px (~74ch).
Article headings are Inconsolata bold (700), no prefix characters: h2 at
26px (1.45em cap on phones) with 26px of space below, a hairline across the
measure and a short 2px royal-blue segment at its start (the editor-tab
accent edge); h3 at 1.15em, 700, 0.8em below, without a rule. Both keep
`scroll-margin-top` for the section rail. The design panel's "Article
headings" group tunes `--h2-size` (18–36px, 26), `--h2-weight` (400–800, 700), `--h2-space-below` (8–48px, 26) and `--h3-size` (14–28px, 20.7), and offers "Heading font": Inconsolata (default) or "Sans (V4)", IBM Plex Sans 600 on h2/h3 (`data-heading-font="sans"`, self-hosted, not preloaded; the weight slider still applies).
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

**Theme toggle.** The Lamplight variant's wall switch, copied with the same
geometry (20×28 plate with a 3.5 radius, inner slot, rounded lever), drawn
at 20px tall next to the 16px GitHub/LinkedIn icons. In light mode the lever
is up and lit in royal blue `#4169E1`; in dark it slides down and takes the
outline colour. The nav icon buttons (GitHub, LinkedIn, the switch) sit bare:
no box at rest or on hover, hover is a colour change (`muted` → `fg`), and
the focus ring appears on keyboard focus only (`:focus-visible`). The lever
position rides on the `.dark` class and the variant on `data-theme-toggle`,
both set before paint, so nothing flashes. The design panel's "Theme toggle"
(`icon`) restores the earlier sun/moon icon.

**Mobile nav.** Menu button (aria-expanded) opens a panel under the header:
path-style links, socials, theme toggle. Escape and route change close it.

**Home: a timeless calling card.** One job: a newcomer sees who Luca is,
then gets pointed to one post or one project. No lists or cards, no
focus-area line and no hobbies (Luca will write about those instead).
Content: `~ $ whoami`, name and role, the headline (34px at most, sized with
`svh`; the design panel's headline-size default is 34), then "I tend to" as
a faint label with three `-` lines at 15px (13px on phones), the
self-drawing portrait with the laptop glow, and `~ $ ls`:

```
writing/    latest    A LoRaWAN gateway on a Raspberry Pi, one evening in
projects/   flagship  qtcompose
```

The folder name is the main link (to /articles or /projects, accent and
underline on hover). The pointer beside it is the one secondary link: the
latest article (or `about.pinnedArticle`), and the flagship project
`about.flagshipProject`, linked to its write-up when it has one, otherwise
its repo.

Exactly one screen (`min-height: calc(100svh - header)`, content vertically
centred with symmetric padding). The drawing sits on the right
(height `min(62svh, 40rem)`); on phones it sits above the whoami block at
18svh. This is the only home layout: the earlier scrolling and fit-first
variants and their switch are retired.

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
it. The measure is 726px (45.375rem, shared across variants; Literata 18px,
about 74 characters per line); the header sits on it: `../writing` back link, then a meta
line set like a timeline entry (`2026-01-02  6 min read`), the 40px title, the
Literata italic subtitle, and topics as accent links to `/articles?topic=`.
Technology tags stay as quiet `#tag` text in the end matter. Prose is Literata on the same 726px measure. The cover breaks out symmetrically to 52rem, and code blocks
break out 20px on each side from 768px up (766px); both stay centred. On
phones prose uses the full content width (24px side padding, 342px at 390) and code blocks run full-bleed with their text on the prose edge. The article
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
11.5rem wide below 1440px and 15rem above, so the panel clears code blocks at
1280). Links are real anchors with `aria-current="location"`; headings get
`scroll-margin-top` so they land below the sticky header.

**Projects.** A path bar (`~/projects │ Featured`, same grammar as
`~/writing`), then the featured projects with a clearly heavier treatment
than the compact `ls`-style "Smaller things" table below (larger gap before
it: 80/112px). "Smaller things" sits on top of its list in the same bar
grammar (`Smaller things │ 8 projects` over a hairline), and the list runs
the full container width, on the featured panes' left edge. Rows share one
column template through subgrid (`11rem | 1fr | 4ch | 9ch`): name (semibold,
the only link to the repo: accent + underline on hover, focus ring), muted description, faint right-aligned
tabular year, and a small accent "write-up" link when a case study exists,
empty otherwise. No borders, separators or header row: alignment and
spacing only; rows themselves are not clickable. On mobile each project stacks:
name with the year on the right, description, then write-up.

_Editor panes._ A 2-column grid (1 on mobile) of slim panes on the `raised`
surface with `line` borders (they follow the Surfaces control). The tab
(2px royal-blue top edge) holds a 30px square project icon, the folder name
`orka/` at 18px semibold, and a quiet outlined `wip` marker for projects
with `status: "early"`; the year sits faint on the right of the strip. The
body is the description only, at a 1.6 line-height. A status-bar footer
carries the links on the left (`source ↗`, `website ↗`, `case study ↗`) and
the technologies on the right as one faint line (`Python · Qt`). No status
lights, type labels or sketches: the four panes are 393px tall at 1440
(664px before).

_Project icons_ (`ProjectIcon`): one clean line motif per project type in a
30px bordered square, stroked in `--color-sketch` with a single royal-blue
detail: `infrastructure` a GPU card with one blue fan, `tool` a terminal
with a blue play mark, `desktop` a window with a component tree and a blue
root, `package` stacked modules with the top one blue, `website` a browser
with a blue address bar. Decorative (`aria-hidden`).

**404.** A helpful "command not found": shows the requested path and offers
`cd ~`, `cd ~/writing`, `cd ~/projects` as real links.

**No site footer.** GitHub and LinkedIn live in the nav (and the mobile
menu), so there is no global footer or © line. Pages end with their own
bottom padding (96px desktop, 48px mobile). Articles keep their own end
matter inside the article: a hairline, `#tags`, `../writing` and "Back to
top".

## Design panel (development only)

A "Design" button bottom-right opens the shared review panel (surfaces in
the editor palette: `raised`, `line`, Inconsolata). Every control defaults to the current look, and CSS
carries the defaults as `var()` fallbacks, so production, which has no panel
and no script, renders exactly the defaults.

| Group            | Control                        | Drives                                                                    | Range                      | Default           |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------- | -------------------------- | ----------------- |
| Writing list     | List alignment                 | `data-writing-align`                                                      | centre / left              | centre            |
| Writing list     | Filter bar                     | `data-writing-bar`                                                        | page width / list width    | page width        |
| Chrome           | Theme toggle                   | `data-theme-toggle`                                                       | wall switch / sun-moon     | wall switch       |
| Article headings | H2 size / weight / space below | `--h2-size`, `--h2-weight`, `--h2-space-below`                            | 18–36px / 400–800 / 8–48px | 26px / 700 / 26px |
| Article headings | Heading font                   | `data-heading-font`                                                       | own / sans (IBM Plex Sans) | own               |
| Article headings | H3 size                        | `--h3-size`                                                               | 14–28px                    | 20.7px            |
| Article          | Callout style                  | `data-callout-style`                                                      | tinted box / bar + tint    | tinted box        |
| Article          | Callout text                   | `data-callout-text`                                                       | muted / full               | muted             |
| Colour           | Surfaces                       | `data-surfaces`                                                           | paper / cool / current     | warm paper        |
| Writing list     | Fallback thumbnail             | `data-thumb-style`                                                        | ink sketch / code pane     | ink sketch        |
| Writing list     | Thumbnail width                | `--writing-thumb-width` (mobile half)                                     | 96–280px                   | 176px             |
| Writing list     | Title size                     | `--writing-title-size` (mobile ≤16px)                                     | 14–26px                    | 17px              |
| Writing list     | Space between entries          | `--writing-entry-gap` (entry padding)                                     | 0–64px                     | 16px              |
| Home             | Headline size                  | `--home-headline-size` (caps the svh clamp from 768px)                    | 28–56px                    | 40px              |
| Home             | Drawing size (%)               | `--home-drawing-size` (scales the drawing height)                         | 50–110                     | 100               |
| Home             | Drawing animation              | `data-portrait-animation`                                                 | draw in / static           | draw in           |
| Glow             | Laptop screen glow (%)         | `--screen-glow`, scales the per-mode glow opacity (0.12 light, 0.22 dark) | 0–300                      | 100               |

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
