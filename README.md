# Site S2A — Sud Alpes Audit

Site statique (HTML/CSS/JS, aucune dépendance, aucun build nécessaire).

## Déploiement sur Netlify

1. Sur [app.netlify.com](https://app.netlify.com), cliquer **Add new site → Import an existing project**
2. Connecter ce dépôt GitHub
3. Paramètres de build :
   - Build command : *(laisser vide)*
   - Publish directory : `.`
4. Déployer — Netlify fournit un lien `xxx.netlify.app` en moins d'une minute

## Domaine personnalisé

Une fois déployé, dans Netlify : **Site configuration → Domain management → Add a domain** → suivre les instructions pour pointer `sudalpesaudit.com` (changement des enregistrements DNS chez le registrar actuel).

## Structure

- `index.html`, `cabinet.html`, `expertises.html`, `secteurs.html`, `ressources.html`, `contact.html`, `mentions-legales.html`, `merci.html`, `404.html`
- `assets/css/styles.css` — feuille de style unique
- `assets/js/main.js` — comportements (nav mobile, accordéon, filtres ressources)
- `assets/img/` — images WebP optimisées

## À faire avant mise en ligne définitive

- [ ] Remplacer les visuels "temporaires" (portraits équipe, photos bureaux) par de vraies photos
- [ ] Compléter les mentions légales : capital social, TVA intracommunautaire, hébergeur
- [ ] Brancher le formulaire de contact sur un service d'envoi (Formspree, Netlify Forms, etc.)
