# seo.furniture — Lead Gen Site Design Spec

## Purpose

A 11-page lead generation site targeting furniture retailers who need SEO services. Captures enquiries via contact forms on every page. Anonymous brand ("SEO.Furniture"), global/neutral English content, single hub + spoke semantic SEO architecture.

## Domain & Deployment

- Domain: `seo.furniture`
- Stack: Astro 5, Tailwind 4 (Vite plugin), `@astrojs/sitemap`
- Deploy: GitHub (`sunnyp81/seo-furniture`) -> Cloudflare Pages
- Build: `npm run build`, output `dist`, NODE_VERSION=22

## Target Keywords

| Keyword | US vol | UK vol | Global vol | CPC |
|---------|--------|--------|------------|-----|
| seo for furniture stores | 300 | 50 | 800 | $7.00 |
| furniture store seo | 150 | 10 | 200 | — |
| seo services for furniture store | 100 | 0 | 150 | — |
| seo for furniture | 100 | 10 | 150 | — |
| seo for furniture dealers | 80 | 30 | 150 | — |
| seo for furniture shops | 80 | 0 | 100 | — |
| seo for furniture website | 80 | 30 | 100 | — |
| seo keywords for furniture | 60 | 10 | 90 | — |
| furniture seo | 60 | 0 | 90 | — |
| best seo practices for furniture store | 40 | 40 | 100 | — |
| seo for office furniture | 20 | 0 | 40 | — |
| google maps seo for furniture stores | 10 | 0 | 10 | — |
| seo for ecommerce furniture websites | 10 | 0 | 10 | — |

KD 0 across the board.

## Site Map

| # | Path | Target Keyword | Intent | Schema Types |
|---|------|---------------|--------|-------------|
| 1 | `/` | seo for furniture stores | Commercial | ProfessionalService, WebSite, Organization |
| 2 | `/furniture-store-seo/` | furniture store seo | Commercial | Article, FAQPage |
| 3 | `/seo-services-for-furniture/` | seo services for furniture store | Commercial | Service |
| 4 | `/furniture-website-seo/` | seo for furniture website | Informational | Article, HowTo |
| 5 | `/furniture-seo-keywords/` | seo keywords for furniture | Informational | Article, FAQPage |
| 6 | `/local-seo-furniture-stores/` | google maps seo for furniture stores | Informational | Article, HowTo |
| 7 | `/furniture-ecommerce-seo/` | seo for ecommerce furniture websites | Informational | Article, FAQPage |
| 8 | `/furniture-product-description-seo/` | seo product description furniture | Informational | Article, HowTo |
| 9 | `/furniture-store-seo-checklist/` | best seo practices for furniture store | Informational | Article, ItemList |
| 10 | `/office-furniture-seo/` | seo for office furniture | Commercial | Article |
| 11 | `/contact/` | — | Transactional | ContactPage |

## Internal Linking Structure

Every spoke links to the hub (`/`) in the first paragraph using the head keyword as anchor text. Every spoke links to 2-3 sibling spokes via a Related component at the bottom. The hub links to all spokes via an in-content section where each spoke gets a 2-3 sentence summary with a link using the spoke's target keyword as anchor text.

Cross-linking clusters:
- Commercial cluster: spokes 2, 3, 10 cross-link
- Technical cluster: spokes 4, 5, 8 cross-link
- Local/ecommerce cluster: spokes 6, 7 cross-link
- Checklist (spoke 9) links to all clusters as a summary piece

## Page Templates

### Hub (Homepage `/`)

1. Hero section: H1 "SEO for Furniture Stores", value prop subtitle, primary CTA button to `/contact/`
2. Problem section: why furniture retailers struggle with SEO (high competition, product-heavy sites, local vs national)
3. Spoke summaries section: each spoke gets an H2-linked card with 2-3 sentence summary. Anchor text = spoke target keyword
4. Results/proof section: stats about furniture retail SEO (industry benchmarks, not fabricated claims)
5. Contact form (inline, not just a link)
6. Word count target: 2,000-2,500

### Spoke Pages

1. Breadcrumb: Home > [Spoke Title]
2. H1: targeting spoke keyword
3. Opening paragraph: links back to hub with head keyword anchor
4. Body content: 1,500-2,500 words, genuine how-to/strategy content. Subheadings (H2/H3) use semantic variations of the target keyword
5. FAQ section: 3-5 questions with FAQPage schema where applicable
6. Related component: 2-3 sibling spoke links
7. CTA bar: "Need help with [spoke topic]?" + link to contact form
8. Contact form (inline)

### Contact Page

1. H1: "Get in Touch"
2. Form fields: Name, Email, Website URL, Message
3. No fluff, no testimonials — just the form
4. Form submission: Cloudflare Pages Functions or external (Formspree/Netlify Forms equivalent)

## Schema Strategy

JSON-LD inline per page, not injected globally.

### Global (every page)
- `BreadcrumbList` (except homepage)

### Homepage only
- `Organization`: name "SEO.Furniture", url, contactPoint
- `WebSite`: name, url, potentialAction (SearchAction not needed for 11 pages)
- `ProfessionalService`: name "SEO.Furniture", serviceType "Furniture Store SEO", areaServed (global)

### Per-spoke
- `Article`: headline, datePublished, author (Organization), publisher
- Additional schema per page as listed in site map (FAQPage, HowTo, Service, ItemList, ContactPage)

## Components

### Base.astro (layout)
- `<head>`: meta title, description, canonical, OG tags, JSON-LD slot, Tailwind styles
- `<nav>`: logo (text-based "SEO.Furniture"), links to hub + contact
- `<main>`: slot
- `<footer>`: copyright, nav links, minimal

### Breadcrumb.astro
- Props: `items: {label: string, href?: string}[]`
- Renders breadcrumb trail with BreadcrumbList JSON-LD

### Related.astro
- Props: `pages: {title: string, href: string, description: string}[]`
- Renders "Related guides" section with links to sibling spokes

### ContactForm.astro
- Props: `heading?: string`
- Renders the 4-field form
- Action: POST to a Cloudflare Pages Function at `/api/contact` or Formspree endpoint

### CTABar.astro
- Props: `text: string`
- Full-width accent-colour bar with text + "Get Started" button linking to `/contact/`

### SchemaMarkup.astro
- Props: `schema: object`
- Renders `<script type="application/ld+json">`

## Design System

### Colours
- Primary: dark navy `#0f172a` (slate-900)
- Accent: emerald `#10b981` (emerald-500)
- Background: white `#ffffff`
- Text: slate-700 body, slate-900 headings
- Muted: slate-400

### Typography
- Headings: system font stack, bold, tight tracking
- Body: system font stack, regular, relaxed leading
- No custom fonts (performance)

### Layout
- Max-width: `max-w-3xl` for content, `max-w-5xl` for hub spoke cards
- Generous vertical spacing between sections
- No stock photos, no placeholder images
- Inline SVG icons if needed (minimal)

## Static Assets

- `robots.txt`: standard, allow all, sitemap reference
- `llms.txt`: site description, pages list, contact info for AI crawlers
- `ai.txt`: explicit AI crawler allow rules
- Sitemap: auto-generated by `@astrojs/sitemap`
- OG images: Satori-generated per page (title + brand)

## Form Handling

For MVP, use Formspree (free tier, 50 submissions/mo) or a simple Cloudflare Pages Function that forwards to email. Decision at build time based on complexity budget.

## Content Guidelines

- No fabricated stats, testimonials, or client logos
- Industry benchmarks must be sourced or framed as general ("furniture retailers typically see...")
- No "we" language (anonymous brand) — use "furniture store owners" and direct address ("you/your")
- Content must be genuinely useful, not thin service page fluff
- Each spoke must stand alone as a complete guide on its sub-topic

## Success Metrics

- Rank top 5 for "seo for furniture stores" within 8 weeks
- 1-4 enquiries/month from organic traffic
- All pages indexed within 2 weeks of launch
