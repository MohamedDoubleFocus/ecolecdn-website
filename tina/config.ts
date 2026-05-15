import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
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

          // ===== Hero =====
          { type: 'string', name: 'hero_title', label: 'Hero — Titre principal (H1)' },
          { type: 'string', name: 'hero_subtitle', label: 'Hero — Sous-titre', ui: { component: 'textarea' } },
          { type: 'image', name: 'hero_image', label: 'Hero — Image principale' },
          { type: 'string', name: 'cta_label', label: 'Hero — Texte du bouton principal' },
          { type: 'string', name: 'cta_href', label: 'Hero — Lien du bouton principal' },

          // ===== Accueil : section "École de conduite experte" =====
          { type: 'string', name: 'about_eyebrow', label: '[Accueil] Section "À propos" — Petit titre au-dessus (eyebrow)' },
          { type: 'string', name: 'about_title', label: '[Accueil] Section "À propos" — Titre H2' },
          { type: 'string', name: 'about_paragraph_1', label: '[Accueil] Section "À propos" — Paragraphe 1', ui: { component: 'textarea' } },
          { type: 'string', name: 'about_paragraph_2', label: '[Accueil] Section "À propos" — Paragraphe 2', ui: { component: 'textarea' } },
          { type: 'string', name: 'about_paragraph_3', label: '[Accueil] Section "À propos" — Paragraphe 3', ui: { component: 'textarea' } },
          { type: 'image', name: 'about_image', label: '[Accueil] Section "À propos" — Image' },
          { type: 'string', name: 'about_image_alt', label: '[Accueil] Section "À propos" — Texte alternatif image (SEO)' },
          { type: 'string', name: 'about_badge_title', label: '[Accueil] Badge sur image — Titre' },
          { type: 'string', name: 'about_badge_subtitle', label: '[Accueil] Badge sur image — Sous-titre' },
          {
            type: 'object',
            name: 'about_stats',
            label: '[Accueil] Statistiques (3 chiffres)',
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.value ?? ''} — ${item?.label ?? ''}` }) },
            fields: [
              { type: 'string', name: 'value', label: 'Valeur (ex: 20+)', required: true },
              { type: 'string', name: 'label', label: 'Libellé (ex: Années d\'expérience)', required: true },
            ],
          },

          // ===== Accueil : section "Flexibilité et proximité" =====
          { type: 'string', name: 'proximity_eyebrow', label: '[Accueil] Section "Proximité" — Eyebrow' },
          { type: 'string', name: 'proximity_title', label: '[Accueil] Section "Proximité" — Titre H2' },
          { type: 'string', name: 'proximity_paragraph_1', label: '[Accueil] Section "Proximité" — Paragraphe 1', ui: { component: 'textarea' } },
          { type: 'string', name: 'proximity_paragraph_2', label: '[Accueil] Section "Proximité" — Paragraphe 2', ui: { component: 'textarea' } },
          { type: 'string', name: 'proximity_paragraph_3', label: '[Accueil] Section "Proximité" — Paragraphe 3', ui: { component: 'textarea' } },
          { type: 'string', name: 'proximity_button_label', label: '[Accueil] Section "Proximité" — Bouton' },
          { type: 'string', name: 'proximity_button_href', label: '[Accueil] Section "Proximité" — Lien du bouton' },
          { type: 'image', name: 'proximity_image', label: '[Accueil] Section "Proximité" — Image' },
          { type: 'string', name: 'proximity_image_alt', label: '[Accueil] Section "Proximité" — Alt image (SEO)' },

          // ===== Accueil : intro "Nos cours et tarifs" =====
          { type: 'string', name: 'courses_section_eyebrow', label: '[Accueil] Section Cours — Eyebrow' },
          { type: 'string', name: 'courses_section_title', label: '[Accueil] Section Cours — Titre H2' },
          { type: 'string', name: 'courses_section_intro', label: '[Accueil] Section Cours — Intro', ui: { component: 'textarea' } },

          // ===== Accueil : intro "Témoignages" =====
          { type: 'string', name: 'testimonials_section_eyebrow', label: '[Accueil] Section Témoignages — Eyebrow' },
          { type: 'string', name: 'testimonials_section_title', label: '[Accueil] Section Témoignages — Titre H2' },
          { type: 'string', name: 'testimonials_section_intro', label: '[Accueil] Section Témoignages — Intro', ui: { component: 'textarea' } },

          // ===== Cours — encarts complémentaires =====
          { type: 'string', name: 'pesr_eyebrow', label: '[Cours] PESR — Eyebrow' },
          { type: 'string', name: 'pesr_deposit_note', label: '[Cours] PESR — Note sur dépôt et versements', ui: { component: 'textarea' } },
          { type: 'string', name: 'pesr_program_title', label: '[Cours] PESR — Encart programme : titre' },
          { type: 'string', name: 'pesr_program_description', label: '[Cours] PESR — Encart programme : description', ui: { component: 'textarea' } },
          { type: 'string', name: 'pesr_weekend_title', label: '[Cours] Carte week-end — titre' },
          { type: 'string', name: 'pesr_weekend_text', label: '[Cours] Carte week-end — texte', ui: { component: 'textarea' } },
          { type: 'string', name: 'pesr_home_title', label: '[Cours] Carte théorie à domicile — titre' },
          { type: 'string', name: 'pesr_home_text', label: '[Cours] Carte théorie à domicile — texte', ui: { component: 'textarea' } },
          { type: 'string', name: 'perfect_eyebrow', label: '[Cours] Perfectionnement — Eyebrow' },
          { type: 'string', name: 'perfect_extra_text', label: '[Cours] Perfectionnement — Texte additionnel', ui: { component: 'textarea' } },
          { type: 'string', name: 'perfect_included_title', label: '[Cours] Perfectionnement — Titre de la liste "inclus"' },

          // ===== Location =====
          { type: 'string', name: 'location_main_eyebrow', label: '[Location] Section principale — Eyebrow' },
          { type: 'string', name: 'location_main_title', label: '[Location] Section principale — Titre H2' },
          {
            type: 'object',
            name: 'location_features',
            label: '[Location] Liste des inclus',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.text ?? '' }) },
            fields: [
              { type: 'string', name: 'text', label: 'Texte', required: true },
            ],
          },
          { type: 'string', name: 'location_price_label', label: '[Location] Étiquette "Tarif"' },
          { type: 'string', name: 'location_price', label: '[Location] Prix (ex: 70 $)' },
          { type: 'string', name: 'location_price_unit', label: '[Location] Unité du prix (ex: par heure (plus taxes))' },
          { type: 'string', name: 'location_price_note', label: '[Location] Note explicative sous le prix', ui: { component: 'textarea' } },
          { type: 'string', name: 'location_reservation_label', label: '[Location] Étiquette "Réservation"' },

          // ===== FAQ — intro liste =====
          { type: 'string', name: 'faq_list_eyebrow', label: '[FAQ] Liste — Eyebrow' },
          { type: 'string', name: 'faq_list_title', label: '[FAQ] Liste — Titre H2' },
          { type: 'string', name: 'faq_list_intro', label: '[FAQ] Liste — Intro', ui: { component: 'textarea' } },

          // ===== Merci =====
          { type: 'string', name: 'merci_primary_button_label', label: '[Merci] Bouton principal — texte' },
          { type: 'string', name: 'merci_primary_button_href', label: '[Merci] Bouton principal — lien' },
          { type: 'string', name: 'merci_secondary_button_label', label: '[Merci] Bouton secondaire — texte' },
          { type: 'string', name: 'merci_secondary_button_href', label: '[Merci] Bouton secondaire — lien' },
          { type: 'string', name: 'merci_urgent_label', label: '[Merci] Étiquette "Question urgente"' },

          // ===== Section "Contact" (réutilisée) =====
          { type: 'string', name: 'contact_section_eyebrow', label: '[Contact] Eyebrow' },
          { type: 'string', name: 'contact_section_title', label: '[Contact] Titre H2' },
          { type: 'string', name: 'contact_section_intro', label: '[Contact] Intro', ui: { component: 'textarea' } },
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
