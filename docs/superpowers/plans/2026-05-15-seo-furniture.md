# seo.furniture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an 11-page lead gen site for furniture retailers who need SEO services, using hub/spoke semantic architecture to rank for "seo for furniture stores" (800 global vol, KD 0).

**Architecture:** Single hub homepage targeting the head term, 9 spoke pages covering sub-topics (store SEO, services, website SEO, keywords, local, ecommerce, product descriptions, checklist, office furniture), 1 contact page. Every spoke links to hub in first paragraph; hub links to all spokes. Cross-linking via Related component by cluster (commercial, technical, local/ecommerce).

**Tech Stack:** Astro 5, Tailwind 4 (Vite plugin), @astrojs/sitemap, Formspree (contact form), Cloudflare Pages

**Project root:** `C:\Users\sunny\repos\seo-furniture\`

---

## File Structure

```
seo-furniture/
├── package.json
├── astro.config.mjs
├── src/
│   ├── styles/global.css          — Tailwind imports + custom properties
│   ├── data/site.ts               — Site config + spoke metadata for cross-linking
│   ├── layouts/Base.astro         — Head, nav, footer, schema slot
│   ├── components/
│   │   ├── Breadcrumb.astro       — Breadcrumb trail + BreadcrumbList JSON-LD
│   │   ├── Related.astro          — "Related guides" card grid
│   │   ├── ContactForm.astro      — 4-field enquiry form (Formspree)
│   │   ├── CTABar.astro           — Full-width accent CTA strip
│   │   └── SchemaMarkup.astro     — JSON-LD script renderer
│   └── pages/
│       ├── index.astro                            — Hub (head term)
│       ├── furniture-store-seo.astro              — Spoke 2
│       ├── seo-services-for-furniture.astro       — Spoke 3
│       ├── furniture-website-seo.astro            — Spoke 4
│       ├── furniture-seo-keywords.astro           — Spoke 5
│       ├── local-seo-furniture-stores.astro       — Spoke 6
│       ├── furniture-ecommerce-seo.astro          — Spoke 7
│       ├── furniture-product-description-seo.astro— Spoke 8
│       ├── furniture-store-seo-checklist.astro    — Spoke 9
│       ├── office-furniture-seo.astro             — Spoke 10
│       └── contact.astro                          — Contact page
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   ├── ai.txt
│   └── favicon.svg
└── docs/superpowers/specs/2026-05-15-seo-furniture-design.md  (exists)
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialise project with package.json**

```json
{
  "name": "seo-furniture",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^5.7.0",
    "@astrojs/sitemap": "^3.3.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0"
  }
}
```

- [ ] **Step 2: Create astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seo.furniture',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
```

- [ ] **Step 3: Create global.css**

Write to `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0f172a;
  --color-navy-light: #1e293b;
  --color-emerald: #10b981;
  --color-emerald-dark: #059669;
  --color-surface: #f8fafc;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #334155;
  background: #ffffff;
}

h1, h2, h3, h4, h5, h6 {
  color: #0f172a;
  font-weight: 700;
  letter-spacing: -0.025em;
}
```

- [ ] **Step 4: Create favicon.svg**

Write to `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0f172a"/><text x="16" y="22" text-anchor="middle" font-family="system-ui" font-weight="700" font-size="16" fill="#10b981">S</text></svg>
```

- [ ] **Step 5: Install dependencies**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm install`
Expected: node_modules created, lockfile generated

- [ ] **Step 6: Git init + initial commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git init
git add package.json package-lock.json astro.config.mjs src/styles/global.css public/favicon.svg docs/
git commit -m "scaffold: Astro 5 + Tailwind 4 project init"
```

---

### Task 2: Components + Layout

**Files:**
- Create: `src/data/site.ts`
- Create: `src/components/SchemaMarkup.astro`
- Create: `src/components/Breadcrumb.astro`
- Create: `src/components/ContactForm.astro`
- Create: `src/components/CTABar.astro`
- Create: `src/components/Related.astro`
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create site data file**

Write to `src/data/site.ts`:

```ts
export const SITE = {
  name: 'SEO.Furniture',
  url: 'https://seo.furniture',
  description: 'Specialist SEO services for furniture stores, dealers, and ecommerce retailers.',
  formspreeId: 'REPLACE_ME',
};

export interface SpokeMeta {
  title: string;
  href: string;
  description: string;
  keyword: string;
}

export const SPOKES: SpokeMeta[] = [
  {
    title: 'Furniture Store SEO',
    href: '/furniture-store-seo/',
    description: 'How furniture retailers build organic visibility that drives footfall and online sales.',
    keyword: 'furniture store seo',
  },
  {
    title: 'SEO Services for Furniture Stores',
    href: '/seo-services-for-furniture/',
    description: 'What a furniture-focused SEO engagement looks like and what to expect from an agency.',
    keyword: 'seo services for furniture store',
  },
  {
    title: 'Furniture Website SEO',
    href: '/furniture-website-seo/',
    description: 'Technical and on-page optimisation specifically for furniture retail websites.',
    keyword: 'seo for furniture website',
  },
  {
    title: 'Furniture SEO Keywords',
    href: '/furniture-seo-keywords/',
    description: 'How to research and target the keywords furniture shoppers actually search for.',
    keyword: 'seo keywords for furniture',
  },
  {
    title: 'Local SEO for Furniture Stores',
    href: '/local-seo-furniture-stores/',
    description: 'Google Business Profile, local pack rankings, and map visibility for furniture showrooms.',
    keyword: 'local seo for furniture stores',
  },
  {
    title: 'Furniture Ecommerce SEO',
    href: '/furniture-ecommerce-seo/',
    description: 'Category architecture, faceted navigation, and product page optimisation for furniture ecommerce.',
    keyword: 'furniture ecommerce seo',
  },
  {
    title: 'Furniture Product Description SEO',
    href: '/furniture-product-description-seo/',
    description: 'Writing product descriptions that rank in search and convert browsers into buyers.',
    keyword: 'furniture product description seo',
  },
  {
    title: 'Furniture Store SEO Checklist',
    href: '/furniture-store-seo-checklist/',
    description: 'A practical checklist of every SEO task a furniture retailer should complete.',
    keyword: 'furniture store seo checklist',
  },
  {
    title: 'Office Furniture SEO',
    href: '/office-furniture-seo/',
    description: 'SEO strategy for office and contract furniture suppliers targeting B2B buyers.',
    keyword: 'office furniture seo',
  },
];

export const CLUSTERS = {
  commercial: ['/furniture-store-seo/', '/seo-services-for-furniture/', '/office-furniture-seo/'],
  technical: ['/furniture-website-seo/', '/furniture-seo-keywords/', '/furniture-product-description-seo/'],
  localEcommerce: ['/local-seo-furniture-stores/', '/furniture-ecommerce-seo/'],
};

export function getRelated(currentHref: string): SpokeMeta[] {
  for (const cluster of Object.values(CLUSTERS)) {
    if (cluster.includes(currentHref)) {
      return SPOKES.filter(s => cluster.includes(s.href) && s.href !== currentHref);
    }
  }
  const checklist = SPOKES.find(s => s.href === '/furniture-store-seo-checklist/');
  return checklist ? [checklist] : [];
}
```

- [ ] **Step 2: Create SchemaMarkup component**

Write to `src/components/SchemaMarkup.astro`:

```astro
---
interface Props {
  schema: Record<string, unknown> | Record<string, unknown>[];
}
const { schema } = Astro.props;
const schemas = Array.isArray(schema) ? schema : [schema];
---
{schemas.map(s => (
  <script type="application/ld+json" set:html={JSON.stringify(s)} />
))}
```

- [ ] **Step 3: Create Breadcrumb component**

Write to `src/components/Breadcrumb.astro`:

```astro
---
interface Crumb {
  label: string;
  href?: string;
}
interface Props {
  crumbs: Crumb[];
}
const { crumbs } = Astro.props;

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.label,
    ...(crumb.href ? { item: `https://seo.furniture${crumb.href}` } : {}),
  })),
};
---
<nav aria-label="Breadcrumb" class="text-sm text-slate-400 mb-8">
  {crumbs.map((crumb, i) => (
    <>
      {i > 0 && <span class="mx-1.5">/</span>}
      {crumb.href
        ? <a href={crumb.href} class="hover:text-emerald">{crumb.label}</a>
        : <span class="text-slate-600">{crumb.label}</span>
      }
    </>
  ))}
</nav>
<script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
```

- [ ] **Step 4: Create ContactForm component**

Write to `src/components/ContactForm.astro`:

```astro
---
import { SITE } from '../data/site';
interface Props {
  heading?: string;
}
const { heading = 'Get a Free Consultation' } = Astro.props;
---
<section id="contact-form" class="bg-surface rounded-2xl p-8 md:p-12 my-16">
  <h2 class="text-2xl font-bold mb-2">{heading}</h2>
  <p class="text-slate-500 mb-8">Tell us about your furniture business and we'll outline how SEO can grow your traffic.</p>
  <form action={`https://formspree.io/f/${SITE.formspreeId}`} method="POST" class="grid gap-5">
    <div>
      <label for="name" class="block text-sm font-medium text-slate-700 mb-1">Name</label>
      <input type="text" id="name" name="name" required
        class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald" />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
      <input type="email" id="email" name="email" required
        class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald" />
    </div>
    <div>
      <label for="website" class="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
      <input type="url" id="website" name="website" placeholder="https://"
        class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald" />
    </div>
    <div>
      <label for="message" class="block text-sm font-medium text-slate-700 mb-1">Message</label>
      <textarea id="message" name="message" rows="4" required
        class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald"></textarea>
    </div>
    <button type="submit"
      class="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors w-fit">
      Send Enquiry
    </button>
  </form>
</section>
```

- [ ] **Step 5: Create CTABar component**

Write to `src/components/CTABar.astro`:

```astro
---
interface Props {
  text: string;
}
const { text } = Astro.props;
---
<aside class="bg-navy text-white rounded-2xl p-8 md:p-12 my-16 flex flex-col md:flex-row items-center justify-between gap-6">
  <p class="text-lg md:text-xl font-semibold">{text}</p>
  <a href="/contact/" class="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
    Get Started
  </a>
</aside>
```

- [ ] **Step 6: Create Related component**

Write to `src/components/Related.astro`:

```astro
---
import type { SpokeMeta } from '../data/site';
interface Props {
  pages: SpokeMeta[];
}
const { pages } = Astro.props;
---
{pages.length > 0 && (
  <section class="border-t border-slate-200 pt-12 mt-16">
    <h2 class="text-xl font-bold mb-6">Related Guides</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {pages.map(page => (
        <a href={page.href}
          class="p-6 border border-slate-200 rounded-xl hover:border-emerald hover:-translate-y-0.5 transition-all no-underline text-inherit flex flex-col gap-2">
          <h3 class="text-lg font-semibold">{page.title}</h3>
          <p class="text-sm text-slate-500">{page.description}</p>
        </a>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 7: Create Base layout**

Write to `src/layouts/Base.astro`:

```astro
---
import '../styles/global.css';
import SchemaMarkup from '../components/SchemaMarkup.astro';
import { SITE } from '../data/site';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  schema?: Record<string, unknown>[];
  ogTitle?: string;
}

const { title, description, canonical, schema = [], ogTitle } = Astro.props;
const canonicalUrl = canonical || new URL(Astro.url.pathname, Astro.site).href;
const displayTitle = ogTitle || title;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalUrl}>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <meta property="og:title" content={displayTitle}>
  <meta property="og:description" content={description}>
  <meta property="og:url" content={canonicalUrl}>
  <meta property="og:site_name" content={SITE.name}>
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content={displayTitle}>
  <meta name="twitter:description" content={description}>
  {schema.map(s => (
    <script type="application/ld+json" set:html={JSON.stringify(s)} />
  ))}
</head>
<body class="min-h-screen flex flex-col">
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
    <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-navy tracking-tight">
        SEO<span class="text-emerald">.</span>Furniture
      </a>
      <nav class="flex items-center gap-6">
        <a href="/#guides" class="text-sm text-slate-600 hover:text-emerald hidden md:inline">Guides</a>
        <a href="/furniture-store-seo-checklist/" class="text-sm text-slate-600 hover:text-emerald hidden md:inline">Checklist</a>
        <a href="/contact/" class="bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors">
          Get in Touch
        </a>
      </nav>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <footer class="bg-navy text-slate-400 pt-16 pb-8 mt-20">
    <div class="max-w-5xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div>
          <div class="text-lg font-bold text-white mb-3">SEO<span class="text-emerald">.</span>Furniture</div>
          <p class="text-sm">Specialist SEO guidance for furniture retailers, showrooms, and ecommerce stores.</p>
        </div>
        <div>
          <h4 class="text-white text-xs uppercase tracking-widest font-semibold mb-4">Guides</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/furniture-store-seo/" class="hover:text-white">Furniture Store SEO</a></li>
            <li><a href="/furniture-website-seo/" class="hover:text-white">Website Optimisation</a></li>
            <li><a href="/furniture-seo-keywords/" class="hover:text-white">Keyword Research</a></li>
            <li><a href="/furniture-store-seo-checklist/" class="hover:text-white">SEO Checklist</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-xs uppercase tracking-widest font-semibold mb-4">Services</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/seo-services-for-furniture/" class="hover:text-white">SEO Services</a></li>
            <li><a href="/local-seo-furniture-stores/" class="hover:text-white">Local SEO</a></li>
            <li><a href="/furniture-ecommerce-seo/" class="hover:text-white">Ecommerce SEO</a></li>
            <li><a href="/contact/" class="hover:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 pt-6 text-xs text-slate-500">
        &copy; 2026 SEO.Furniture. All rights reserved.
      </div>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 8: Verify dev server boots**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Expected: Astro dev server starts on localhost:4321 (will 404 — no pages yet, that's fine). Kill after confirming boot.

- [ ] **Step 9: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/ public/favicon.svg
git commit -m "feat: add Base layout, all components, and site data"
```

---

### Task 3: Hub Page (Homepage)

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create the hub homepage**

Write to `src/pages/index.astro`. This is the pillar page targeting "seo for furniture stores" (300 US/50 UK vol). It links to every spoke with keyword-rich anchor text.

```astro
---
import Base from '../layouts/Base.astro';
import ContactForm from '../components/ContactForm.astro';
import { SITE, SPOKES } from '../data/site';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${SITE.url}/contact/`,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    serviceType: 'Furniture Store SEO',
    areaServed: { '@type': 'Place', name: 'Worldwide' },
  },
];
---
<Base
  title="SEO for Furniture Stores | Grow Organic Traffic & Sales"
  description="Expert SEO strategies for furniture retailers. Increase your store's search visibility, drive qualified traffic, and turn browsers into buyers."
  schema={schema}
>
  <!-- Hero -->
  <section class="bg-navy text-white py-20 md:py-28">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">SEO for Furniture Stores</h1>
      <p class="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
        Furniture shoppers start on Google. If your store isn't visible when they search for sofas, dining tables, or bedroom sets, you're handing those sales to a competitor. Specialist SEO changes that.
      </p>
      <a href="/contact/" class="inline-block bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
        Get a Free Consultation
      </a>
    </div>
  </section>

  <!-- Problem Section -->
  <section class="max-w-3xl mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold mb-6">Why Furniture Retailers Struggle with SEO</h2>
    <p class="text-lg mb-4">
      The furniture industry has a unique SEO problem. Your product catalogue might contain hundreds or thousands of items, each with variations in colour, material, and size. Search engines need to understand every page — and most furniture websites make that harder than it needs to be.
    </p>
    <p class="mb-4">
      Common issues include duplicate product descriptions copied from manufacturers, thin category pages that list products without any supporting content, and poor internal linking between related collections. Add in the challenge of competing against marketplace giants like Wayfair, IKEA, and Amazon, and it's clear why most independent furniture retailers struggle to gain organic visibility.
    </p>
    <p class="mb-4">
      Then there's the local dimension. If you operate a physical showroom, you need to appear in Google's local pack and Maps results for "[furniture store] + [city]" queries. Most furniture businesses neglect their Google Business Profile or fail to build the local citations that drive map rankings.
    </p>
    <p>
      The good news: because most furniture retailers underinvest in SEO, the opportunity is significant. Keyword difficulty across furniture SEO terms is remarkably low, meaning a focused strategy can deliver results faster than in more competitive industries.
    </p>
  </section>

  <!-- Spoke Summaries -->
  <section id="guides" class="bg-surface py-16">
    <div class="max-w-5xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-4 text-center">Furniture SEO Guides</h2>
      <p class="text-center text-slate-500 mb-12 max-w-2xl mx-auto">Everything you need to understand and implement SEO for your furniture business, from keyword research to local visibility.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPOKES.map(spoke => (
          <a href={spoke.href}
            class="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald hover:-translate-y-0.5 transition-all no-underline text-inherit flex flex-col gap-2">
            <h3 class="text-lg font-semibold">{spoke.title}</h3>
            <p class="text-sm text-slate-500 flex-1">{spoke.description}</p>
            <span class="text-emerald text-sm font-medium mt-2">Read guide &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  </section>

  <!-- Why Furniture SEO Works -->
  <section class="max-w-3xl mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold mb-6">What Makes Furniture SEO Different</h2>
    <p class="mb-4">
      Furniture is a high-consideration purchase. Buyers research extensively before committing — comparing materials, reading reviews, checking dimensions, and visiting showrooms. This research phase generates enormous search volume across a wide range of informational and commercial queries.
    </p>
    <p class="mb-4">
      Unlike impulse-buy categories, furniture shoppers often take days or weeks to decide. That means every touchpoint matters. Ranking for "best leather sofas UK" puts your brand in front of a buyer who might visit your showroom three weeks later. Ranking for "how to choose a dining table size" builds trust with someone who hasn't started shortlisting retailers yet.
    </p>
    <p class="mb-4">
      A well-executed <a href="/furniture-store-seo/" class="text-emerald hover:underline">furniture store SEO</a> strategy captures traffic at every stage of this journey. <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">Keyword research</a> identifies what your customers actually search for. <a href="/furniture-website-seo/" class="text-emerald hover:underline">Website optimisation</a> ensures search engines can crawl and index your catalogue. <a href="/local-seo-furniture-stores/" class="text-emerald hover:underline">Local SEO</a> drives footfall to your showroom.
    </p>
    <p>
      The result: sustainable, compounding organic traffic that doesn't disappear when you stop paying for ads. Furniture retailers who invest in SEO typically see their organic channel become their highest-ROI acquisition source within 6-12 months.
    </p>
  </section>

  <!-- Industry Benchmarks -->
  <section class="bg-surface py-16">
    <div class="max-w-3xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-6">Furniture Retail SEO: The Opportunity</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <div class="text-3xl font-bold text-emerald mb-2">72%</div>
          <p class="text-sm text-slate-500">of furniture buyers start their research on a search engine</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <div class="text-3xl font-bold text-emerald mb-2">3-6 mo</div>
          <p class="text-sm text-slate-500">typical timeline for measurable ranking improvements in furniture SEO</p>
        </div>
        <div class="bg-white p-6 rounded-xl border border-slate-200 text-center">
          <div class="text-3xl font-bold text-emerald mb-2">KD 0</div>
          <p class="text-sm text-slate-500">keyword difficulty for most furniture SEO terms — low competition, high opportunity</p>
        </div>
      </div>
      <p class="text-sm text-slate-400">
        The 72% figure reflects general retail search behaviour reported by Google/Ipsos retail studies. KD values based on Ahrefs data for "seo for furniture stores" and related terms as of May 2026.
      </p>
    </div>
  </section>

  <!-- Contact Form -->
  <div class="max-w-3xl mx-auto px-6">
    <ContactForm />
  </div>
</Base>
```

- [ ] **Step 2: Verify homepage renders**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Open: `http://localhost:4321/`
Expected: Full homepage with hero, problem section, 9 spoke cards, benchmarks, contact form. Nav and footer render correctly.

- [ ] **Step 3: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/pages/index.astro
git commit -m "feat: add hub homepage targeting 'seo for furniture stores'"
```

---

### Task 4: Commercial Spoke Pages

**Files:**
- Create: `src/pages/furniture-store-seo.astro`
- Create: `src/pages/seo-services-for-furniture.astro`
- Create: `src/pages/office-furniture-seo.astro`

- [ ] **Step 1: Create furniture-store-seo.astro**

Write to `src/pages/furniture-store-seo.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/furniture-store-seo/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Furniture Store SEO: The Complete Guide to Ranking Your Retail Business',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does furniture store SEO take to show results?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most furniture retailers see measurable ranking improvements within 3-6 months. Quick wins like Google Business Profile optimisation and fixing technical issues can show results in weeks, while content-driven strategies typically take 4-8 months to compound.' },
      },
      {
        '@type': 'Question',
        name: 'Is SEO worth it for a small furniture shop?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Small furniture shops often benefit more from SEO than large chains because local search intent is high and competition at the local level is lower. A single sofa sale from organic search can deliver ROI that justifies months of SEO investment.' },
      },
      {
        '@type': 'Question',
        name: 'What SEO budget should a furniture store set?',
        acceptedAnswer: { '@type': 'Answer', text: 'Furniture store SEO budgets typically range from £500-2,500/month depending on the scope. A local single-showroom business can start at the lower end focusing on local SEO and Google Business Profile. Multi-location or ecommerce retailers with large catalogues will need more investment in technical SEO and content.' },
      },
    ],
  },
];
---
<Base
  title="Furniture Store SEO: Complete Guide to Ranking Your Business"
  description="Learn how furniture stores can increase organic search visibility. Covers on-page SEO, technical optimisation, content strategy, and local search for furniture retailers."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Furniture Store SEO' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Furniture Store SEO: The Complete Guide to Ranking Your Retail Business</h1>

    <p class="text-lg mb-6">
      If you're a furniture retailer looking to grow organic traffic, you're in the right place. <a href="/" class="text-emerald hover:underline">SEO for furniture stores</a> is one of the highest-ROI marketing channels available — and most of your competitors are barely scratching the surface.
    </p>

    <p class="mb-4">
      This guide covers everything a furniture store owner or marketing manager needs to know about search engine optimisation: from the fundamentals of how search engines evaluate furniture websites, through to advanced strategies for competing against marketplace giants like Wayfair and IKEA.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Why Furniture Store SEO Matters</h2>

    <p class="mb-4">
      Furniture is a research-heavy purchase. Buyers compare options across multiple websites before making a decision, and that research almost always starts with a search engine. The retailer that appears at the top of those search results gets the first impression — and often the sale.
    </p>
    <p class="mb-4">
      Unlike paid advertising, organic search traffic compounds over time. A product category page that ranks well today will continue driving visitors for months or years with minimal ongoing cost. For furniture retailers operating on tight margins, that predictability is invaluable.
    </p>
    <p class="mb-4">
      The furniture vertical also benefits from relatively low keyword difficulty. While finance, health, and SaaS companies battle for positions on terms with KD scores of 60-80+, furniture SEO terms frequently sit at KD 0-15. This means a well-executed strategy can deliver results faster than in most other industries.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">The Five Pillars of Furniture Store SEO</h2>

    <h3 class="text-xl font-bold mt-8 mb-3">1. Technical Foundation</h3>
    <p class="mb-4">
      Before investing in content or links, your <a href="/furniture-website-seo/" class="text-emerald hover:underline">furniture website</a> needs a solid technical foundation. Search engines need to be able to crawl your entire product catalogue efficiently. Common technical issues in furniture sites include:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Faceted navigation creating duplicate URLs</strong> — colour, material, and size filters can generate thousands of indexable pages with near-identical content</li>
      <li><strong>Slow page speed from unoptimised product images</strong> — high-resolution furniture photography is essential for sales but devastating for Core Web Vitals if not properly compressed and lazy-loaded</li>
      <li><strong>Thin or missing category page content</strong> — a page that lists 40 sofas with no supporting text gives search engines nothing to rank</li>
      <li><strong>Broken internal links from discontinued products</strong> — furniture ranges rotate seasonally, and dead links accumulate fast</li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-3">2. Keyword Strategy</h3>
    <p class="mb-4">
      Effective <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">furniture keyword research</a> goes beyond obvious product terms. Your keyword map should cover three intent layers:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Transactional:</strong> "buy oak dining table", "leather corner sofa sale" — these drive direct sales</li>
      <li><strong>Commercial investigation:</strong> "best sofas for families with pets", "solid wood vs veneer dining table" — these capture mid-funnel researchers</li>
      <li><strong>Informational:</strong> "how to measure for a new sofa", "what size rug for living room" — these build trust and email lists</li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-3">3. On-Page Content</h3>
    <p class="mb-4">
      Every indexable page on your site needs unique, genuinely useful content. For furniture stores, this means writing original <a href="/furniture-product-description-seo/" class="text-emerald hover:underline">product descriptions</a> (not copying from the manufacturer), adding buying guides to category pages, and creating supporting content that answers the questions furniture shoppers ask.
    </p>
    <p class="mb-4">
      Category pages are where most furniture retailers leave the most SEO value on the table. A "Sofas" category page should include 300-500 words of genuine editorial content above or below the product grid: what to consider when buying a sofa, material comparisons, size guidance, and links to relevant subcategories and guides.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">4. Local Search Visibility</h3>
    <p class="mb-4">
      If you operate a physical showroom, <a href="/local-seo-furniture-stores/" class="text-emerald hover:underline">local SEO</a> is non-negotiable. The query "furniture store near me" has enormous volume, and Google's local pack (the map results) appears above organic listings for these searches.
    </p>
    <p class="mb-4">
      Your Google Business Profile is the single most important local ranking factor. It needs complete, accurate information: business hours, photos of your showroom (updated regularly), product categories, and a steady stream of genuine customer reviews.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">5. Link Building and Authority</h3>
    <p class="mb-4">
      Furniture retailers have natural link-building opportunities that most don't exploit. Interior design bloggers, home renovation publications, and local business directories are all potential sources of high-quality backlinks. Sponsoring a local home show, contributing expert commentary to a regional publication, or creating a genuinely useful room-planning tool can all generate links naturally.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Competing Against Marketplace Giants</h2>
    <p class="mb-4">
      IKEA, Wayfair, Amazon, and DFS dominate broad furniture terms. Trying to outrank them for "sofas" is a losing battle. Instead, focus on the queries they can't win:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Long-tail product terms:</strong> "handmade reclaimed wood coffee table" beats "coffee table"</li>
      <li><strong>Local + product combinations:</strong> "furniture store Manchester" or "bespoke kitchens Bristol"</li>
      <li><strong>Expert content:</strong> buying guides, material comparisons, and care instructions that marketplaces don't invest in</li>
      <li><strong>Brand + review queries:</strong> own the conversation about your brand in search results</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Measuring Furniture SEO Success</h2>
    <p class="mb-4">
      Track these metrics monthly to gauge whether your SEO investment is working:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Organic sessions</strong> — total traffic from non-branded organic search</li>
      <li><strong>Keyword visibility</strong> — how many target keywords you rank in positions 1-10</li>
      <li><strong>Organic revenue/leads</strong> — the bottom line: sales or enquiries attributed to organic search</li>
      <li><strong>Indexed pages</strong> — are search engines finding and indexing your product catalogue?</li>
      <li><strong>Core Web Vitals</strong> — site speed metrics that directly affect rankings</li>
    </ul>

    <CTABar text="Want an expert to handle your furniture store's SEO?" />

    <h2 class="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>

    <div class="space-y-6 mb-12">
      <div>
        <h3 class="font-semibold mb-2">How long does furniture store SEO take to show results?</h3>
        <p class="text-slate-600">Most furniture retailers see measurable ranking improvements within 3-6 months. Quick wins like Google Business Profile optimisation and fixing technical issues can show results in weeks, while content-driven strategies typically take 4-8 months to compound.</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Is SEO worth it for a small furniture shop?</h3>
        <p class="text-slate-600">Yes. Small furniture shops often benefit more from SEO than large chains because local search intent is high and competition at the local level is lower. A single sofa sale from organic search can deliver ROI that justifies months of SEO investment.</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">What SEO budget should a furniture store set?</h3>
        <p class="text-slate-600">Furniture store SEO budgets typically range from £500-2,500/month depending on the scope. A local single-showroom business can start at the lower end focusing on local SEO and Google Business Profile. Multi-location or ecommerce retailers with large catalogues will need more investment in technical SEO and content.</p>
      </div>
    </div>

    <Related pages={related} />
    <ContactForm heading="Get Help With Your Furniture Store's SEO" />
  </article>
</Base>
```

- [ ] **Step 2: Create seo-services-for-furniture.astro**

Write to `src/pages/seo-services-for-furniture.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/seo-services-for-furniture/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Furniture Store SEO Services',
    provider: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
    serviceType: 'Search Engine Optimisation',
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    description: 'Professional SEO services designed specifically for furniture retailers, showrooms, and ecommerce stores.',
  },
];
---
<Base
  title="SEO Services for Furniture Stores | What to Expect"
  description="What professional SEO services for furniture retailers include, how pricing works, and how to evaluate whether an agency understands your industry."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'SEO Services for Furniture' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">SEO Services for Furniture Stores: What to Expect</h1>

    <p class="text-lg mb-6">
      Hiring an SEO agency or consultant for your furniture business is a significant investment. This guide explains what a professional <a href="/" class="text-emerald hover:underline">furniture SEO</a> engagement typically includes, how to evaluate providers, and what results you should realistically expect.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">What Furniture SEO Services Include</h2>

    <p class="mb-4">
      A comprehensive SEO service for a furniture retailer should cover four core areas. Any provider who focuses on only one while ignoring the others is unlikely to deliver lasting results.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Technical Audit and Fixes</h3>
    <p class="mb-4">
      The engagement starts with a thorough technical audit of your website. For furniture sites, this means checking how your product catalogue is crawled and indexed, identifying duplicate content from faceted navigation, auditing page speed (furniture sites are image-heavy), and ensuring your site architecture makes it easy for search engines to understand your product hierarchy.
    </p>
    <p class="mb-4">
      Expect the technical phase to take 2-4 weeks. The audit should produce a prioritised list of fixes with estimated impact. High-priority items typically include fixing crawl errors, implementing proper canonical tags, compressing product images, and resolving any indexation issues.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Keyword Research and Content Strategy</h3>
    <p class="mb-4">
      Your SEO provider should conduct thorough <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">keyword research</a> specific to the furniture industry. This means mapping keywords to every commercial page on your site (categories, subcategories, key products) and identifying content gaps where new pages or guides could capture additional search traffic.
    </p>
    <p class="mb-4">
      The content strategy should include a publishing calendar with topics, target keywords, and content formats. Good providers will also audit your existing content for opportunities — updating page titles, rewriting thin product descriptions, and adding FAQ sections to key landing pages.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">On-Page Optimisation</h3>
    <p class="mb-4">
      This is the ongoing work of improving individual pages: writing unique <a href="/furniture-product-description-seo/" class="text-emerald hover:underline">product descriptions</a>, adding structured data markup, optimising title tags and meta descriptions, improving internal linking between related products and categories, and creating or enhancing category page content.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Local SEO (If Applicable)</h3>
    <p class="mb-4">
      For furniture retailers with physical showrooms, <a href="/local-seo-furniture-stores/" class="text-emerald hover:underline">local SEO</a> should be a core component. This includes Google Business Profile optimisation, local citation building, review management strategy, and creating location-specific landing pages if you operate multiple showrooms.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">How Furniture SEO Pricing Works</h2>

    <p class="mb-4">
      SEO pricing for furniture retailers varies widely, but here's a realistic framework:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Small/local furniture shop (1 showroom):</strong> £500-1,000/month — focused on local SEO, Google Business Profile, and basic on-page fixes</li>
      <li><strong>Mid-size retailer (2-5 locations or small ecommerce):</strong> £1,000-2,500/month — full technical SEO, content creation, local SEO across locations</li>
      <li><strong>Large ecommerce furniture retailer:</strong> £2,500-5,000+/month — enterprise-level technical SEO, large-scale content production, link building, international SEO</li>
    </ul>
    <p class="mb-4">
      Be cautious of agencies quoting significantly below these ranges. SEO that's done properly requires skilled human time — there are no shortcuts that deliver sustainable results.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">How to Evaluate an SEO Provider</h2>

    <p class="mb-4">Ask these questions before signing:</p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Do they have furniture or retail experience?</strong> — The furniture vertical has specific challenges (image-heavy pages, seasonal ranges, faceted navigation) that generalist agencies may not understand</li>
      <li><strong>Can they show case studies with traffic data?</strong> — Vague claims of "increased visibility" mean nothing without Google Search Console or analytics screenshots</li>
      <li><strong>What does their reporting look like?</strong> — You should receive monthly reports showing keyword rankings, traffic trends, completed work, and planned next steps</li>
      <li><strong>Who will actually do the work?</strong> — Some agencies sell senior consultants but deliver junior staff. Ask who your day-to-day contact will be</li>
      <li><strong>What's the minimum contract term?</strong> — SEO takes time, so 6-month minimums are reasonable. Avoid 12+ month lock-ins with no exit clause</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Red Flags When Hiring</h2>

    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>Guaranteeing specific rankings ("We'll get you to #1 in 30 days")</li>
      <li>Refusing to explain their methods</li>
      <li>Focusing exclusively on link building without addressing technical issues or content</li>
      <li>No mention of Google Search Console or analytics access</li>
      <li>Pricing that seems too good to be true (£99/month "SEO packages")</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Timeline: What to Expect</h2>

    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Month 1:</strong> Technical audit, keyword research, strategy document</li>
      <li><strong>Months 2-3:</strong> Technical fixes implemented, initial content created, on-page optimisation begins</li>
      <li><strong>Months 3-6:</strong> Content publishing ramps up, rankings begin moving, first measurable traffic increases</li>
      <li><strong>Months 6-12:</strong> Compounding returns — established pages climb, new content starts ranking, organic traffic becomes a predictable channel</li>
    </ul>

    <CTABar text="Looking for SEO services tailored to furniture retail?" />

    <Related pages={related} />
    <ContactForm heading="Discuss SEO Services for Your Furniture Business" />
  </article>
</Base>
```

- [ ] **Step 3: Create office-furniture-seo.astro**

Write to `src/pages/office-furniture-seo.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/office-furniture-seo/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Office Furniture SEO: Reaching B2B Buyers Through Search',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
];
---
<Base
  title="Office Furniture SEO: Reaching B2B Buyers Through Search"
  description="SEO strategies for office and contract furniture suppliers. Covers B2B keyword targeting, product page optimisation, and lead generation for commercial furniture."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Office Furniture SEO' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Office Furniture SEO: Reaching B2B Buyers Through Search</h1>

    <p class="text-lg mb-6">
      Office and contract furniture operates in a different SEO landscape from residential retail. The buyers are procurement managers, facilities teams, and interior designers — not consumers browsing on a Sunday afternoon. Your <a href="/" class="text-emerald hover:underline">SEO for furniture stores</a> strategy needs to reflect that difference.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">How Office Furniture Search Behaviour Differs</h2>

    <p class="mb-4">
      B2B furniture buyers search differently from consumers. They use more specific, technical language: "height adjustable sit-stand desk 1600mm" rather than "standing desk". They search for bulk terms: "office chairs wholesale", "contract furniture supplier UK". And they often search by specification rather than style.
    </p>
    <p class="mb-4">
      This creates an opportunity. While consumer furniture terms face stiff competition from marketplaces, B2B office furniture terms are far less competitive. A well-optimised product page targeting "acoustic office pods UK" or "hot desking furniture solutions" can rank quickly and attract high-value enquiries.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Keyword Strategy for Office Furniture</h2>

    <p class="mb-4">
      Build your <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">keyword strategy</a> around these B2B intent categories:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Product + specification:</strong> "ergonomic task chair lumbar support", "boardroom table 3000mm"</li>
      <li><strong>Product + use case:</strong> "call centre furniture", "school classroom desks and chairs"</li>
      <li><strong>Product + buying intent:</strong> "office furniture supplier", "bulk desk order UK"</li>
      <li><strong>Compliance and standards:</strong> "BIFMA certified office chairs", "fire-rated office furniture"</li>
      <li><strong>Problem-solving:</strong> "how to furnish a hybrid office", "open plan office noise solutions"</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Product Page Optimisation for B2B</h2>

    <p class="mb-4">
      Office furniture <a href="/furniture-product-description-seo/" class="text-emerald hover:underline">product pages</a> need to work harder than consumer equivalents. B2B buyers want specifications, certifications, lead times, and bulk pricing information. Your product pages should include:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>Complete technical specifications in a structured format (dimensions, weight capacity, materials, certifications)</li>
      <li>CAD files or space planning documents where relevant</li>
      <li>Lead time and availability information</li>
      <li>Related products (matching desk + chair + storage combinations)</li>
      <li>Case study or installation gallery showing the product in a real office environment</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Content That Attracts Procurement Buyers</h2>

    <p class="mb-4">
      Procurement teams research extensively before requesting quotes. Content that addresses their concerns will attract them to your site:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Workspace planning guides:</strong> "How to furnish a 50-person office" with floor plans, product recommendations, and budget ranges</li>
      <li><strong>Compliance content:</strong> guides to DSE regulations, fire safety standards for office furniture, sustainability certifications (FSC, PEFC, Cradle to Cradle)</li>
      <li><strong>Trend reports:</strong> "Office furniture trends 2026" covering hybrid working, biophilic design, and acoustic solutions</li>
      <li><strong>Comparison content:</strong> "Task chair vs executive chair: which does your team need?" with objective criteria</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Lead Generation Through SEO</h2>

    <p class="mb-4">
      Unlike consumer furniture where the goal is an online sale, office furniture SEO is about generating qualified leads. Optimise your conversion path:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>Every product page should have a clear "Request a Quote" CTA</li>
      <li>Offer downloadable resources (brochures, specification sheets, space planning tools) in exchange for email addresses</li>
      <li>Create dedicated landing pages for key sectors: education, healthcare, corporate, coworking</li>
      <li>Add case studies with named clients (with permission) — B2B buyers want social proof from their industry</li>
    </ul>

    <CTABar text="Need help ranking your office furniture business?" />

    <Related pages={related} />
    <ContactForm heading="Get Help With Office Furniture SEO" />
  </article>
</Base>
```

- [ ] **Step 4: Verify all three pages render**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Check: `/furniture-store-seo/`, `/seo-services-for-furniture/`, `/office-furniture-seo/`
Expected: All render with breadcrumbs, content, Related cards linking to each other (commercial cluster), CTABar, and ContactForm.

- [ ] **Step 5: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/pages/furniture-store-seo.astro src/pages/seo-services-for-furniture.astro src/pages/office-furniture-seo.astro
git commit -m "feat: add commercial spoke pages (store seo, services, office)"
```

---

### Task 5: Technical Spoke Pages

**Files:**
- Create: `src/pages/furniture-website-seo.astro`
- Create: `src/pages/furniture-seo-keywords.astro`
- Create: `src/pages/furniture-product-description-seo.astro`

- [ ] **Step 1: Create furniture-website-seo.astro**

Write to `src/pages/furniture-website-seo.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/furniture-website-seo/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Furniture Website SEO: Technical and On-Page Optimisation Guide',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Optimise a Furniture Website for Search Engines',
    step: [
      { '@type': 'HowToStep', name: 'Audit your site structure', text: 'Map your product hierarchy and ensure search engines can crawl every category and product page through internal links.' },
      { '@type': 'HowToStep', name: 'Fix image performance', text: 'Compress product images, implement lazy loading, and serve WebP format with appropriate alt text.' },
      { '@type': 'HowToStep', name: 'Resolve duplicate content', text: 'Add canonical tags to faceted navigation URLs and configure URL parameters in Google Search Console.' },
      { '@type': 'HowToStep', name: 'Add structured data', text: 'Implement Product, Offer, and BreadcrumbList schema on all product and category pages.' },
      { '@type': 'HowToStep', name: 'Optimise category pages', text: 'Add 300-500 words of unique editorial content to every indexable category page.' },
    ],
  },
];
---
<Base
  title="Furniture Website SEO: Technical & On-Page Optimisation Guide"
  description="How to optimise a furniture website for search engines. Covers site architecture, image optimisation, faceted navigation, structured data, and category page content."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Furniture Website SEO' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Furniture Website SEO: Technical and On-Page Optimisation Guide</h1>

    <p class="text-lg mb-6">
      A furniture website presents unique technical challenges for search engines. Product catalogues with hundreds of items, high-resolution imagery, faceted filtering, and seasonal range changes create a complex crawling and indexing landscape. This guide covers how to make your furniture website technically sound for <a href="/" class="text-emerald hover:underline">SEO</a>.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Site Architecture for Furniture Retailers</h2>

    <p class="mb-4">
      Your site structure should mirror how customers think about furniture, not how your warehouse organises stock. A logical hierarchy might look like:
    </p>
    <pre class="bg-surface p-4 rounded-lg text-sm mb-4 overflow-x-auto">
Homepage
├── Living Room
│   ├── Sofas
│   │   ├── Corner Sofas
│   │   ├── 2-Seater Sofas
│   │   └── Sofa Beds
│   ├── Coffee Tables
│   └── TV Units
├── Bedroom
│   ├── Beds
│   ├── Wardrobes
│   └── Bedside Tables
├── Dining
│   ├── Dining Tables
│   ├── Dining Chairs
│   └── Sideboards
└── Guides / Blog</pre>
    <p class="mb-4">
      Every product should be reachable within 3-4 clicks from the homepage. Use breadcrumb navigation on every page so both users and search engines understand the hierarchy. If your catalogue is large, implement a clear faceted navigation system — but handle the SEO implications carefully (see below).
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Image Optimisation for Furniture Sites</h2>

    <p class="mb-4">
      Furniture retailers rely on visual presentation more than almost any other ecommerce vertical. High-quality product photography is essential for sales — but unoptimised images are the single biggest performance killer on furniture websites.
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Serve WebP (or AVIF) with JPEG fallback</strong> — modern formats reduce file size by 25-35% with no visible quality loss</li>
      <li><strong>Implement responsive images</strong> — use srcset to serve smaller images on mobile devices. A 2400px hero image is unnecessary on a 375px-wide phone screen</li>
      <li><strong>Lazy load below-the-fold images</strong> — only load product thumbnails as users scroll. The first 1-2 visible images should load eagerly</li>
      <li><strong>Write descriptive alt text</strong> — "Grey velvet 3-seater Chesterfield sofa with buttoned back" is far better than "sofa-1.jpg" for both accessibility and image search rankings</li>
      <li><strong>Optimise image file names</strong> — rename uploaded images to include the product name: "grey-velvet-chesterfield-sofa.webp"</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Handling Faceted Navigation</h2>

    <p class="mb-4">
      Faceted navigation (filters for colour, material, price, size) is essential for furniture shoppers — but it creates an SEO nightmare if not handled properly. Each filter combination generates a unique URL, potentially creating thousands of thin, duplicate pages.
    </p>
    <p class="mb-4">
      The solution is a hybrid approach:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Index valuable filter combinations:</strong> "oak dining tables", "leather sofas", "velvet corner sofas" — these are terms people actually search for. Create clean, indexable URLs with unique content for these pages</li>
      <li><strong>Noindex low-value combinations:</strong> price ranges, multiple-filter combinations, and sorting options should be noindexed or blocked from crawling</li>
      <li><strong>Use canonical tags:</strong> point filtered URLs back to the parent category unless the filter page is intentionally indexed</li>
      <li><strong>Configure URL parameters</strong> in Google Search Console to tell Google which parameters to ignore</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Structured Data for Furniture Pages</h2>

    <p class="mb-4">
      Implement JSON-LD structured data on every page type:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Product + Offer:</strong> on every product page — name, description, image, price, availability, SKU, brand</li>
      <li><strong>BreadcrumbList:</strong> on every page — mirrors your breadcrumb navigation</li>
      <li><strong>CollectionPage:</strong> on category pages — describes the collection</li>
      <li><strong>FAQPage:</strong> on pages with FAQ sections — buying guides, category pages with common questions</li>
      <li><strong>LocalBusiness:</strong> on your contact/showroom page — address, opening hours, phone</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Page Speed and Core Web Vitals</h2>

    <p class="mb-4">
      Google's Core Web Vitals are ranking factors. Furniture sites frequently fail these metrics due to heavy imagery and bloated page builders. Key targets:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Largest Contentful Paint (LCP):</strong> under 2.5 seconds — preload your hero image, use CDN for assets</li>
      <li><strong>Cumulative Layout Shift (CLS):</strong> under 0.1 — set explicit width/height on all images, avoid dynamically injected content</li>
      <li><strong>Interaction to Next Paint (INP):</strong> under 200ms — minimise JavaScript, defer non-critical scripts</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Category Page Content</h2>

    <p class="mb-4">
      The biggest SEO gap on most furniture websites is thin category pages. A page listing 30 sofas with no supporting text gives search engines almost nothing to rank. Add 300-500 words of genuine editorial content to every indexable category:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>A brief introduction explaining the category and what to consider when buying</li>
      <li>Key differences between subcategories (e.g., corner sofas vs modular sofas)</li>
      <li>Internal links to related categories, buying guides, and popular products</li>
      <li>Answers to 2-3 common questions (with FAQPage schema)</li>
    </ul>

    <CTABar text="Need your furniture website technically audited?" />

    <Related pages={related} />
    <ContactForm heading="Get a Technical SEO Review of Your Furniture Website" />
  </article>
</Base>
```

- [ ] **Step 2: Create furniture-seo-keywords.astro**

Write to `src/pages/furniture-seo-keywords.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/furniture-seo-keywords/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Furniture SEO Keywords: How to Find What Your Customers Search For',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the most searched furniture keywords?',
        acceptedAnswer: { '@type': 'Answer', text: 'The highest-volume furniture keywords are broad product terms like "sofas", "dining tables", and "beds". However, these are extremely competitive. More actionable targets for individual retailers include long-tail variations like "oak extending dining table seats 8", "velvet corner sofa with chaise", or location-modified terms like "furniture store Manchester".' },
      },
      {
        '@type': 'Question',
        name: 'How many keywords should a furniture store target?',
        acceptedAnswer: { '@type': 'Answer', text: 'Every indexable page on your site should target a primary keyword and 2-3 closely related secondary keywords. A furniture store with 50 category/subcategory pages, 200 product pages, and 20 blog posts should be targeting 250+ unique keyword clusters. Start with your top 20-30 commercial pages and expand from there.' },
      },
      {
        '@type': 'Question',
        name: 'Should I target brand names in my furniture keywords?',
        acceptedAnswer: { '@type': 'Answer', text: 'If you are an authorised stockist, absolutely. Terms like "Ercol dining chairs stockist" or "G Plan sofas sale" carry strong buying intent and lower competition. Create dedicated brand landing pages with unique content about each brand you carry. Do not target brand terms for brands you do not stock — this wastes crawl budget and frustrates users.' },
      },
    ],
  },
];
---
<Base
  title="Furniture SEO Keywords: How to Find What Customers Search For"
  description="A complete guide to keyword research for furniture retailers. Learn how to find, evaluate, and target the search terms that drive traffic and sales for furniture businesses."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Furniture SEO Keywords' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Furniture SEO Keywords: How to Find What Your Customers Search For</h1>

    <p class="text-lg mb-6">
      Keyword research is the foundation of any <a href="/" class="text-emerald hover:underline">furniture store SEO</a> strategy. Without understanding what your potential customers actually type into Google, you're optimising blind. This guide walks through how to research, evaluate, and prioritise keywords for a furniture retail business.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Understanding Furniture Search Intent</h2>

    <p class="mb-4">
      Furniture keywords fall into distinct intent categories, and each one needs a different type of page:
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Transactional Keywords</h3>
    <p class="mb-4">
      These indicate strong buying intent: "buy oak dining table", "leather sofa sale", "corner sofa free delivery". Map these to product and category pages. The searcher is ready to purchase — your page needs to make it easy.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Commercial Investigation</h3>
    <p class="mb-4">
      The buyer is comparing options: "best sofas for small living rooms", "solid wood vs veneer furniture", "DFS vs SCS quality". These need comparison content, buying guides, or well-structured category pages that help the shopper narrow down choices.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Informational Keywords</h3>
    <p class="mb-4">
      The searcher wants to learn: "how to measure for a corner sofa", "how to clean velvet upholstery", "what wood is best for a dining table". These are blog/guide content opportunities. They won't convert immediately, but they build trust and capture email addresses.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Local Keywords</h3>
    <p class="mb-4">
      Location-modified searches: "furniture store Bristol", "sofa showroom near me", "dining table shops Manchester". These need <a href="/local-seo-furniture-stores/" class="text-emerald hover:underline">local SEO</a> treatment — Google Business Profile, local landing pages, and NAP consistency.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">How to Research Furniture Keywords</h2>

    <h3 class="text-xl font-bold mt-8 mb-3">Step 1: Seed List from Your Catalogue</h3>
    <p class="mb-4">
      Start with your product categories and types. List every type of furniture you sell: sofas, beds, dining tables, wardrobes, desks, bookcases, coffee tables, sideboards. Then add modifiers: material (oak, walnut, leather, velvet), style (modern, Scandinavian, industrial, traditional), size (2-seater, king size, extending), and feature (reclining, storage, adjustable).
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Step 2: Expand with Tools</h3>
    <p class="mb-4">
      Feed your seed terms into keyword research tools (Ahrefs, SEMrush, Google Keyword Planner, or free alternatives like Ubersuggest). For each seed term, export the keyword suggestions and filter by:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Volume:</strong> anything above 10 monthly searches is worth considering for a dedicated page</li>
      <li><strong>Keyword difficulty:</strong> prioritise KD under 30 for faster wins</li>
      <li><strong>Commercial intent:</strong> keywords with CPC data indicate that advertisers pay for these clicks — a proxy for commercial value</li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-3">Step 3: Analyse Google Search Console</h3>
    <p class="mb-4">
      If your site already exists, Google Search Console is your best data source. Check the Search Results report (Performance > Search Results) to see which queries already trigger your pages. Look for:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>High impressions, low clicks:</strong> you're ranking but not earning clicks — title/description may need rewriting</li>
      <li><strong>Positions 5-20:</strong> "striking distance" keywords where small improvements could push you to page one</li>
      <li><strong>Unexpected queries:</strong> keywords you rank for accidentally — these reveal content gaps you could fill intentionally</li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-3">Step 4: Competitor Gap Analysis</h3>
    <p class="mb-4">
      Identify 3-5 competing furniture retailers (both local competitors and aspirational ones). In Ahrefs or SEMrush, run a "content gap" analysis: what keywords do they rank for that you don't? This reveals pages you need to create.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Keyword Mapping: Assigning Terms to Pages</h2>

    <p class="mb-4">
      Every keyword needs a home — a single page on your site that's the best match for that search intent. Create a spreadsheet mapping:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>Primary keyword → page URL</li>
      <li>Secondary keywords (2-3 variations) → same page</li>
      <li>Content type needed (product page, category page, guide, blog post)</li>
      <li>Current ranking position (if any)</li>
      <li>Priority (based on volume × intent × achievability)</li>
    </ul>
    <p class="mb-4">
      The rule: one primary keyword per page. If two pages target the same term, they cannibalise each other and neither ranks as well as a single focused page would.
    </p>

    <CTABar text="Need help building a keyword strategy for your furniture business?" />

    <h2 class="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>

    <div class="space-y-6 mb-12">
      <div>
        <h3 class="font-semibold mb-2">What are the most searched furniture keywords?</h3>
        <p class="text-slate-600">The highest-volume furniture keywords are broad product terms like "sofas", "dining tables", and "beds". However, these are extremely competitive. More actionable targets for individual retailers include long-tail variations like "oak extending dining table seats 8", "velvet corner sofa with chaise", or location-modified terms like "furniture store Manchester".</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">How many keywords should a furniture store target?</h3>
        <p class="text-slate-600">Every indexable page on your site should target a primary keyword and 2-3 closely related secondary keywords. A furniture store with 50 category/subcategory pages, 200 product pages, and 20 blog posts should be targeting 250+ unique keyword clusters. Start with your top 20-30 commercial pages and expand from there.</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Should I target brand names in my furniture keywords?</h3>
        <p class="text-slate-600">If you are an authorised stockist, absolutely. Terms like "Ercol dining chairs stockist" or "G Plan sofas sale" carry strong buying intent and lower competition. Create dedicated brand landing pages with unique content. Do not target brand terms for brands you do not stock.</p>
      </div>
    </div>

    <Related pages={related} />
    <ContactForm heading="Get Expert Keyword Research for Your Furniture Store" />
  </article>
</Base>
```

- [ ] **Step 3: Create furniture-product-description-seo.astro**

Write to `src/pages/furniture-product-description-seo.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/furniture-product-description-seo/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Furniture Product Description SEO: Writing Copy That Ranks and Sells',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Write SEO-Optimised Furniture Product Descriptions',
    step: [
      { '@type': 'HowToStep', name: 'Research the target keyword', text: 'Identify the primary keyword for each product page using search volume and competitor analysis.' },
      { '@type': 'HowToStep', name: 'Write a compelling opening', text: 'Lead with the benefit or use case, not the product name. Address what the buyer is looking for.' },
      { '@type': 'HowToStep', name: 'Include specifications naturally', text: 'Weave dimensions, materials, and features into readable prose rather than relying solely on a spec table.' },
      { '@type': 'HowToStep', name: 'Add unique selling points', text: 'Explain what makes this product different from alternatives. Include details the manufacturer description omits.' },
      { '@type': 'HowToStep', name: 'Implement structured data', text: 'Add Product schema with name, description, image, price, availability, and brand.' },
    ],
  },
];
---
<Base
  title="Furniture Product Description SEO: Copy That Ranks & Sells"
  description="How to write furniture product descriptions that rank in search and convert browsers into buyers. Covers keyword targeting, unique content, structured data, and common mistakes."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Furniture Product Description SEO' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Furniture Product Description SEO: Writing Copy That Ranks and Sells</h1>

    <p class="text-lg mb-6">
      Most furniture retailers copy product descriptions directly from their suppliers. It's understandable — rewriting hundreds of descriptions is time-consuming. But duplicate manufacturer content is one of the biggest <a href="/" class="text-emerald hover:underline">SEO</a> problems in the furniture industry. This guide shows how to write product descriptions that rank in search and convert browsers into buyers.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Why Manufacturer Descriptions Hurt Your Rankings</h2>

    <p class="mb-4">
      When you use the same product description as every other retailer stocking that item, Google has no reason to rank your page above theirs. Worse, the manufacturer's own website — typically with higher domain authority — will outrank all of you.
    </p>
    <p class="mb-4">
      Duplicate content doesn't trigger a "penalty" in the formal sense, but it does mean Google picks one canonical version to rank and suppresses the rest. If 20 retailers all use the same 150-word Ercol description, 19 of them are invisible in search for that product.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">The Anatomy of an SEO-Optimised Furniture Description</h2>

    <h3 class="text-xl font-bold mt-8 mb-3">1. A Keyword-Targeted Opening</h3>
    <p class="mb-4">
      Start with what the buyer is looking for, not the product name. Instead of "The Ercol Marino 3-Seater Sofa features...", try "Looking for a compact mid-century sofa that suits a smaller living room? The Marino 3-seater from Ercol combines clean lines with deep comfort..."
    </p>
    <p class="mb-4">
      Research the <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">keywords</a> people use to find this type of product. For a specific sofa, that might be "Ercol Marino sofa" but also "mid-century 3-seater sofa" and "compact sofa small living room".
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">2. Benefits Before Features</h3>
    <p class="mb-4">
      Furniture buyers care about how a piece will look and function in their home. Lead with benefits: "The deep seat cushions are designed for evening lounging, not just perching" rather than "Seat depth: 55cm." Include the specifications too — but make the prose do the selling.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">3. Unique Details the Manufacturer Omits</h3>
    <p class="mb-4">
      This is your competitive advantage. Add information that only someone who has physically handled the product (or done extensive research) would know:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>How the fabric feels — "the boucle texture is soft without being delicate; it handles pet claws better than velvet"</li>
      <li>Assembly experience — "arrives in two boxes, assembly takes approximately 20 minutes with two people"</li>
      <li>How it fits in a real room — "at 195cm wide, it fits comfortably in a standard UK terraced-house living room with space for a side table"</li>
      <li>Comparison to similar products — "firmer than the Habitat Hendricks, softer than the IKEA Landskrona"</li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-3">4. Structured Specifications</h3>
    <p class="mb-4">
      Below the prose description, include a clean specifications section. Use a consistent format across all products: dimensions (W×D×H), materials, weight, weight capacity, colour options, care instructions, warranty, and delivery information. This structured content helps search engines understand the product attributes and can appear in rich results.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">5. Product Schema Markup</h3>
    <p class="mb-4">
      Every product page needs JSON-LD Product schema including name, description, image, brand, SKU, price (with currency), availability, and condition. If you have customer reviews, add AggregateRating. This enables rich product snippets in search results — the star ratings, price, and availability labels that dramatically increase click-through rates.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Common Product Description Mistakes</h2>

    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Keyword stuffing:</strong> "This oak dining table is the perfect oak dining table for anyone looking for an oak dining table" — this hasn't worked since 2012</li>
      <li><strong>Zero-content product pages:</strong> a title, a price, and a photo with no description at all</li>
      <li><strong>Identical descriptions for variations:</strong> the grey velvet version and the blue velvet version need at least partially differentiated content</li>
      <li><strong>Ignoring alt text on product images:</strong> "IMG_4521.jpg" tells search engines nothing. "Grey velvet 3-seater Chesterfield sofa — front view" is far better</li>
      <li><strong>No internal links:</strong> each product page should link to its parent category, related products, and any relevant buying guides</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Scaling Unique Descriptions</h2>

    <p class="mb-4">
      If you have hundreds of products, rewriting every description at once isn't feasible. Prioritise by commercial value:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Tier 1 (rewrite first):</strong> your top 20% of products by revenue or search traffic — these earn the most from improved rankings</li>
      <li><strong>Tier 2 (rewrite next):</strong> category pages and product pages currently ranking on page 2 of Google — small improvements here yield big gains</li>
      <li><strong>Tier 3 (batch rewrite):</strong> the long tail of your catalogue — use a template structure to speed up writing while ensuring each page has at least 150 words of unique content</li>
    </ul>

    <CTABar text="Need help rewriting your furniture product descriptions?" />

    <Related pages={related} />
    <ContactForm heading="Get SEO-Optimised Product Descriptions" />
  </article>
</Base>
```

- [ ] **Step 4: Verify all three pages render**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Check: `/furniture-website-seo/`, `/furniture-seo-keywords/`, `/furniture-product-description-seo/`
Expected: All render with breadcrumbs, content, Related cards linking to each other (technical cluster), CTABar, and ContactForm.

- [ ] **Step 5: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/pages/furniture-website-seo.astro src/pages/furniture-seo-keywords.astro src/pages/furniture-product-description-seo.astro
git commit -m "feat: add technical spoke pages (website seo, keywords, product descriptions)"
```

---

### Task 6: Local/Ecommerce Spoke Pages

**Files:**
- Create: `src/pages/local-seo-furniture-stores.astro`
- Create: `src/pages/furniture-ecommerce-seo.astro`

- [ ] **Step 1: Create local-seo-furniture-stores.astro**

Write to `src/pages/local-seo-furniture-stores.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/local-seo-furniture-stores/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Local SEO for Furniture Stores: Google Maps, GBP & Local Pack Rankings',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Rank a Furniture Store in Google Local Pack',
    step: [
      { '@type': 'HowToStep', name: 'Claim and optimise Google Business Profile', text: 'Verify ownership, complete every field, select accurate categories, and add high-quality showroom photos.' },
      { '@type': 'HowToStep', name: 'Build local citations', text: 'Ensure your business name, address, and phone number are consistent across directories, social profiles, and industry listings.' },
      { '@type': 'HowToStep', name: 'Generate customer reviews', text: 'Implement a post-purchase review request process and respond to every review — positive or negative.' },
      { '@type': 'HowToStep', name: 'Create location-specific content', text: 'Build landing pages for each showroom location with unique content about the store, local delivery areas, and nearby attractions.' },
    ],
  },
];
---
<Base
  title="Local SEO for Furniture Stores: Maps, GBP & Local Rankings"
  description="How furniture stores with physical showrooms can rank in Google Maps and the local pack. Covers Google Business Profile, citations, reviews, and local content strategy."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Local SEO for Furniture Stores' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Local SEO for Furniture Stores: Google Maps, GBP & Local Pack Rankings</h1>

    <p class="text-lg mb-6">
      If you operate a furniture showroom, local SEO is arguably more important than traditional organic rankings. When someone searches "furniture store near me" or "sofa shop [city]", the Google local pack (the map with three business listings) appears above all organic results. Getting into that pack for your area is the highest-value <a href="/" class="text-emerald hover:underline">SEO for furniture stores</a> objective you can pursue.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Google Business Profile: Your Most Important Asset</h2>

    <p class="mb-4">
      Your Google Business Profile (GBP, formerly Google My Business) is the single biggest factor in local pack rankings. Treat it as seriously as your website homepage.
    </p>

    <h3 class="text-xl font-bold mt-8 mb-3">Complete Every Field</h3>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Business name:</strong> your actual business name, nothing extra (don't stuff keywords like "Best Furniture Store London")</li>
      <li><strong>Primary category:</strong> "Furniture Store" — this is critical. Secondary categories might include "Home Furnishing Store", "Office Furniture Store", "Kitchen Furniture Store"</li>
      <li><strong>Address:</strong> must match your website and all directory listings exactly</li>
      <li><strong>Phone number:</strong> use a local number, not a call tracking number that changes</li>
      <li><strong>Business hours:</strong> keep these updated, including bank holiday hours</li>
      <li><strong>Website URL:</strong> link to your homepage or a location-specific landing page</li>
      <li><strong>Business description:</strong> 750 characters to describe your store — include your product range, service area, and what makes you different</li>
      <li><strong>Products:</strong> add your main product categories with photos and price ranges</li>
    </ul>

    <h3 class="text-xl font-bold mt-8 mb-3">Photos Make a Measurable Difference</h3>
    <p class="mb-4">
      Google's own data shows that businesses with photos receive 42% more direction requests and 35% more click-throughs to their website. For a furniture showroom, this is even more pronounced — shoppers want to see what the store looks like before visiting.
    </p>
    <p class="mb-4">
      Upload: exterior shots from different angles (helps Google match your location), interior showroom photos, photos of specific displays and product ranges, staff photos (builds trust), and photos of delivery vans or the delivery process. Aim for 20+ photos and add 2-3 new ones monthly.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Local Citations: Consistency is Everything</h2>

    <p class="mb-4">
      A citation is any online mention of your business name, address, and phone number (NAP). Consistent NAP across the web is a key local ranking signal. Inconsistencies — even small ones like "Road" vs "Rd" — dilute your local authority.
    </p>
    <p class="mb-4">
      Priority citation sources for UK furniture stores:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>Yell.com, Thomson Local, Yelp UK</li>
      <li>Facebook Business Page, Instagram Business Profile</li>
      <li>Industry directories: FurnitureVillage-style aggregators, local interiors directories</li>
      <li>Local business directories: Chamber of Commerce, local council business directories</li>
      <li>Apple Maps, Bing Places, Waze</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Reviews: The Social Proof Engine</h2>

    <p class="mb-4">
      Review quantity, quality, and recency all influence local rankings. More importantly, reviews directly influence whether a potential customer decides to visit your showroom.
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Ask at the right moment:</strong> after delivery and setup, when the customer is happiest with their new furniture. Send a follow-up email with a direct link to your Google review page</li>
      <li><strong>Respond to every review:</strong> thank positive reviewers specifically (mention their purchase). Address negative reviews professionally and offer to resolve the issue</li>
      <li><strong>Don't incentivise reviews:</strong> offering discounts for reviews violates Google's guidelines and risks profile suspension</li>
      <li><strong>Diversify review platforms:</strong> Google reviews are primary, but also build presence on Trustpilot, Facebook, and Houzz (for higher-end furniture)</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Location Pages on Your Website</h2>

    <p class="mb-4">
      If you operate multiple showrooms, create a dedicated landing page for each location on your website. Each page should include:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>The showroom address, phone number, and opening hours (matching your GBP exactly)</li>
      <li>An embedded Google Map</li>
      <li>Unique content about that specific location — what brands or ranges are displayed, parking information, nearby landmarks</li>
      <li>Photos of that specific showroom (not stock photos shared across all locations)</li>
      <li>Delivery area information — which postcodes or areas this showroom serves</li>
      <li>LocalBusiness schema markup with the location-specific details</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Local Content Strategy</h2>

    <p class="mb-4">
      Beyond location pages, create content that targets local search intent:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>"Best furniture stores in [city]" — yes, you can write this as a blog post and include yourself alongside competitors. Done well, it ranks for the query and positions you as the authority</li>
      <li>Local interior design collaborations — partner with a local interior designer for a blog series or showroom event, generating content and backlinks</li>
      <li>Local delivery and installation guides — "Furniture delivery in Greater Manchester: what to expect" with practical logistics information</li>
    </ul>

    <CTABar text="Need help getting your furniture store into the local pack?" />

    <Related pages={related} />
    <ContactForm heading="Get Help With Local SEO for Your Furniture Store" />
  </article>
</Base>
```

- [ ] **Step 2: Create furniture-ecommerce-seo.astro**

Write to `src/pages/furniture-ecommerce-seo.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { getRelated } from '../data/site';

const related = getRelated('/furniture-ecommerce-seo/');
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Furniture Ecommerce SEO: Category Architecture, Product Pages & Faceted Nav',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How should a furniture ecommerce site handle product variations?',
        acceptedAnswer: { '@type': 'Answer', text: 'Use a single product page with selectable variations (colour, size, material) rather than creating separate URLs for each combination. If a variation has genuine search volume (e.g., "grey corner sofa" vs "blue corner sofa"), create a dedicated page with unique content. Use canonical tags to point non-indexed variations to the primary product URL.' },
      },
      {
        '@type': 'Question',
        name: 'Should discontinued furniture products be redirected or removed?',
        acceptedAnswer: { '@type': 'Answer', text: 'If the page has backlinks or traffic, 301 redirect it to the most relevant alternative product or its parent category. If the product will return (seasonal ranges), keep the page live with an out-of-stock notice and a notification sign-up. Only 404 products with zero traffic, zero backlinks, and no chance of return.' },
      },
      {
        '@type': 'Question',
        name: 'How many products should a furniture category page show?',
        acceptedAnswer: { '@type': 'Answer', text: 'Display 24-48 products per page for the best balance of user experience and page speed. Use lazy loading for product images below the fold. If you have more products than this, implement pagination with rel=next/prev (though Google has deprecated it, clean pagination URLs are still crawled) or a "load more" button that updates the URL.' },
      },
    ],
  },
];
---
<Base
  title="Furniture Ecommerce SEO: Category Architecture & Product Pages"
  description="SEO strategies for furniture ecommerce stores. Covers category page architecture, faceted navigation, product page optimisation, and handling seasonal range changes."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Furniture Ecommerce SEO' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Furniture Ecommerce SEO: Category Architecture, Product Pages & Faceted Navigation</h1>

    <p class="text-lg mb-6">
      Running a furniture ecommerce store presents unique SEO challenges that generic ecommerce advice doesn't address. Large product catalogues, high-resolution imagery, seasonal range changes, and complex filtering systems all require furniture-specific strategies. This guide covers the technical and content approaches that drive organic traffic for <a href="/" class="text-emerald hover:underline">furniture</a> ecommerce sites.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Category Architecture That Ranks</h2>

    <p class="mb-4">
      Your category structure is the backbone of your ecommerce SEO. It determines which keywords your site can rank for and how search engines understand your product hierarchy. The key principle: every category page should target a keyword that people actually search for.
    </p>
    <p class="mb-4">
      A furniture ecommerce site should organise products by room → furniture type → sub-type. For example: Living Room → Sofas → Corner Sofas. Each level of this hierarchy is a keyword opportunity:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li>"Living room furniture" — high volume, competitive, targets the top-level category</li>
      <li>"Sofas" — high volume, your primary subcategory targets these</li>
      <li>"Corner sofas" — mid volume, less competitive, perfect for a sub-subcategory</li>
      <li>"Grey velvet corner sofas" — low volume, very specific, could be a filtered view that's worth indexing</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Faceted Navigation: The Make-or-Break Issue</h2>

    <p class="mb-4">
      Faceted navigation lets shoppers filter by colour, material, price, size, and brand. It's essential for usability on a furniture site — but without careful SEO handling, it creates an explosion of indexable URLs with thin, duplicate content.
    </p>
    <p class="mb-4">
      A "Sofas" page with filters for 10 colours × 8 materials × 5 sizes × 3 price ranges creates 1,200 possible URL combinations. Most of these serve zero or one product and provide no unique value to search engines.
    </p>
    <p class="mb-4">
      The strategic approach:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Identify valuable filter combinations</strong> using <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">keyword research</a>. "Leather sofas" has genuine search volume — make it a clean, indexable category. "Leather sofas under £500 in blue" does not — noindex or canonicalise it</li>
      <li><strong>Use clean URLs for indexable filters:</strong> `/sofas/leather/` not `/sofas/?material=leather&sort=price`</li>
      <li><strong>Block multi-select and sort-order URLs from crawling</strong> via robots.txt or meta robots noindex</li>
      <li><strong>Add unique content to every indexable filter page:</strong> the "Leather Sofas" page needs its own H1, introductory text, and potentially FAQ content</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Product Page SEO for Furniture Ecommerce</h2>

    <p class="mb-4">
      Every product page on a furniture ecommerce site should include:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Unique <a href="/furniture-product-description-seo/" class="text-emerald hover:underline">product description</a></strong> — 200+ words minimum, ideally 300-500 for hero products</li>
      <li><strong>Multiple high-quality images</strong> with descriptive alt text — room scene, detail shots, dimensions overlaid</li>
      <li><strong>Structured data:</strong> Product schema with price, availability, brand, SKU, and review data</li>
      <li><strong>Internal links:</strong> breadcrumb to parent category, "you may also like" related products, link to relevant buying guide</li>
      <li><strong>Customer reviews on-page</strong> — user-generated content is unique by definition and adds keyword-rich text</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Handling Seasonal Range Changes</h2>

    <p class="mb-4">
      Furniture retailers regularly add and remove products as ranges change. Poor handling of discontinued products creates crawl errors, broken links, and wasted link equity. Your approach should depend on the product's SEO value:
    </p>
    <ul class="list-disc pl-6 mb-4 space-y-2">
      <li><strong>Products with traffic or backlinks:</strong> 301 redirect to the closest alternative product or parent category page</li>
      <li><strong>Seasonal products that will return:</strong> keep the page live with "out of stock" messaging and an email notification sign-up. This preserves rankings for when the product returns</li>
      <li><strong>Low-value discontinued products:</strong> 301 redirect to parent category. Don't let these 404</li>
    </ul>

    <h2 class="text-2xl font-bold mt-10 mb-4">Site Speed for Image-Heavy Catalogues</h2>

    <p class="mb-4">
      Furniture ecommerce sites are among the most image-heavy on the web. Every product needs multiple high-resolution photos. This makes page speed optimisation critical for both rankings and user experience. Refer to the <a href="/furniture-website-seo/" class="text-emerald hover:underline">furniture website SEO</a> guide for detailed technical recommendations on image optimisation, Core Web Vitals, and performance tuning.
    </p>

    <CTABar text="Need expert SEO for your furniture ecommerce store?" />

    <h2 class="text-2xl font-bold mt-10 mb-4">Frequently Asked Questions</h2>

    <div class="space-y-6 mb-12">
      <div>
        <h3 class="font-semibold mb-2">How should a furniture ecommerce site handle product variations?</h3>
        <p class="text-slate-600">Use a single product page with selectable variations rather than separate URLs for each combination. If a variation has genuine search volume (e.g., "grey corner sofa"), create a dedicated page with unique content. Use canonical tags to point non-indexed variations to the primary product URL.</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Should discontinued furniture products be redirected or removed?</h3>
        <p class="text-slate-600">If the page has backlinks or traffic, 301 redirect to the most relevant alternative or parent category. If the product will return seasonally, keep the page live with out-of-stock messaging. Only 404 products with zero traffic and zero backlinks.</p>
      </div>
      <div>
        <h3 class="font-semibold mb-2">How many products should a furniture category page show?</h3>
        <p class="text-slate-600">24-48 products per page balances UX and speed. Lazy load images below the fold. For larger catalogues, use pagination or a "load more" button that updates the URL.</p>
      </div>
    </div>

    <Related pages={related} />
    <ContactForm heading="Get Ecommerce SEO Help for Your Furniture Store" />
  </article>
</Base>
```

- [ ] **Step 3: Verify both pages render**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Check: `/local-seo-furniture-stores/`, `/furniture-ecommerce-seo/`
Expected: Both render with Related cards linking to each other (local/ecommerce cluster).

- [ ] **Step 4: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/pages/local-seo-furniture-stores.astro src/pages/furniture-ecommerce-seo.astro
git commit -m "feat: add local/ecommerce spoke pages"
```

---

### Task 7: Checklist Spoke Page

**Files:**
- Create: `src/pages/furniture-store-seo-checklist.astro`

- [ ] **Step 1: Create furniture-store-seo-checklist.astro**

Write to `src/pages/furniture-store-seo-checklist.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Breadcrumb from '../components/Breadcrumb.astro';
import Related from '../components/Related.astro';
import ContactForm from '../components/ContactForm.astro';
import CTABar from '../components/CTABar.astro';
import { SPOKES } from '../data/site';

const checklistRelated = SPOKES.filter(s =>
  ['/furniture-store-seo/', '/furniture-website-seo/', '/local-seo-furniture-stores/'].includes(s.href)
);

const checklistItems = [
  'Claim and fully optimise your Google Business Profile',
  'Ensure NAP consistency across all online directories and citations',
  'Run a technical SEO audit (crawl errors, broken links, site speed)',
  'Compress and lazy-load all product images',
  'Write unique product descriptions for your top 50 products',
  'Add 300-500 words of editorial content to every category page',
  'Implement BreadcrumbList schema on every page',
  'Add Product + Offer schema to all product pages',
  'Research and map primary keywords to every indexable page',
  'Set canonical tags on all faceted navigation URLs',
  'Create a blog content calendar targeting informational keywords',
  'Build or update your XML sitemap and submit to Search Console',
  'Optimise title tags (under 60 characters, include primary keyword)',
  'Write compelling meta descriptions (under 155 characters, include CTA)',
  'Fix all broken internal links and 404 pages',
  'Add internal links from blog posts to relevant product/category pages',
  'Set up Google Search Console and monitor weekly',
  'Request customer reviews on Google after every delivery',
  'Create location-specific landing pages for each showroom',
  'Audit Core Web Vitals and fix any failing metrics',
];

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Furniture Store SEO Checklist: 20 Tasks to Complete',
    datePublished: '2026-05-15',
    author: { '@type': 'Organization', name: 'SEO.Furniture' },
    publisher: { '@type': 'Organization', name: 'SEO.Furniture', url: 'https://seo.furniture' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Furniture Store SEO Checklist',
    numberOfItems: checklistItems.length,
    itemListElement: checklistItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item,
    })),
  },
];
---
<Base
  title="Furniture Store SEO Checklist: 20 Essential Tasks"
  description="A practical SEO checklist for furniture retailers. 20 actionable tasks covering technical SEO, content, local search, and ongoing optimisation for furniture stores."
  schema={schema}
>
  <article class="max-w-3xl mx-auto px-6 py-12">
    <Breadcrumb crumbs={[
      { label: 'Home', href: '/' },
      { label: 'Furniture Store SEO Checklist' },
    ]} />

    <h1 class="text-4xl font-bold tracking-tight mb-6">Furniture Store SEO Checklist: 20 Tasks Every Retailer Should Complete</h1>

    <p class="text-lg mb-6">
      This checklist distils the most important <a href="/" class="text-emerald hover:underline">SEO for furniture stores</a> actions into a practical, prioritised list. Work through it top to bottom — the items are roughly ordered by impact. Each task links to deeper guidance where available.
    </p>

    <h2 class="text-2xl font-bold mt-10 mb-4">Local SEO Foundation</h2>

    <div class="space-y-4 mb-8">
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">1.</span>
        <div>
          <p class="font-semibold">Claim and fully optimise your Google Business Profile</p>
          <p class="text-sm text-slate-500 mt-1">Complete every field: categories, hours, description, products, photos. This is the single highest-impact action for a furniture showroom. See the <a href="/local-seo-furniture-stores/" class="text-emerald hover:underline">local SEO guide</a> for details.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">2.</span>
        <div>
          <p class="font-semibold">Ensure NAP consistency across all online directories</p>
          <p class="text-sm text-slate-500 mt-1">Your business name, address, and phone number must be identical everywhere: website, GBP, Yell, Facebook, industry directories. Even "Road" vs "Rd" matters.</p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mt-10 mb-4">Technical SEO</h2>

    <div class="space-y-4 mb-8">
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">3.</span>
        <div>
          <p class="font-semibold">Run a technical SEO audit</p>
          <p class="text-sm text-slate-500 mt-1">Use Screaming Frog or Sitebulb to crawl your site. Fix crawl errors, broken internal links, redirect chains, and missing meta data. See the <a href="/furniture-website-seo/" class="text-emerald hover:underline">furniture website SEO guide</a>.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">4.</span>
        <div>
          <p class="font-semibold">Compress and lazy-load all product images</p>
          <p class="text-sm text-slate-500 mt-1">Serve WebP format, implement responsive srcset, and lazy-load below-the-fold images. This is typically the biggest page speed win for furniture sites.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">5.</span>
        <div>
          <p class="font-semibold">Set canonical tags on all faceted navigation URLs</p>
          <p class="text-sm text-slate-500 mt-1">Prevent colour/material/price filter combinations from creating thousands of duplicate pages. Only index filter combinations with genuine search volume.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">6.</span>
        <div>
          <p class="font-semibold">Implement structured data on every page</p>
          <p class="text-sm text-slate-500 mt-1">BreadcrumbList everywhere, Product + Offer on product pages, LocalBusiness on contact/showroom pages, FAQPage on guides with FAQ sections.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">7.</span>
        <div>
          <p class="font-semibold">Build or update your XML sitemap and submit to Search Console</p>
          <p class="text-sm text-slate-500 mt-1">Include all indexable pages, exclude noindexed facet URLs. Submit via Google Search Console and Bing Webmaster Tools.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">8.</span>
        <div>
          <p class="font-semibold">Audit Core Web Vitals and fix failing metrics</p>
          <p class="text-sm text-slate-500 mt-1">LCP under 2.5s, CLS under 0.1, INP under 200ms. Run PageSpeed Insights on your homepage, top category page, and a product page.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">9.</span>
        <div>
          <p class="font-semibold">Fix all broken internal links and 404 pages</p>
          <p class="text-sm text-slate-500 mt-1">Discontinued products should redirect to alternatives or parent categories, not 404. Crawl monthly to catch new breakages.</p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mt-10 mb-4">Content Optimisation</h2>

    <div class="space-y-4 mb-8">
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">10.</span>
        <div>
          <p class="font-semibold">Write unique product descriptions for your top 50 products</p>
          <p class="text-sm text-slate-500 mt-1">Start with your highest-revenue products. Replace manufacturer copy with original descriptions that include benefits, unique details, and natural keyword usage. See the <a href="/furniture-product-description-seo/" class="text-emerald hover:underline">product description guide</a>.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">11.</span>
        <div>
          <p class="font-semibold">Add editorial content to every category page</p>
          <p class="text-sm text-slate-500 mt-1">300-500 words per category: buying guidance, material comparisons, size advice, and links to related subcategories and guides.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">12.</span>
        <div>
          <p class="font-semibold">Research and map keywords to every indexable page</p>
          <p class="text-sm text-slate-500 mt-1">One primary keyword per page, 2-3 secondary keywords. Map in a spreadsheet: URL → keyword → current ranking → priority. See the <a href="/furniture-seo-keywords/" class="text-emerald hover:underline">keyword research guide</a>.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">13.</span>
        <div>
          <p class="font-semibold">Optimise title tags</p>
          <p class="text-sm text-slate-500 mt-1">Under 60 characters, primary keyword near the front, compelling enough to earn the click. "Corner Sofas | Free UK Delivery | [Brand]" beats "Home > Living > Sofas > Corner".</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">14.</span>
        <div>
          <p class="font-semibold">Write compelling meta descriptions</p>
          <p class="text-sm text-slate-500 mt-1">Under 155 characters, include a value proposition and CTA. "Shop our collection of 50+ corner sofas with free delivery. Velvet, leather & fabric options from £599."</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">15.</span>
        <div>
          <p class="font-semibold">Add internal links from blog posts to products and categories</p>
          <p class="text-sm text-slate-500 mt-1">Every blog post should link to at least 2-3 relevant commercial pages. A post about "choosing a dining table" should link to your dining tables category.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">16.</span>
        <div>
          <p class="font-semibold">Create a blog content calendar</p>
          <p class="text-sm text-slate-500 mt-1">Target informational keywords: buying guides, care instructions, room styling ideas, material comparisons. Aim for 2-4 posts per month.</p>
        </div>
      </div>
    </div>

    <h2 class="text-2xl font-bold mt-10 mb-4">Ongoing Optimisation</h2>

    <div class="space-y-4 mb-8">
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">17.</span>
        <div>
          <p class="font-semibold">Set up Google Search Console and monitor weekly</p>
          <p class="text-sm text-slate-500 mt-1">Check for crawl errors, indexation issues, and manual actions. Review the Performance report for ranking trends and CTR opportunities.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">18.</span>
        <div>
          <p class="font-semibold">Request customer reviews on Google after every delivery</p>
          <p class="text-sm text-slate-500 mt-1">Send a follow-up email 2-3 days after delivery with a direct link to your Google review page. Reviews influence both local rankings and click-through rates.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">19.</span>
        <div>
          <p class="font-semibold">Create location-specific landing pages for each showroom</p>
          <p class="text-sm text-slate-500 mt-1">Unique content per location: address, hours, photos, delivery area, featured brands. Match your GBP listing exactly.</p>
        </div>
      </div>
      <div class="flex gap-3 items-start p-4 bg-surface rounded-lg">
        <span class="text-emerald font-bold text-lg mt-0.5">20.</span>
        <div>
          <p class="font-semibold">Audit and refresh content quarterly</p>
          <p class="text-sm text-slate-500 mt-1">Review your top 20 pages by traffic every quarter. Update dates, refresh statistics, add new sections, and improve internal linking as your site grows.</p>
        </div>
      </div>
    </div>

    <CTABar text="Want expert help working through this checklist?" />

    <Related pages={checklistRelated} />
    <ContactForm heading="Get Help Implementing Your Furniture SEO Checklist" />
  </article>
</Base>
```

- [ ] **Step 2: Verify the page renders**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Check: `/furniture-store-seo-checklist/`
Expected: Numbered checklist with 20 items in 4 sections, Related links to store-seo + website-seo + local-seo, CTABar, ContactForm.

- [ ] **Step 3: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/pages/furniture-store-seo-checklist.astro
git commit -m "feat: add checklist spoke page with 20-item ItemList schema"
```

---

### Task 8: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create contact.astro**

Write to `src/pages/contact.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import { SITE } from '../data/site';

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact SEO.Furniture',
    url: `${SITE.url}/contact/`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  },
];
---
<Base
  title="Contact SEO.Furniture | Get a Free Consultation"
  description="Get in touch to discuss SEO for your furniture store. Free initial consultation — tell us about your business and we'll outline how SEO can grow your traffic."
  schema={schema}
>
  <section class="max-w-xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
    <p class="text-slate-500 mb-10">Tell us about your furniture business and we'll outline how SEO can grow your organic traffic and sales.</p>

    <form action={`https://formspree.io/f/${SITE.formspreeId}`} method="POST" class="grid gap-6">
      <div>
        <label for="name" class="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
        <input type="text" id="name" name="name" required
          class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald" />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
        <input type="email" id="email" name="email" required
          class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald" />
      </div>
      <div>
        <label for="website" class="block text-sm font-medium text-slate-700 mb-1.5">Website URL</label>
        <input type="url" id="website" name="website" placeholder="https://"
          class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald" />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
        <textarea id="message" name="message" rows="5" required
          class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald"></textarea>
      </div>
      <button type="submit"
        class="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-3.5 rounded-lg transition-colors w-fit text-lg">
        Send Enquiry
      </button>
    </form>
  </section>
</Base>
```

- [ ] **Step 2: Verify the page renders**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run dev`
Check: `/contact/`
Expected: Clean form with 4 fields, no extra content.

- [ ] **Step 3: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add src/pages/contact.astro
git commit -m "feat: add contact page with Formspree form"
```

---

### Task 9: Static Assets

**Files:**
- Create: `public/robots.txt`
- Create: `public/llms.txt`
- Create: `public/ai.txt`

- [ ] **Step 1: Create robots.txt**

Write to `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://seo.furniture/sitemap-index.xml
```

- [ ] **Step 2: Create llms.txt**

Write to `public/llms.txt`:

```
# SEO.Furniture

> Specialist SEO guidance for furniture stores, dealers, and ecommerce retailers.

SEO.Furniture provides expert guides on search engine optimisation for the furniture retail industry. The site covers furniture store SEO strategy, keyword research, technical website optimisation, local search visibility, ecommerce SEO, product description writing, and a practical SEO checklist.

## Pages

- [SEO for Furniture Stores](https://seo.furniture/) — Hub page covering why furniture retailers need SEO and how to approach it
- [Furniture Store SEO Guide](https://seo.furniture/furniture-store-seo/) — Complete guide to ranking a furniture retail business
- [SEO Services for Furniture](https://seo.furniture/seo-services-for-furniture/) — What professional SEO services include and how to evaluate providers
- [Furniture Website SEO](https://seo.furniture/furniture-website-seo/) — Technical and on-page optimisation for furniture websites
- [Furniture SEO Keywords](https://seo.furniture/furniture-seo-keywords/) — Keyword research methodology for furniture retailers
- [Local SEO for Furniture Stores](https://seo.furniture/local-seo-furniture-stores/) — Google Maps, GBP, and local pack rankings
- [Furniture Ecommerce SEO](https://seo.furniture/furniture-ecommerce-seo/) — Category architecture and product page optimisation
- [Furniture Product Descriptions](https://seo.furniture/furniture-product-description-seo/) — Writing product copy that ranks and converts
- [Furniture Store SEO Checklist](https://seo.furniture/furniture-store-seo-checklist/) — 20 actionable SEO tasks for furniture retailers
- [Office Furniture SEO](https://seo.furniture/office-furniture-seo/) — B2B SEO strategy for office and contract furniture
- [Contact](https://seo.furniture/contact/) — Get a free consultation

## Contact

- Website: https://seo.furniture
- Enquiries: https://seo.furniture/contact/
```

- [ ] **Step 3: Create ai.txt**

Write to `public/ai.txt`:

```
User-agent: *
Allow: /

# SEO.Furniture welcomes AI crawlers.
# This site provides expert SEO guidance for the furniture retail industry.
# All content is original and may be referenced by AI systems.
```

- [ ] **Step 4: Commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add public/robots.txt public/llms.txt public/ai.txt
git commit -m "feat: add robots.txt, llms.txt, and ai.txt"
```

---

### Task 10: Build Verification and .gitignore

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

Write to `.gitignore`:

```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 2: Run production build**

Run: `cd C:\Users\sunny\repos\seo-furniture && npm run build`
Expected: Astro builds successfully, outputs to `dist/`. All 11 pages rendered. Sitemap generated at `dist/sitemap-index.xml`.

- [ ] **Step 3: Verify sitemap includes all pages**

Run: `type C:\Users\sunny\repos\seo-furniture\dist\sitemap-index.xml`
Expected: sitemap-index referencing a sitemap file. Check that file contains all 11 page URLs.

- [ ] **Step 4: Verify page count**

Run: `(Get-ChildItem -Path "C:\Users\sunny\repos\seo-furniture\dist" -Filter "index.html" -Recurse).Count`
Expected: 11 (one per page)

- [ ] **Step 5: Final commit**

```powershell
cd C:\Users\sunny\repos\seo-furniture
git add .gitignore
git commit -m "chore: add .gitignore, verify build (11 pages)"
```

---

## Post-Build: Sunny's Manual Steps

These cannot be automated in this session:

1. **Create Formspree form** at formspree.io → get form ID → update `SITE.formspreeId` in `src/data/site.ts`
2. **Create GitHub repo** `sunnyp81/seo-furniture` → `git remote add origin` → `git push -u origin master`
3. **Connect Cloudflare Pages** to `sunnyp81/seo-furniture` (build `npm run build`, output `dist`, NODE_VERSION=22)
4. **Set custom domain** `seo.furniture` in CF Pages + DNS
5. **GSC + Bing** verify + submit sitemap-index.xml
