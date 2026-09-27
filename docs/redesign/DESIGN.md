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

One neutral family, one accent. Dark is the live lucapalmi.com's untinted
greys (under `.dark`); raised is darker than the page, as on the live site,
and hairlines are a lighter step of its `#292936` card border. Light is
**stone**, a warm grey paper (`@theme`), chosen by Luca over putty, paper
and the neutral greys. `theme-color` is `#e8e5de` / `#272727` and follows
the theme toggle. Contrast is the minimum over `bg` and `raised` (dark ·
light).

| Token         | Dark      | Light (stone) | Use / contrast                                 |
| ------------- | --------- | ------------- | ---------------------------------------------- |
| `bg`          | `#272727` | `#e8e5de`     | page                                           |
| `raised`      | `#242424` | `#dfdbd2`     | code, hover rows, panes, thumbnail tiles       |
| `line`        | `#3a3a48` | `#cbc6bb`     | hairlines, borders (window-like elements only) |
| `fg`          | `#e9e9e9` | `#201f1c`     | primary text (12.3 · 11.9 : 1)                 |
| `muted`       | `#c9c9c9` | `#565552`     | secondary text (9.0 · 5.4 : 1)                 |
| `faint`       | `#9e9e9e` | `#61605d`     | dates, labels (5.6 · 4.6 : 1)                  |
| `accent`      | `#4169e1` | `#4169e1`     | royal blue: fills, rules, ticks, focus         |
| `accent-text` | `#7b97ea` | `#3457c6`     | links, small accent text (5.3 · 4.6 : 1)       |
| `sketch`      | `#d9d9d9` | `#201f1c`     | pen strokes in the fallback ink thumbnails     |

Stone's text tokens are derived from the surface: greys take half its oklab
chroma (a hint of warmth, not a tint), then every text token is darkened in
oklab lightness just enough that all text pairs stay ≥ 4.5 : 1 on `bg`,
`raised` and the callout tints, and `callout-muted` (`#42413e`) ≥ 7 : 1.
That nudged `accent-text`/syntax title to `#3457c6`, the note label to
`#3255c4`, syntax string to `#2c6c3b`, attr to `#0c6982` and comment to
`#61605d`. Callout tints, the drawing's ink, the code scrollbar and the
selection derive from these tokens. The lowest text pair on the site is the
syntax attr colour on the code surface, 4.53 : 1.

Syntax colours on the code surface (dark · light): keyword 7.2 · 4.75,
string 9.2 · 4.59, number 8.5 · 4.67, comment `#939393` · `#61605d` at 5.1 ·
4.55, title 5.5 · 4.57, attr 8.3 · 4.53. `#4169E1` itself is never used for
small text. The skip link is white on `#4169E1` at 4.85 : 1.

**Callouts** (`Callout`, types note / tip / warning). A tinted box: the
type colour at 11% (`color-mix` over transparent) with a 1px border at 28%,
6px radius, 14px × 20px padding, no bar, no monospace label or header strip,
so callouts never read as code blocks. The label is lowercase ("note",
"tip", "warning", via `text-transform`; `aria-label` keeps "Note" etc.) in
Literata italic 15px and the type's text tint. The body is Literata 17px:
note and tip use `--color-callout-muted` (`#c9c9c9` dark, `#42413e` light),
which clears 7 : 1 on every tint (lowest 7.17 : 1, light note); warning keeps full-contrast `fg`. `aside
aria-label={label}`.

| Type    | Fill (dark · light)   | Label text (dark · light) | Label contrast on its tint (dark · light) |
| ------- | --------------------- | ------------------------- | ----------------------------------------- |
| note    | `#4169e1` · `#2f7bd0` | `#7b97ea` · `#3255c4`     | 4.82 · 4.57                               |
| tip     | `#3fa36b` · `#3fa36b` | `#62c08c` · `#256b46`     | 5.81 · 4.65                               |
| warning | `#e0a526` · `#b7791f` | `#e8b64a` · `#80530f`     | 6.58 · 4.75                               |

The light note fill is a steel blue, not the royal-blue accent: `#4169e1` at
11% over warm stone composites to a near-grey that reads lilac (hue ~280 in
oklch); `#2f7bd0` keeps the tint clearly blue and sits on stone naturally.

Light tip and warning text are deeper than first specced (`#2d7a4f` would
be 4.3 : 1 and `#8a5a12` 4.8 : 1). Full-contrast body text on every tint is
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
Article headings are Inconsolata, no prefix characters, tracked −0.01em,
using the variable file's real 200–900 weight axis (nothing synthesised).
h2: 1.625rem from 640px, 1.375rem on phones (26px mono wrapped into 3 lines
at 360px; now at most 2), weight 800, 0.77em below (20px on desktop, so it
follows the phone size), a hairline across the measure and a short 2px
royal-blue segment at its start (the editor-tab accent edge). h3 steps down:
1.25rem from 640px, 1.125rem on phones (still above the 1.0625rem phone
body), weight 700, 0.8em below, without a rule. Both keep
`scroll-margin-top` for the section rail.

**Units.** Type and layout sizes are rem; spacing that should follow its own
element's size is em (heading margins). Raw px is kept only for hairlines,
borders, radii, outline offsets and SVG user units.
Tabular numerals everywhere dates and years line up.

## Spacing and grid

- 4 px base; section rhythm 64 / 96 px desktop, 48 / 64 px mobile.
- Container 1120 px, 24 px gutters (20 px mobile). Content is left aligned.
- Log rows use a fixed column grid: `date 10ch | title 1fr | minutes`.
- Radius: 6 px on code blocks and menus, 3 px on small chips, 0 on rows.

## Lines

Lines belong to window-like elements only: the nav bar's bottom border,
project panes (tab strip, status bar), code blocks, callouts, the 404
terminal box, the mobile menu panel edge, and the open section-rail panel.
Page and section labels (`~/writing`, `~/projects`, the other-projects label, the
article end matter, mobile menu items) rely on type and spacing. The one
exception is the article h2 rule with its blue tick, because headings are
content, not chrome.

## Pages

**Nav.** Wordmark `luca palmisano` left. Right: `writing`, `projects` as
editor tabs (active tab gets a 2 px accent underline), GitHub and LinkedIn
icons with accessible names, theme toggle. Sticky, translucent `bg`, hairline
bottom border only after scroll-safe (always present, 1 px).

**Theme toggle.** The Lamplight variant's wall switch, copied with the same
geometry (20×28 plate with a 3.5 radius, inner slot, rounded lever), drawn
at 24px tall (V6's size; at 20px the lever shrinks to a stray dot) next to
the filled GitHub (18px) and LinkedIn (16px) marks, all on one centre line. In light mode the lever
is up and lit in royal blue `#4169E1`; in dark it slides down and takes the
outline colour. The nav icon buttons (GitHub, LinkedIn, the switch) sit bare:
no box at rest or on hover, hover is a colour change (`muted` → `fg`), and
the focus ring appears on keyboard focus only (`:focus-visible`). The lever
position rides on the `.dark` class, set before paint, so nothing flashes.

**Mobile nav.** Menu button (aria-expanded) opens a panel under the header:
path-style links, GitHub and LinkedIn as icons (the filled marks, 18px
GitHub, 16px LinkedIn, 44px hit areas, accessible names, new tab), theme
toggle. A scrim dims the
page below the header (black at 25% light, 55% dark; 150ms fade, none with
reduced motion). A tap on the scrim or Escape closes the menu and returns
focus to the menu button; route changes close it too. While open the page
doesn't scroll (`overflow: hidden` on `html`). The desktop nav uses the
same icons at the same sizes.

**Scrollbar compensation.** The header and `main` carry `.scrollbar-offset`:
`padding-inline-start: min(100vw - 100%, max(0, 100% - 70rem))`. With a
classic scrollbar the centred content keeps the same x on short and long
pages, while the header border runs to the window edge or the scrollbar.
The offset is capped by the free space beside the page container, so
narrow windows with full-width content aren't pushed off-centre. It
resolves to 0 with overlay scrollbars and during the menu's scroll lock.

**Home `ls` rows on phones.** Below 640px the "latest …" / "flagship …"
detail lines are hidden: each row is just the folder link (`writing/`,
`projects/`), and the link's pseudo-element covers the whole row, a 48px
hit area. Rows are 10px top and bottom (`py-2.5`) so the two single-line
rows keep the list's rhythm. From 640px up the rows and details are
unchanged.

**Home: a timeless calling card.** One job: a newcomer sees who Luca is,
then gets pointed to one post or one project. No lists or cards, no
focus-area line and no hobbies (Luca will write about those instead).
Content: `~ $ whoami`, name and role, the headline (at most 2.125rem, sized
with `svh`; on phones a fixed
`clamp(1.6875rem, 4.35svh, 2.1rem)`, 33.6px at 838px tall, five lines of
about 22 characters), then "I tend to" as
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
centred with symmetric padding). Everything lives inside the nav's
container, so the composition is stable from 1024px to 2560px: a 31rem text
column (the headline capped at 29ch, so it always wraps into four lines) and
a drawing column whose right edge is the container's right edge, the same
as the nav icons. Text and drawing read as one scene: the drawing is cropped
at the desk (`viewBox` height 1680 of 2675, so the chair legs and lower desk
edges never show) and fades out below the laptop's base. Its width is
`min(62svh × 2000/1680, column)`, so it follows the fold height but never
grows into the text column. It slides 4rem under the text column's edge,
where the left mask is fully transparent (0–2%) and ramps slowly to opaque
by 18.5%, just before the laptop's lid (19%), which always stays whole. The
fades are long and gradual: the bottom from 76% (the laptop base sits at
74%) and the right edge over 13%. So the desk line reaches toward the text
and dissolves without touching it. Strokes stay crisp in a muted
ink (faint text eased 15% toward the page). The laptop screen is the only
light: a quiet royal-blue wash at 50% opacity in both modes, a linear
gradient running along the screen's length, a touch lighter at the top of
the lid, with no highlight, spill or wide glow. The fill polygon is fitted
to the bezel's inner edge (its lower right corner sits under the typing
hand). It switches on 2.4s after the draw-in; reduced motion shows it lit. Tablets (640–1023px) show a small cropped drawing top right (20svh).
_Phones (below 640px):_ the text block is centred between the nav and the
bottom of the screen (`100dvh`, so browser chrome can't break it), a touch
above the true middle: two flexible spacers, the lower 1.25× the upper.
When the text is taller than the screen the spacers collapse and it starts
right under the nav and scrolls. Phones show no drawing (a faint background
drawing was tried and rejected). The drawing's edges are always soft (the
fade masks above).

**Page titles (Writing, Projects).** No visible title: the nav's active tab
already says where you are. Each page keeps a visually hidden `<h1>`
("Writing", "Projects"). Writing opens directly with the topic tabs, the
first tab's text on the content's left edge; Projects opens directly with the
featured panes (48px under the nav on desktop, 32px on phones). The intro
sentences live only in `metadata.description`. The other projects are
introduced by a faint code comment, `// other projects` (13px Inconsolata),
with a visually hidden `<h2>` "Other projects".

**Writing (`/articles`).** The topic tabs and the timeline share one centred
54rem (864px) column, the smallest width that keeps all eight tabs on one
row from 1024px up; the first tab's text sits on the column's left edge, in
line with the timeline spine and year markers. From 640 to 767px the tabs
keep the full content width and scroll horizontally. Below 640px they are
replaced by one native `<select>` (the OS picker), introduced by a faint mono
`topic` label: "All (6)", "Architecture (2)"…, 44px tall, 16px text (no iOS
zoom), one hairline border, accent focus ring. A timeline in the language of
`git log --graph`.
One hairline spine runs down the left; each year is a small filled accent
square on the spine followed by the year, and each entry hangs off the
spine by a hollow node that turns accent on hover. Every entry gets the same
treatment: a 16:10 thumbnail (12.5rem from 768px, 6.25rem from 640px,
none on phones, where the title takes the full width), then date and
reading time, title, Literata italic subtitle (hidden below 640px) and
topics. Titles are 1.25rem from 640px and 1.125rem on phones; entries are
1rem apart (0.75rem on phones). Covers use `next/image` with `sizes` of
200px/100px.

_Fallback thumbnail_ (`InkThumbnail`, adopted from the Sketchbook variant at
Luca's request): a small pen sketch of the article's first topic (one motif
per topic: chip, boxes, cylinder, globe…), with a seeded wobble, tilt and
corner hatching from the slug, so the same article always gets the same
sketch. The drawings are unchanged; only the colours map to Workstation
tokens: tile `raised`, strokes `--color-sketch` (`#1f1f1f` light, a slightly
softened `#d9d9d9` dark), hatching `faint`, and one royal-blue `accent`
detail. Strokes stay at a constant width at every thumbnail size.

_Topic filter_: "All" plus every topic with at least one visible article,
each with its count, styled like the nav's editor tabs (`aria-pressed`
buttons). The selection is read from `?topic=` on the client through
`useSyncExternalStore` and written back with `history.replaceState`, so the
page stays statically prerendered and shows everything without JS. A
visually hidden `aria-live` line announces "2 of 6 filed under
Architecture"; there is no visible count or sort caption. Empty years are
hidden; an unknown topic gets an empty state with a "Show all writing"
button. Between 640 and 767px the tabs scroll horizontally, fading out at the
right edge to show there is more; phones use the select.

**Article layout (one template for everything).** One centred column, nothing beside
it. The measure is 726px (45.375rem, shared across variants; Literata 18px,
about 74 characters per line); the header sits on it: `../writing` back link, then a meta
line set like a timeline entry (`2026-01-02  6 min read`), the 40px title, the
Literata italic subtitle, and topics as accent links to `/articles?topic=`.
Technology tags stay as quiet `#tag` text in the end matter. Prose is Literata on the same 726px measure. The cover breaks out symmetrically to 52rem, and code blocks
break out 20px on each side from 768px up (766px); both stay centred. On
phones prose uses the full content width (24px side padding, 342px at 390). Code blocks run full-bleed on tablets (640–767px). On phones they sit on the text edges like callouts, with the same border and radius and 12px inner padding. A code block is a frame (`.code-block`, from the MDX `pre` override) holding the language strip and the `<pre>`. Only the `<pre>` scrolls sideways, so the strip and its divider stay fixed and full width. The code keeps its end padding when scrolled to the end, and the scrollbar is thin in the block's muted greys. The article
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

**Projects.** No visible title (see Page titles): the featured projects with a clearly heavier treatment
than the compact `ls`-style list of other projects below (larger gap before
it: 56px desktop, 40px mobile; 16px from the label to the first row). The `// other projects` comment sits on top of that list, and the list runs
the full container width, on the featured panes' left edge. Rows share one
column template through subgrid (`11rem | 1fr | 4ch | 9ch`): name (semibold,
the only link to the repo: accent + underline on hover, focus ring), muted description, faint right-aligned
tabular year, and a small accent "write-up" link when a case study exists,
empty otherwise. No borders, separators or header row: alignment and
spacing only; rows themselves are not clickable. On mobile each project stacks:
name with the year on the right, description, then write-up.

_Editor panes._ A 2-column grid (1 on mobile) of slim panes on the `raised`
surface with `line` borders. The tab
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
bottom padding (96px, also on phones so the last line clears the dev badges). Articles keep their own end
matter inside the article: a hairline, `#tags`, `../writing` and "Back to
top".

## Design panel (development only)

The shared review panel (a "Design" button bottom-right) drives CSS custom
properties and data attributes, with defaults living in CSS. Every V1
decision is now locked (palette, surfaces, headings, writing list, home
headline and drawing size, draw-in, screen glow), so `designControls` is
empty and the panel and its pre-paint script are not rendered. Adding a
control to `src/design-controls.ts` brings it back.

## Motion

- Home drawing: each path's outline is stroked in with `stroke-dashoffset`
  (top to bottom, staggered, ~2.6 s total), fill fades in behind it, then the laptop screen
  fades up to its 50% royal-blue wash. Runs once, never blocks reading.
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
