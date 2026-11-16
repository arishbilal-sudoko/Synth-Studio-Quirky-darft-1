# Synthweb Studio

React + Vite single-page site. Main typeface: **Google Sans** (mono accents: Google Sans Code), loaded from Google Fonts in `index.html`.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

## Placeholders
All copy, clients, projects, services and contact details are in `src/data.js`.
Hero / statement / CTA text lives in `src/components/*.jsx`.
Artwork (logo, stickers, footer shapes, CTA illustration) is original inline SVG in `src/components/Art.jsx`.
Replace the project cards' `.project__preview` with real `<video>` / `<img>` (hover reveals it) and the contact boxes' `.contact__img` with photos.

## Motion
Mesh-gradient hero with pointer glow · line-by-line title reveal · draggable physics stickers (hero) and shapes (footer) · scroll-spun circular badges · scroll-velocity marquees · parallax project columns · hand-drawn underline annotations · drag/dot carousel · custom inverting cursor with "View"/"Drag" bubble · pill nav that detaches on scroll · reduced-motion support.
