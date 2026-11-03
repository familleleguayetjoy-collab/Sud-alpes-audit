# À valider avec les associés — checklist par page

La variante est un **modèle** : la structure, le style et les parcours sont prêts ; les contenus
ci-dessous sont des **textes plausibles ou repris de l'ancien site** qu'il faut confirmer ou
remplacer par les données réelles. Cocher au fur et à mesure du rendez-vous.

Légende : 🔴 à remplacer/confirmer impérativement · 🟠 à relire · 🟢 probablement bon

## Tout le site
- [ ] 🔴 **Formulaire de contact** : il est écrit pour Netlify (`data-netlify`) ; il **ne fonctionne pas sur GitHub Pages**. Prévoir l'hébergement définitif (Netlify, ou un service de formulaires) avant la mise en ligne.
- [ ] 🔴 **Balise `noindex`** : à retirer à la mise en ligne (sinon le site n'apparaîtra pas sur Google).
- [ ] 🟠 Slogan « À vos côtés, aujourd'hui, demain, toujours. » et « Avancer. Décider. Réussir. »
- [ ] 🟠 Bandeau noir « À la une » (actualité facturation électronique) : texte et lien à confirmer, à renouveler régulièrement.
- [ ] 🟠 Logo : version vectorielle fournie dans `variante/brand/logo/` (le site utilise encore l'image d'origine).
- [ ] 🟠 Police des titres (Newsreader, serif) — retour possible à Poppins en changeant une variable (`--serif` dans `assets/css/premium.css`).
- [ ] 🔴 **Photos et portraits** : actuels = images de substitution. Voir `BRIEF-PHOTOGRAPHE.md`.

## Accueil
- [ ] 🔴 Chiffres clés : **1998** (création), **19** collaborateurs, **2** bureaux.
- [ ] 🟠 Les 6 descriptifs d'expertises (une ligne chacun).
- [ ] 🟠 Texte « Pourquoi S2A » (3 arguments).
- [ ] 🔴 « Situations accompagnées » : annoncées comme *anonymisées et représentatives* → à confirmer qu'elles reflètent de vrais accompagnements (sinon retirer le mot « situations » ou les remplacer).
- [ ] 🟠 Phrase « Une équipe pluridisciplinaire — Nice · Allos · PACA ».

## Le cabinet
- [ ] 🔴 « Fondé en 1998 par Thierry Bozzola, expert-comptable inscrit à l'Ordre depuis la même année » (histoire).
- [ ] 🔴 « Fondateur du cabinet… » sur la fiche de Thierry Bozzola (décision en attente).
- [ ] 🔴 Chiffres : 1998 · **27+ ans d'expérience** (incohérent avec 1998 → 28 ans en 2026) · 19 collaborateurs · 2 bureaux.
- [ ] 🔴 **Cadre professionnel** (nouvelle section) : inscription à l'Ordre, commissariat aux comptes, secret professionnel, **responsabilité civile professionnelle assurée** → vérifier chaque affirmation, ajouter agréments/compagnie régionale si pertinent.
- [ ] 🟠 Les 4 valeurs (Rigueur, Proximité, Indépendance, Transmission).
- [ ] 🟠 « Nous rejoindre » : profils recherchés (confirmé / stagiaire / alternant), offres en cours ?

## Équipe
- [ ] 🔴 Les 12 personnes affichées (noms, fonctions) et **7 postes manquants** pour atteindre 19.
- [ ] 🔴 **Années d'expérience** de chaque personne : valeurs provisoires.
- [ ] 🟠 Libellé « Cheffe de mission », « Collaboratrice comptable polyvalente & gestionnaire de paie » (féminin partout : vérifier s'il y a des collaborateurs).

## Expertises
- [ ] 🟠 Contenu des 6 onglets (listes de prestations) — vérifier qu'elles correspondent à l'offre réelle.
- [ ] 🔴 « Un délai de réponse tenu… sous **48 h ouvrées** » : engagement à confirmer.
- [ ] 🟠 « Nos 4 engagements » (réactivité, vision consolidée, interlocuteur unique, outils).
- [ ] 🔴 **Facturation électronique** : calendrier (1ᵉʳ sept. 2026 réception pour tous + émission GE/ETI ; 1ᵉʳ sept. 2027 PME/TPE/micro) → à faire valider, la réglementation évolue.

## Secteurs
- [ ] 🟠 Les 5 secteurs et leurs 4 points chacun ; manque-t-il un secteur important (agriculture, commerce, associations, professions juridiques…) ?
- [ ] 🟠 Photos de chaque secteur.

## Ressources
- [ ] 🔴 Les 4 articles sont **génériques** : faire relire juridiquement, dater, ajouter l'auteur et la date de mise à jour. Prévoir une alimentation régulière.

## Contact
- [ ] 🔴 Téléphone **04 97 03 15 30**, e-mail **contact@sudalpesaudit.com**, horaires **Lun–Ven 9h–12h30 / 14h–17h30**, adresses Nice et Allos.
- [ ] 🔴 « Réponse sous 48 h ouvrées ».
- [ ] 🟠 Liste des motifs de demande du formulaire. Le formulaire a été **simplifié** (nom et prénom, courriel, téléphone facultatif, demande, message) : confirmer que ces informations suffisent à traiter une demande.
- [ ] 🟠 Mentions rassurantes du panneau : « Réponse sous 48 h ouvrées », « Échange confidentiel », « Un interlocuteur dédié ».

## Nouvelles pages (modèles à valider)
- [ ] 🔴 **Changer de cabinet** : les 4 étapes (premier échange, proposition écrite, reprise du dossier avec prise de contact du confrère, mise en place) et la mention « honoraires présentés avant tout engagement ».
- [ ] 🔴 **Transmettre son entreprise** : les 4 étapes et la promesse de confidentialité ; la page dit que S2A accompagne cédants **et** repreneurs.
- [ ] 🔴 **Créer son entreprise** : les 4 étapes ; ajouter les formules/tarifs si le cabinet souhaite les afficher.
- [ ] 🟠 Souhaite-t-on d'autres pages « moments clés » (difficultés de gestion, développement) ?

## Mentions légales / RGPD
- [ ] 🔴 SIRET, capital, RCS, TVA intracommunautaire, directeur de la publication, hébergeur, numéro d'inscription à l'Ordre, assurance RC pro, médiateur.
- [ ] 🔴 Politique de confidentialité et gestion des cookies (le site n'utilise aucun traceur : à conserver ou à adapter si outil de mesure d'audience).

## Questions stratégiques à trancher
- Afficher des **tarifs ou formules** ? (les créateurs d'entreprise le demandent le plus)
- Afficher des **références clients** ou témoignages (avec accord) ?
- Une page **recrutement** avec offres en cours ?
- Un espace **client** (portail documentaire, lien vers l'outil utilisé) ?
- Prise de **rendez-vous en ligne** (agenda) à la place du formulaire seul ?

---

## Mises à jour du 2 novembre (à valider avec les associés)

### Slogan et accueil
- [ ] 🔴 Slogan **sans « audit »** : « Expertise comptable · Conseil stratégique » (accroche et en-tête). Vérifier que c'est bien le positionnement voulu (le commissariat aux comptes reste présenté dans les expertises et le cadre professionnel).
- [ ] 🟠 Hero : visuel plein bord + chiffres clés 1998 / 19 / 2.
- [ ] 🔴 **« Exemples d'accompagnements »** : les 4 cas (ouverture d'un restaurant, constitution d'une holding, reprise d'une pharmacie, société de charter à Nice) sont **imaginés** ; ils sont présentés comme des *exemples*, pas comme de vrais clients. À remplacer par des missions réelles ou à valider avec les associés (savoir-faire effectivement proposé : plan de financement, étude de financement, montage de holding, évaluation de fonds…).
- [ ] 🟠 « Pourquoi S2A » : trois arguments raccourcis.

### Secteurs (6 au lieu de 5)
- [ ] 🔴 Secteurs retenus : Santé · Hôtellerie-restauration · BTP & artisans · Immobilier · Services, conseil & start-up · **Nautisme, loisirs & montagne** (nouveau). À confirmer selon la clientèle réelle du cabinet (voir pistes dans le message de la session : commerce, tech/Sophia Antipolis, événementiel, professions libérales…).
- [ ] 🟠 Pour chaque secteur : les 4 points listés.

### Cabinet
- [ ] 🔴 **Histoire** : « Depuis 1998, le cabinet… » (la mention « fondé par Thierry Bozzola » a été retirée par prudence ; confirmer s'il faut la remettre). Chiffres affichés : 1998 · 19 collaborateurs · 2 bureaux (« 27+ ans d'expérience » retiré car redondant avec 1998).
- [ ] 🔴 **Manière de travailler** (nouvelle section) : « Pas de pôle, chaque collaborateur responsable de ses dossiers de A à Z », un seul interlocuteur, réactivité accrue, accompagnement sur tous les sujets, vision globale. À valider mot à mot.
- [ ] 🟠 **Nous rejoindre** : quatre avantages affichés (dossiers de A à Z, équipe à taille humaine, Nice ou Allos, progression continue) → à confirmer ou compléter (télétravail, formation, avantages réels).

### Contact
- [ ] 🟠 Page en deux écrans (coordonnées, puis formulaire). Champ « téléphone » du formulaire retiré pour simplifier.

### Images
- [ ] 🟠 Visuels actuels = **remplacements d'ambiance** (certains générés). Prompts prêts dans `PROMPTS-IMAGES.md`, brief photographe dans `BRIEF-PHOTOGRAPHE.md`.

### Mises à jour du 2 novembre (suite)
- [ ] 🔴 **Exemples d'accompagnements** (remplacent holding et charter, jugés trop éloignés de la majorité des clients) : *Ouvrir son restaurant* (création), *Reprendre une entreprise — exemple d'une pharmacie* (reprise), *Choisir le bon statut* (entreprise individuelle → société), *Y voir clair dans sa trésorerie* (pilotage). Tous **imaginés** : à valider ou remplacer. Souhaite-t-on garder un exemple « holding » ?
- [ ] 🔴 **Secteurs** : « Nautisme & montagne » retiré. 6 secteurs : Professions libérales & santé (photo des médecins) · Hôtellerie & restauration · **Commerce de proximité** (nouveau, photo de remplacement) · BTP & artisans · Immobilier · Services & start-up. Autres pistes : événementiel & congrès, associations.
- [ ] 🟠 Accueil : les chiffres 1998 / 19 / 2 ne figurent plus en page d'accueil (ils restent sur la page Cabinet).
- [ ] 🟠 **Photos des secteurs** (santé, restauration, BTP, immobilier) : visuels générés fournis par le cabinet, intégrés tels quels ; l'image du **port de plaisance** (`port-plaisance.webp`) est stockée mais non utilisée (secteur « nautisme » retiré). Photo « Commerce de proximité » toujours provisoire. Tuiles de la page d'accueil : seulement le nom du secteur.
