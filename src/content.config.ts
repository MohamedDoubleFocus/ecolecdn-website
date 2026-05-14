import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    meta_description: z.string(),
    meta_keywords: z.string().optional(),
    og_image: z.string().optional(),
    hero_title: z.string().optional(),
    hero_subtitle: z.string().optional(),
    hero_image: z.string().optional(),
    cta_label: z.string().optional(),
    cta_href: z.string().optional(),
  }),
});

const testimonialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    quote: z.string(),
    rating: z.number().min(1).max(5).default(5),
    order: z.number().default(0),
  }),
});

const coursesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    price: z.string(),
    price_unit: z.string().optional(),
    short_description: z.string(),
    included_items: z.array(z.string()).default([]),
    cta_label: z.string().default('Plus de détails'),
    cta_href: z.string().default('/cours'),
    order: z.number().default(0),
    phases: z
      .array(
        z.object({
          number: z.number(),
          title: z.string(),
          theory: z.string(),
          practice: z.string().optional(),
          duration: z.string(),
        }),
      )
      .optional(),
  }),
});

const contactCollection = defineCollection({
  type: 'content',
  schema: z.object({
    address_line: z.string(),
    address_city: z.string(),
    address_region: z.string(),
    address_postal: z.string(),
    address_country: z.string().default('CA'),
    phone: z.string(),
    phone_link: z.string(),
    email: z.string().email(),
    google_maps_embed_url: z.string(),
    geo_lat: z.number(),
    geo_lng: z.number(),
    hours_office: z.array(z.object({ day: z.string(), hours: z.string() })),
    hours_courses: z.array(z.object({ day: z.string(), hours: z.string() })),
    social_links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
  }),
});

const faqsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = {
  pages: pagesCollection,
  testimonials: testimonialsCollection,
  courses: coursesCollection,
  contact: contactCollection,
  faqs: faqsCollection,
};
