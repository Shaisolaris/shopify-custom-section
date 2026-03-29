# Shopify Custom Sections

Production-grade Shopify Online Store 2.0 custom sections built for real client projects. Each section is fully configurable via the theme editor with no code required, supports all metafield types, and is built to Shopify's section schema standards.

## Sections

### Hero Banner Pro (`sections/hero-banner.liquid`)
Full-featured hero section with multiple layout and media options.

**Features:**
- Full-width or split (text + image) layout
- MP4 video background with image fallback
- Configurable overlay color and opacity
- Animated content entry (fade-up with configurable delays)
- Live countdown timer (ISO 8601 date input)
- Two-button row with three style variants each (primary, secondary, outline)
- Heading tag selector (H1 or H2 for SEO control)
- Five height options including full-screen
- Content alignment: left, center, right

### Featured Collection Pro (`sections/featured-collection.liquid`)
Product grid from any collection with filtering and quick-add.

**Features:**
- Collection picker with 2–5 products per row
- Client-side tag filtering with animated toggle
- Hover secondary image swap
- Quick-add to cart (single variant) or choose options (multi-variant)
- Sale/New/Sold Out badges with automatic discount percentage
- Star rating display via Reviews metafields
- Load More button
- Configurable padding

### Testimonials Pro (`sections/testimonials.liquid`)
Multi-block testimonials with rotating carousel.

**Features:**
- Up to 20 testimonial blocks
- Star rating (1–5) per block
- Customer photo or auto-generated initials avatar
- Verified Purchase badge
- Three card styles: minimal, bordered, shadowed
- Auto-rotating carousel with configurable speed
- Prev/next arrows and dot navigation
- 1–4 cards per view (desktop)
- Autoplay pauses on hover

### Announcement Bar (`sections/announcement-bar.liquid`)
Rotating announcement strip for the top of the page.

**Features:**
- Multiple message blocks with auto-rotation
- Configurable background and text color
- Optional emoji/icon prefix per message
- Optional URL per message
- Prev/next arrows
- Configurable rotation speed

### FAQ (`sections/faq.liquid`)
Accessible accordion FAQ with optional two-column layout.

**Features:**
- Native `<details>` / `<summary>` for zero-JS accessibility
- Animated chevron icon
- Optional two-column grid layout
- Unlimited blocks via theme editor
- Configurable heading and padding

### Image with Text Pro (`sections/image-with-text.liquid`)
Flexible split section with modular content blocks.

**Features:**
- Image left or right layout
- Configurable image width (30–70%)
- Four aspect ratio options (adapt, square, portrait, wide)
- Video URL with play button overlay modal
- Modular content blocks: eyebrow, heading (H1/H2/H3), text, button, feature list, stats
- Feature list with checkmark icons (one item per line)
- Stats row (up to 3 number + label pairs)

## Snippets

- `price.liquid` — Product price with sale/compare-at display
- `star-rating.liquid` — SVG star rating for metafield ratings
- `icon-arrow.liquid` — SVG arrow icon for links

## Assets

- `theme.css` — All section styles with CSS custom properties for theming
- `theme.js` — Intersection observer animations, countdown timer, tag filtering, quick-add cart, testimonial slider, announcement bar rotation, video modal

## Configuration

`config/settings_schema.json` exposes theme-level settings:
- Color palette (primary, secondary, accent, text, border, backgrounds)
- Typography (heading and body font pickers, body size)
- Layout (page width, section spacing)
- Cart type (page or drawer)
- Product card defaults

## Requirements

- Shopify Online Store 2.0
- Dawn or any OS 2.0-compatible base theme
- For star ratings: Shopify Product Reviews app or Judgeme with metafield mapping

## Usage

Copy individual section files into your theme's `sections/` directory. Snippets go into `snippets/`. Include the CSS and JS in your theme layout, or add them to the section files directly using `{% stylesheet %}` and `{% javascript %}` tags.
