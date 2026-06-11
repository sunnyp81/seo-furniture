export const SITE = {
  name: 'SEO.Furniture',
  url: 'https://seo.furniture',
  description: 'Specialist SEO services for furniture stores, dealers, and ecommerce retailers.',
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