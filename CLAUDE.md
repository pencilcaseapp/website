# CLAUDE.md

The marketing website of pencil case (pencilcase.app). The app itself lives
in `pencilcaseapp/app`.

## Working here

- **Only implement what Henrik explicitly asks for.** Don't start the next
  step of a plan, a related cleanup or a nice-to-have on your own; suggest
  it instead.
- Favour the simple, readable solution, and keep comments to what the code
  can't say (most of them explain a browser quirk).
- Commits follow the Angular format (`feat(help): …`, `fix(small-tech): …`).

## Commands

```bash
npm run dev              # dev server
npm run lint             # eslint, @stylistic, hard 80-column max-len
npm run typecheck        # react-router typegen && tsc
npm run test             # vitest (watch mode); `npx vitest run` once
npm run build            # react-router build
npm run build-storybook  # `npm run storybook` serves it on :6006
```

Lint, typecheck, tests, build and the Storybook build all run in CI and
must all pass before a PR is done. Snapshot tests pin full class strings:
after a `className` change, update them with `npx vitest run -u` and commit
the `__snapshots__`. Pushing to `main` deploys to Clever Cloud (`cd.yml`).

TypeScript stays on 5.9 (`^5.9.2`), like the app repo, and Dependabot
ignores `typescript >=6`: typescript-eslint doesn't support 6.1+ yet. Lift
the pin in both repos together.

## Structure

React Router (framework mode, SSR) with Tailwind v4. Routes are listed in
`app/routes.ts`. `app/ui/` is the presentational design system (with stories
and tests), `app/components/` the page sections, `app/constants/` the copy
and data (links, plans, features, questions, small tech, help sections,
legal), `app/hooks/` the scroll and layout hooks. Use the `pca-*` theme
tokens from `app/app.css`, never raw Tailwind colours. `~/*` maps to
`app/*`.

**Links.** Every internal link is a React Router `Link`, so navigation
stays client side: through the polymorphic `TextLink`, `NavLink` and
`Button` with `as={Link}`, or a plain `Link`. A plain `<a>` (`href`) is for
external links and the app (`APP_URL`). A link to a section of the page
you are on (`/#pricing` on the startpage) glides there;
`useInstantPageChange` makes every other navigation jump, including to a
section of another page.

**Legal pages.** `/legal-notice`, `/privacy` and `/terms`, their texts in
`app/components/{legal-notice,privacy-policy,terms-of-use}/` and the "Last
updated" dates in `app/constants/legal.ts`. Change the text and the date
together. `LEGAL_LINKS` in `app/constants/links.ts` feeds the footer; the
cancel and withdraw links have no page yet (`#`).

**Help.** `/help` (index and contact form), `/help/:slug` (an article) and
`/help/:slug.md` (the raw Markdown, `routes/help-article-markdown.ts`). Each
article is a Markdown file in `app/content/help/<slug>.md` with YAML
frontmatter (`question`, `section`, `order`, optional `related` and
`draft`); its first paragraph is the summary. Section ids, titles and their
order live in `app/constants/help.ts`. Files are parsed on the server only
(`app/utils/help.server.ts`, loaders hand data down) and rendered with
`react-markdown`; links starting with `/` become router links. A `draft`
article describes something the app doesn't do yet: it gets a badge and
`noindex`. The help and `/contact` forms share `ContactForm` and don't
submit anywhere yet.

**Analytics.** Plausible, rendered in `app/root.tsx` only when
`import.meta.env.PROD`, so localhost is never counted. It sets no cookies.
The privacy policy describes it; anything that changes what is collected
updates the policy too.

## Safari's and Chrome's bars

iOS 26 Safari ignores the `theme-color` meta tag. It tints its top and
bottom bars with the colour of a fixed element it finds along that edge. To
choose the colour, render a hidden strip there: a fixed element with the
colour, masked out with `mask-image: linear-gradient(transparent,
transparent)` so nobody sees it, but Safari still picks it up (`.top-bar-tint`
over the hero in `app/app.css`, `BAR_TINT` in the mobile menu, which also
hides the hero's strip while a dialog is open).

Safari turns its bars solid over any sticky element along an edge, so don't
place sticky elements at the top or bottom of the screen. The Small Tech
panels therefore hold still without `position: sticky` on iOS (told apart
by `-webkit-touch-callout`) where scroll-driven animations exist: each
moves down with the scroll over its exit range (`stack-hold`). Their ranges
and heights use `lvh`, which doesn't change as the browser bar shrinks or
grows, so the cards stay steady. Other browsers keep sticky, with
`useStackedPanels` as the scroll fallback: Chrome on Android draws a held
panel a frame behind the scroll every other frame, so it judders.

There is no `theme-color` meta tag: on Android, Chrome would tint its bar
with it, and the bar should stay the browser's own colour there.
