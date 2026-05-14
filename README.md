# École de conduite Côte-des-Neiges — Site web

Site web officiel de **École de conduite Côte-des-Neiges**, école de conduite à Montréal située au 5641 Chemin de la Côte-des-Neiges, Montréal, QC H3T 2A9.

## Sommaire

- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Build pour la production](#build-pour-la-production)
- [Configuration TinaCMS Cloud](#configuration-tinacms-cloud)
- [Configuration Web3Forms (formulaires)](#configuration-web3forms-formulaires)
- [Déploiement GitHub Actions vers Hostinger](#déploiement-github-actions-vers-hostinger)
- [Upload manuel FTP vers Hostinger](#upload-manuel-ftp-vers-hostinger)
- [Guide pour la cliente non-technique (TinaCMS)](#guide-pour-la-cliente-non-technique-tinacms)
- [Ajouter une nouvelle page](#ajouter-une-nouvelle-page)
- [Structure du projet](#structure-du-projet)

---

## Stack technique

- **Astro 4** — générateur de site statique (HTML pur, zéro JS par défaut)
- **TypeScript strict** — typage complet
- **Tailwind CSS 3** — styles utilitaires
- **TinaCMS** + **TinaCMS Cloud** — édition visuelle du contenu
- **@astrojs/sitemap** — sitemap.xml automatique
- **Formsubmit.co** — gestion des soumissions de formulaires sans inscription ni backend
- **Hostinger** — hébergement statique via FTP

---

## Démarrage rapide

### Prérequis

- Node.js **20** ou supérieur ([télécharger](https://nodejs.org))
- npm 10+

### Installation

```bash
git clone <url-du-repo> ecole-conduite-cdn
cd ecole-conduite-cdn
npm install
```

### Configurer les variables d'environnement

Copiez `.env.example` vers `.env.local` et remplissez les valeurs :

```bash
cp .env.example .env.local
```

Voir les sections [TinaCMS Cloud](#configuration-tinacms-cloud) et [Web3Forms](#configuration-web3forms-formulaires) pour récupérer les clés.

### Lancer en mode développement

**Sans TinaCMS** (juste Astro, plus rapide) :

```bash
npm run dev
```

**Avec TinaCMS** (édition visuelle disponible sur `/admin`) :

```bash
npm run tina-dev
```

Le site est accessible sur [http://localhost:4321](http://localhost:4321).
L'interface TinaCMS est sur [http://localhost:4321/admin](http://localhost:4321/admin).

---

## Build pour la production

```bash
npm run build       # Astro seul
npm run tina-build  # Astro + TinaCMS (utiliser celui-ci en prod)
```

Le site statique est généré dans le dossier `dist/`. Tout son contenu est uploadable tel quel sur n'importe quel hébergement statique (Hostinger, Netlify, Vercel...).

Pour prévisualiser le build :

```bash
npm run preview
```

---

## Configuration TinaCMS Cloud

TinaCMS Cloud est nécessaire pour permettre à la cliente d'éditer le contenu en production sans toucher au code.

### Étape 1 — Créer un compte

1. Aller sur [https://app.tina.io](https://app.tina.io)
2. Se connecter avec GitHub
3. Cliquer sur **Create Project** et autoriser TinaCMS à accéder au repo `ecole-conduite-cdn`

### Étape 2 — Récupérer les clés

Sur le dashboard TinaCMS Cloud :

- **Client ID** : visible dans la page du projet (ex: `abc123-def456-...`)
- **Token** : créer un token de lecture (Read-Only Token) dans **Project Settings → Tokens**

### Étape 3 — Configurer les variables d'environnement

**En local** — fichier `.env.local` :

```env
TINA_PUBLIC_CLIENT_ID=<votre-client-id>
TINA_TOKEN=<votre-token>
```

**En production (GitHub)** — Secrets du repo :

1. GitHub → repo → **Settings → Secrets and variables → Actions**
2. Ajouter les deux secrets :
   - `TINA_PUBLIC_CLIENT_ID`
   - `TINA_TOKEN`

---

## Configuration Formsubmit (formulaires)

[Formsubmit.co](https://formsubmit.co) est un service gratuit, **sans inscription**, qui transmet les formulaires HTML par courriel.

### Étape 1 — Activation initiale (1 seule fois)

L'adresse de réception est lue automatiquement depuis `src/content/contact/info.md` (champ `email`). Par défaut : `ecoledeconduitecdn@gmail.com`.

Pour activer le service, **soumettez une fois le formulaire d'inscription depuis le site déployé** (un test est suffisant).

1. Ouvrir le site live (ex: `https://ecoledeconduitecotedesneiges.com/inscription`)
2. Remplir le formulaire avec un courriel test et envoyer
3. Vérifier la boîte de réception **ecoledeconduitecdn@gmail.com**
4. Cliquer sur le lien d'activation reçu (1 seul clic, à faire **une seule fois**)
5. Désormais, toutes les soumissions arrivent dans cette boîte sans aucune autre intervention

### Étape 2 — (Optionnel mais recommandé) Cacher l'adresse courriel

Par défaut, l'adresse courriel est visible dans le code source HTML, ce qui peut attirer du spam. Pour la cacher :

1. Aller sur [https://formsubmit.co/](https://formsubmit.co/) → onglet "Random String"
2. Saisir `ecoledeconduitecdn@gmail.com`
3. Confirmer le courriel reçu (s'il n'est pas déjà confirmé)
4. Copier le token aléatoire fourni (ex: `xa9d8f3k...`)
5. Ouvrir `src/content/contact/info.md` et remplacer la valeur du champ `email` par le token
   *(le courriel reste dans le code source du `info.md` mais on peut aussi le déplacer dans une variable d'environnement si besoin)*

### Aucun secret GitHub à ajouter pour les formulaires

Contrairement à d'autres services, Formsubmit ne requiert **aucune clé d'API**. Les seuls secrets GitHub à configurer concernent TinaCMS et l'hébergement.

---

## Déploiement GitHub Actions vers Hostinger

Le déploiement est entièrement automatisé. Chaque push sur la branche `main` déclenche :

1. Installation des dépendances
2. Build Astro + TinaCMS
3. Upload du dossier `dist/` vers `/public_html/` sur Hostinger via FTP

### Récupérer les credentials FTP Hostinger

1. Se connecter au [hPanel Hostinger](https://hpanel.hostinger.com)
2. Aller dans **Fichiers → Comptes FTP**
3. Noter :
   - **Hôte FTP** (ex: `ftp.votre-domaine.com` ou une IP)
   - **Nom d'utilisateur**
   - **Mot de passe**

### Ajouter les secrets GitHub

Dans GitHub → repo → **Settings → Secrets and variables → Actions** → ajouter :

| Secret | Valeur |
|--------|--------|
| `FTP_SERVER` | Hôte FTP Hostinger |
| `FTP_USERNAME` | Nom d'utilisateur FTP |
| `FTP_PASSWORD` | Mot de passe FTP |
| `TINA_PUBLIC_CLIENT_ID` | Voir TinaCMS Cloud |
| `TINA_TOKEN` | Voir TinaCMS Cloud |

### Lancer le déploiement

Faire un commit et un push sur `main` :

```bash
git add .
git commit -m "Mise à jour du site"
git push origin main
```

Suivre l'exécution dans l'onglet **Actions** du repo GitHub. Le site est en ligne 2-3 minutes après le push.

---

## Upload manuel FTP vers Hostinger

Si pour une raison quelconque GitHub Actions ne fonctionne pas, vous pouvez uploader manuellement :

### Avec FileZilla (recommandé)

1. Télécharger [FileZilla](https://filezilla-project.org)
2. Configurer la connexion :
   - **Hôte** : votre hôte FTP Hostinger
   - **Identifiant** : nom d'utilisateur FTP
   - **Mot de passe** : mot de passe FTP
   - **Port** : 21
3. Sur votre ordinateur, lancer `npm run tina-build` pour générer le dossier `dist/`
4. Dans FileZilla, naviguer côté serveur vers `/public_html/`
5. **Sélectionner tout le contenu de `dist/`** (et non le dossier `dist/` lui-même) et le glisser-déposer dans `/public_html/`
6. Confirmer le remplacement des fichiers existants

⚠️ Important : ne pas uploader les fichiers `node_modules/`, `.env`, `.git/`, `tina/__generated__/`.

---

## Guide pour la cliente non-technique (TinaCMS)

### Comment éditer le site

1. **Se connecter à TinaCMS** : aller sur [https://app.tina.io](https://app.tina.io) et se connecter avec le compte qui a été configuré.
2. **Choisir le projet** : cliquer sur **École de conduite Côte-des-Neiges**.
3. Vous verrez 5 catégories de contenu :
   - **Pages** (Accueil, Cours, Location, FAQ, Inscription, Merci)
   - **Témoignages**
   - **Cours**
   - **Coordonnées**
   - **FAQ — Questions fréquentes**
4. Cliquez sur la catégorie à modifier, puis sur l'élément voulu.
5. Modifiez les champs (titre, texte, images, prix...).
6. Cliquez sur **Save** en haut à droite.
7. **Le site se met à jour automatiquement** dans les 2-3 minutes (GitHub Actions reconstruit et déploie).

### Conseils

- **Photos** : utilisez l'icône image pour ajouter ou changer une image. TinaCMS la stocke automatiquement dans `/public/images/`.
- **Mise en gras / italique** : utilisez les boutons dans l'éditeur de texte enrichi.
- **Ne pas toucher** aux champs *slug*, *order*, *price_unit* sans demander conseil — ils contrôlent la mise en page.
- **En cas de doute**, prévenez le développeur avant de sauvegarder.

---

## Ajouter une nouvelle page

### 1. Créer le fichier de contenu

Créer `src/content/pages/nouvelle-page.md` :

```markdown
---
title: "Titre SEO de la nouvelle page"
slug: "nouvelle-page"
meta_description: "Description de 150-160 caractères pour Google."
hero_title: "Titre H1 affiché sur la page"
hero_subtitle: "Sous-titre court."
hero_image: "/images/hero-nouvelle-page.jpg"
---

Le contenu Markdown de la page va ici.
```

### 2. Créer la page Astro

Créer `src/pages/nouvelle-page.astro` :

```astro
---
import { getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';

const page = await getEntry('pages', 'nouvelle-page');
const data = page!.data;
---

<BaseLayout title={data.title} description={data.meta_description}>
  <Hero
    title={data.hero_title!}
    subtitle={data.hero_subtitle}
    image={data.hero_image!}
    imageAlt="Description de l'image en français."
    variant="compact"
  />
  <section class="py-20 container-page">
    <p>Contenu personnalisé.</p>
  </section>
</BaseLayout>
```

### 3. Ajouter au menu

Éditer `src/components/Header.astro` et `src/components/Footer.astro` pour ajouter le lien.

### 4. (Optionnel) Permettre l'édition via TinaCMS

L'entrée est déjà éditable car la collection `pages` est générique — il suffit d'aller dans TinaCMS → Pages → Create New.

---

## Structure du projet

```
ecole-conduite-cdn/
├── astro.config.mjs           # config Astro (site URL, intégrations)
├── tailwind.config.mjs        # palette + typographie custom
├── tsconfig.json              # TypeScript strict
├── package.json
├── .env.example               # gabarit des variables d'environnement
├── .github/workflows/
│   └── deploy.yml             # CI/CD GitHub Actions → FTP Hostinger
├── tina/
│   └── config.ts              # schéma TinaCMS (5 collections)
├── public/
│   ├── robots.txt             # SEO crawlers
│   ├── favicon.svg            # icône onglet
│   ├── og-default.jpg         # image Open Graph par défaut
│   └── images/                # photos hero et sections
├── src/
│   ├── content.config.ts      # schémas zod des collections
│   ├── content/
│   │   ├── pages/             # 6 pages (md)
│   │   ├── testimonials/      # 4 témoignages (md)
│   │   ├── courses/           # 2 cours (md)
│   │   ├── contact/           # info.md (singleton)
│   │   └── faqs/              # 5 questions (md)
│   ├── components/            # composants réutilisables
│   ├── layouts/
│   │   └── BaseLayout.astro   # squelette HTML/head/body
│   ├── pages/                 # 6 routes (.astro)
│   └── styles/
│       └── global.css         # base Tailwind + styles globaux
└── README.md
```

---

## Questions / problèmes

- **Le build échoue** : exécuter `npm run astro check` pour voir les erreurs TypeScript.
- **TinaCMS ne charge pas** : vérifier les variables `TINA_PUBLIC_CLIENT_ID` et `TINA_TOKEN`.
- **Les formulaires ne marchent pas** : vérifier que l'activation Formsubmit a été faite (premier envoi + clic sur le lien de confirmation reçu à `ecoledeconduitecdn@gmail.com`).
- **Le déploiement échoue** : aller dans GitHub → Actions, cliquer sur l'exécution rouge pour voir les logs.

---

## Licence

© 2026 École de conduite Côte-des-Neiges. Tous droits réservés.
