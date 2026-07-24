# KuzeyBioMed — Static Website

Bilingual (TR/EN), light/dark themed static site. Vanilla HTML/CSS/JS, no build step. Hosted on GitHub Pages.

## Structure
```
index.html          Home
about.html          Kurumsal / About
products.html       Ürünler / Products
brands.html         Temsilcilikler / Brands
references.html     Referanslar / References
contact.html        İletişim / Contact
css/style.css       Design tokens (light/dark) + all components
js/theme.js         Dark/light toggle (localStorage + OS preference)
js/i18n.js          TR/EN engine — swaps [data-i18n] text
js/main.js          Injects header/footer partials, nav, active link
partials/           header.html + footer.html (edit once, applies everywhere)
i18n/tr.json        Turkish text
i18n/en.json        English text
logo.jpeg
```

## Editing content
- **Text:** edit `i18n/tr.json` and `i18n/en.json`. Markup references keys via `data-i18n="section.key"`.
- **Header/footer:** edit `partials/header.html` / `partials/footer.html` only.
- **Colors:** change CSS variables at top of `css/style.css` (`--teal`, `--navy`, light + `[data-theme="dark"]` blocks).

## Local preview
Header/footer load via `fetch`, which is blocked on `file://`. Run a local server:
```bash
python3 -m http.server 8000
# open http://localhost:8000
```
On GitHub Pages it just works (real HTTP server).

## Deploy (GitHub Pages)
Repo Settings → Pages → Source: `main` branch, `/root`. Site serves at the Pages URL.
```
