import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  // Récupérer ces valeurs sur https://tina.io après avoir lié le repo GitHub
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        path: 'src/content/pages',
        format: 'md',
        ui: {
          router: ({ document }) => {
            const slug = document._sys.filename;
            if (slug === 'accueil') return '/';
            return `/${slug}`;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Titre (balise <title> SEO)', required: true },
          { type: 'string', name: 'slug', label: 'Identifiant (slug)', required: true },
          { type: 'string', name: 'meta_description', label: 'Méta description (SEO, 150–160 car.)', ui: { component: 'textarea' }, required: true },
          { type: 'string', name: 'meta_keywords', label: 'Mots-clés (séparés par des virgules)' },
          { type: 'image', name: 'og_image', label: 'Image de partage (Open Graph)' },
          { type: 'string', name: 'hero_title', label: 'Titre principal (Hero H1)' },
          { type: 'string', name: 'hero_subtitle', label: 'Sous-titre (Hero)', ui: { component: 'textarea' } },
          { type: 'image', name: 'hero_image', label: 'Image principale (Hero)' },
          { type: 'string', name: 'cta_label', label: 'Texte du bouton CTA' },
          { type: 'string', name: 'cta_href', label: 'Lien du bouton CTA' },
          { type: 'rich-text', name: 'body', label: 'Contenu de la page', isBody: true },
        ],
      },
      {
        name: 'testimonials',
        label: 'Témoignages',
        path: 'src/content/testimonials',
        format: 'md',
        fields: [
          { type: 'string', name: 'name', label: 'Nom du client', required: true },
          { type: 'string', name: 'quote', label: 'Citation / témoignage', ui: { component: 'textarea' }, required: true },
          { type: 'number', name: 'rating', label: 'Note (1 à 5 étoiles)', required: true },
          { type: 'number', name: 'order', label: "Ordre d'affichage" },
        ],
      },
      {
        name: 'courses',
        label: 'Cours',
        path: 'src/content/courses',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Titre du cours', required: true },
          { type: 'string', name: 'slug', label: 'Identifiant (slug)', required: true },
          { type: 'string', name: 'price', label: "Prix (ex: 1150 $)", required: true },
          { type: 'string', name: 'price_unit', label: 'Unité de prix (ex: plus taxes)' },
          { type: 'string', name: 'short_description', label: 'Description courte', ui: { component: 'textarea' }, required: true },
          {
            type: 'string',
            name: 'included_items',
            label: 'Éléments inclus',
            list: true,
          },
          { type: 'string', name: 'cta_label', label: 'Texte du bouton CTA' },
          { type: 'string', name: 'cta_href', label: 'Lien du bouton CTA' },
          { type: 'number', name: 'order', label: "Ordre d'affichage" },
          {
            type: 'object',
            name: 'phases',
            label: 'Phases du programme (PESR uniquement)',
            list: true,
            ui: { itemProps: (item) => ({ label: `Phase ${item?.number ?? ''} — ${item?.title ?? ''}` }) },
            fields: [
              { type: 'number', name: 'number', label: 'Numéro de phase', required: true },
              { type: 'string', name: 'title', label: 'Titre de la phase', required: true },
              { type: 'string', name: 'theory', label: 'Description théorique', ui: { component: 'textarea' } },
              { type: 'string', name: 'practice', label: 'Description pratique', ui: { component: 'textarea' } },
              { type: 'string', name: 'duration', label: 'Durée', required: true },
            ],
          },
        ],
      },
      {
        name: 'contact',
        label: 'Coordonnées (singleton)',
        path: 'src/content/contact',
        format: 'md',
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: 'string', name: 'address_line', label: 'Adresse (rue)', required: true },
          { type: 'string', name: 'address_city', label: 'Ville', required: true },
          { type: 'string', name: 'address_region', label: 'Province (ex: QC)', required: true },
          { type: 'string', name: 'address_postal', label: 'Code postal', required: true },
          { type: 'string', name: 'address_country', label: 'Pays (code 2 lettres)' },
          { type: 'string', name: 'phone', label: 'Téléphone (affiché)', required: true },
          { type: 'string', name: 'phone_link', label: 'Téléphone (lien tel: format +15149039843)', required: true },
          { type: 'string', name: 'email', label: 'Courriel', required: true },
          { type: 'string', name: 'google_maps_embed_url', label: 'URL d\'intégration Google Maps', ui: { component: 'textarea' }, required: true },
          { type: 'number', name: 'geo_lat', label: 'Latitude (pour SEO)', required: true },
          { type: 'number', name: 'geo_lng', label: 'Longitude (pour SEO)', required: true },
          {
            type: 'object',
            name: 'hours_office',
            label: 'Heures d\'ouverture — Accueil',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.day ?? ''} — ${item?.hours ?? ''}` }) },
            fields: [
              { type: 'string', name: 'day', label: 'Jour', required: true },
              { type: 'string', name: 'hours', label: 'Heures (ex: 10h00 – 17h00)', required: true },
            ],
          },
          {
            type: 'object',
            name: 'hours_courses',
            label: 'Heures — Cours pratiques et théoriques',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.day ?? ''} — ${item?.hours ?? ''}` }) },
            fields: [
              { type: 'string', name: 'day', label: 'Jour', required: true },
              { type: 'string', name: 'hours', label: 'Heures', required: true },
            ],
          },
          {
            type: 'object',
            name: 'social_links',
            label: 'Réseaux sociaux',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label ?? '' }) },
            fields: [
              { type: 'string', name: 'label', label: 'Nom du réseau (ex: Facebook)', required: true },
              { type: 'string', name: 'url', label: 'URL', required: true },
            ],
          },
        ],
      },
      {
        name: 'faqs',
        label: 'FAQ — Questions fréquentes',
        path: 'src/content/faqs',
        format: 'md',
        fields: [
          { type: 'string', name: 'question', label: 'Question', required: true },
          { type: 'string', name: 'answer', label: 'Réponse', ui: { component: 'textarea' }, required: true },
          { type: 'number', name: 'order', label: "Ordre d'affichage" },
        ],
      },
    ],
  },
});
