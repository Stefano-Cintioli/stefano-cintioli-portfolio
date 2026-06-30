# PP Editorial New — self-hosted fonts

This folder expects the following `.woff2` files from Pangram Pangram Foundry:

```
PPEditorialNew-Ultralight.woff2
PPEditorialNew-UltralightItalic.woff2
PPEditorialNew-Regular.woff2
PPEditorialNew-Italic.woff2
PPEditorialNew-Ultrabold.woff2
PPEditorialNew-UltraboldItalic.woff2
```

## How to obtain

1. Visit https://pangrampangram.com/products/editorial-new
2. Download the free trial (or full family) — Pangram Pangram delivers a ZIP via email after a short form
3. Unzip and drop the `.woff2` files into this folder

## Fallback behavior

Until the files are present, `styles.css` falls back to:
`"Iowan Old Style"` → `"Apple Garamond"` → `Georgia` → `serif`

The site stays legible and editorial on macOS (Iowan Old Style ships natively).
On Windows the fallback is Georgia, which is more generic but still readable.
Drop the PP Editorial New files in to restore the intended typography.

## License

PP Editorial New — free for personal AND commercial use under Pangram Pangram's standard EULA. No attribution required, no CDN redistribution permitted (which is why we self-host).
