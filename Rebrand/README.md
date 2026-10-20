# TowWise Brand Evolution & Rebrand Blueprint

This directory stores the design assets, color definitions, and architectural decisions finalized during the `/grill-me` design alignment session.

---

## 1. Master Artwork
- **File**: `Rebrand/media/towwise-retro-adventure.jpg`
- **Aesthetic**: Vintage American road-trip adventure poster featuring classic coupe towing a teardrop camper along a mountain canyon ridge at sunset.

---

## 2. Agreed Rebrand Scope & Direction

### A. Color Palette
- **Primary Shell & Header**: Transition from wine/maroon (`#52001F`) to **Vintage Classic Coupe Teal** (`#1E3A47` / `#244B5A`).
- **Accent & Highlights**: Warm **Sunset Amber** (`#E58A3C` / `#D97736`) and **Canyon Cream** (`#FDF3E3`).
- **PWA & Theme Color**: Update `themeColor` in `app/manifest.ts` and `app/layout.tsx` to `#1E3A47`.

### B. Navbar & Header Branding
- **Typography & Script**: Update `HomeIcon.tsx` to display the retro curved script "TowWise" with warm cream lettering.
- **Emblem**: Classic teal coupe & cream camper illustration replacing generic truck silhouette.
- **Navigation Bar**: Update `NavBar.tsx` to vintage teal with warm amber accents.

### C. App Icons & OpenGraph
- **PWA Icons**: Use full illustrated scene at 512×512 and 192×192 in `public/icons/`.
- **Favicon & Apple Touch**: Update `app/favicon.ico` and apple touch icon.
- **OpenGraph**: Create `public/opengraph-image.png` using the full illustrated adventure card.

### D. In-App Presentation
- **Hero Adventure Banner**: Feature the artwork in a dedicated header card in the Hero section alongside the welcome headline, preserving high-contrast readability for calculation and search tools below.
