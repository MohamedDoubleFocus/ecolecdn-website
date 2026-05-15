import { defineCollection, z } from 'astro:content';

const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const featureItemSchema = z.object({
  text: z.string(),
});

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

    // === Accueil — Section "École de conduite experte" ===
    about_eyebrow: z.string().optional(),
    about_title: z.string().optional(),
    about_paragraph_1: z.string().optional(),
    about_paragraph_2: z.string().optional(),
    about_paragraph_3: z.string().optional(),
    about_image: z.string().optional(),
    about_image_alt: z.string().optional(),
    about_badge_title: z.string().optional(),
    about_badge_subtitle: z.string().optional(),
    about_stats: z.array(statSchema).optional(),

    // === Accueil — Section "Flexibilité et proximité" ===
    proximity_eyebrow: z.string().optional(),
    proximity_title: z.string().optional(),
    proximity_paragraph_1: z.string().optional(),
    proximity_paragraph_2: z.string().optional(),
    proximity_paragraph_3: z.string().optional(),
    proximity_button_label: z.string().optional(),
    proximity_button_href: z.string().optional(),
    proximity_image: z.string().optional(),
    proximity_image_alt: z.string().optional(),

    // === Accueil — Intro "Nos cours et tarifs" ===
    courses_section_eyebrow: z.string().optional(),
    courses_section_title: z.string().optional(),
    courses_section_intro: z.string().optional(),

    // === Accueil — Intro "Témoignages" ===
    testimonials_section_eyebrow: z.string().optional(),
    testimonials_section_title: z.string().optional(),
    testimonials_section_intro: z.string().optional(),

    // === Cours — encarts complémentaires ===
    pesr_eyebrow: z.string().optional(),
    pesr_deposit_note: z.string().optional(),
    pesr_program_title: z.string().optional(),
    pesr_program_description: z.string().optional(),
    pesr_weekend_title: z.string().optional(),
    pesr_weekend_text: z.string().optional(),
    pesr_home_title: z.string().optional(),
    pesr_home_text: z.string().optional(),
    perfect_eyebrow: z.string().optional(),
    perfect_extra_text: z.string().optional(),
    perfect_included_title: z.string().optional(),

    // === Location ===
    location_main_eyebrow: z.string().optional(),
    location_main_title: z.string().optional(),
    location_features: z.array(featureItemSchema).optional(),
    location_price_label: z.string().optional(),
    location_price: z.string().optional(),
    location_price_unit: z.string().optional(),
    location_price_note: z.string().optional(),
    location_reservation_label: z.string().optional(),

    // === FAQ — intro liste ===
    faq_list_eyebrow: z.string().optional(),
    faq_list_title: z.string().optional(),
    faq_list_intro: z.string().optional(),

    // === Merci ===
    merci_primary_button_label: z.string().optional(),
    merci_primary_button_href: z.string().optional(),
    merci_secondary_button_label: z.string().optional(),
    merci_secondary_button_href: z.string().optional(),
    merci_urgent_label: z.string().optional(),

    // === Contact section (réutilisée sur plusieurs pages) ===
    contact_section_eyebrow: z.string().optional(),
    contact_section_title: z.string().optional(),
    contact_section_intro: z.string().optional(),
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
