# Vendored icons

These SVGs are inlined at **build time** by `layouts/partials/icon.html` — there is
no icon web font, no client-side JavaScript, and no runtime requests. Only the icons
actually referenced by a page are emitted into the built site.

Each file is saved under ListenUp's own icon name (e.g. Lucide's `smartphone` is
vendored as `phone.svg`), so the registry's names stay stable even if upstream
renames an icon. To add an icon, drop its SVG here named `<your-name>.svg` and
reference it as `{{< /* anything */ >}} icon="<your-name>"`.

## Sources & licenses

- **UI icons** — [Lucide](https://lucide.dev), **ISC License** (see below). Lucide
  SVGs already use `stroke="currentColor"`, so they theme automatically.
- **Brand glyphs** (`android`, `apple`, `github`) — [Simple Icons](https://simpleicons.org),
  **CC0 1.0** (public domain). These ship without a `fill`; the registry injects
  `fill="currentColor"` so they pick up the surrounding text color. The underlying
  logos remain trademarks of their respective owners and are used here only for
  nominative identification (labelling supported platforms / linking to source).

### Lucide — ISC License

```
ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of
Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```
