# Client logo permissions

Track written permission for every logo in `src/assets/logo/`. Update this table when adding or removing logos. Slugs match filenames (see `scripts/generate-logo-manifest.mjs`).

> **Note:** Slugs appear when logo files are added to `src/assets/logo/`. Regenerate the manifest with `node scripts/generate-logo-manifest.mjs` and update this document for each new slug.

| Slug | Contact | Date granted | Scope | Restrictions |
|------|---------|--------------|-------|--------------|
| *(empty — add rows when logos are added)* | | | | |

## Scope values

- **Logo only** — may display the mark on this site
- **Logo + outcome** — may display mark and quoted outcome metric
- **Logo + testimonial** — may display mark and attributed quote
- **Full** — logo, outcome, testimonial, and case reference

## Adding a logo

1. Drop `slug.svg` (or `.png` / `.webp`) into `src/assets/logo/`
2. Optional: add `slug.dark.svg` for dark-mode variant
3. Optional: numeric prefix for sort order, e.g. `10-slug.svg`
4. Run `node scripts/generate-logo-manifest.mjs`
5. Add metadata in `src/lib/proof.ts` if needed (`DISPLAY_NAME_OVERRIDES`, `PROOF_LOGO_METADATA`)
6. Fill in a row in this document before deploying
