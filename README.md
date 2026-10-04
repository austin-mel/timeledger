# timeledger.front-end

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Woodland & Clay color palette

Tailwind CSS 4 is integrated with Vite. The custom colors are defined in
[`tailwind.config.js`](tailwind.config.js) under `theme.extend.colors`.
[`src/assets/main.css`](src/assets/main.css) loads this configuration with
`@config "../../tailwind.config.js"` and is imported by `src/main.ts`.

| Color token | Value | Intended use |
| --- | --- | --- |
| `forest-green` | `#236149` | Primary |
| `deep-pine` | `#12382D` | Deep green |
| `soft-sage` | `#D8E8CA` | Highlight |
| `lavender-mist` | `#F3EFF5` | Background |
| `slate-green` | `#52645B` | Supporting text |
| `burnt-copper` | `#A55237` | Accent |
| `copper-soft` | `rgba(165, 82, 55, 0.10)` | Soft accent background |
| `ink` | `#141A17` | Primary text |
| `charcoal-blue` | `#454955` | Depth & accents |
| `charcoal-blue-soft` | `rgba(69, 73, 85, 0.08)` | Soft neutral background |

Use these names with Tailwind color utilities, including `bg-`, `text-`, `border-`,
`ring-`, `fill-`, and `stroke-`. Hover variants and opacity modifiers work too:

```html
<section class="rounded-xl bg-lavender-mist p-6 text-ink">
  <h2 class="text-xl font-semibold text-forest-green">Timeledger</h2>
  <p class="mt-2 text-slate-green">Keep your time organized.</p>
  <span class="mt-4 inline-block rounded-full bg-soft-sage px-3 py-1 text-deep-pine">
    Ready to track
  </span>
  <button
    type="button"
    class="mt-4 block rounded-lg bg-forest-green px-4 py-2 text-lavender-mist
           hover:bg-deep-pine focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-burnt-copper"
  >
    Start timer
  </button>
  <hr class="my-4 border-charcoal-blue/20" />
  <a href="#details" class="text-burnt-copper underline">View details</a>
</section>
```

The original eight hex values match the reference image. The soft tones match
the reference HTML: copper at 10% opacity and charcoal blue at 8% opacity. Use
`bg-copper-soft` and `bg-charcoal-blue-soft` for subtle backgrounds.
Tailwind's default colors remain
available alongside this palette. See the
[Tailwind custom color documentation](https://tailwindcss.com/docs/colors#customizing-your-colors).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```
