# Audit téléphone — page par page (5 novembre)

Méthode : captures écran par écran à 412×780, 390×664 et 360×640, test du défilement calé, test automatique
(débordement, zones tactiles, tailles, contraste). Pour chaque page : 10 critiques, et ce qui a été corrigé.
Le site ordinateur n'est pas modifié (règles limitées aux écrans ≤ 920 px ; photos téléphone via `<picture>`).

## Critiques communes (toutes pages)
1. Photos d'ouverture mal cadrées (visages coupés) → recadrages dédiés au téléphone (`m-*.webp`) servis seulement ≤ 920 px.
2. Animation « après coup » : texte qui apparaît longtemps après le calage → apparition 0,45 s, sans retard échelonné, zoom des photos réduit.
3. Trop de blanc dans les écrans peu denses → les listes occupent la hauteur disponible (lignes extensibles).
4. Descriptifs supprimés par excès de concision → une ligne d'explication rétablie (expertises, pourquoi S2A, méthode, engagements).
5. Marges de calage héritées (94 px) qui faisaient atterrir le défilement à côté des sections → corrigé.
6. Dernier écran (appel à l'action) vide → numéro de téléphone en grand et titre agrandi.
7. Pages légales, merci, 404 calées comme des écrans → calage désactivé, texte aligné avec des marges.
8. Zones tactiles < 44 px (tuiles de secteurs) → liens à 44 px mini.
9. Contrastes des mots dorés sur fond marine → doré clair partout sur fond sombre.
10. Écrans plus hauts que l'écran sur très petit téléphone → contenus resserrés, défilement interne autorisé.

## Accueil
1. Héros : personnes coupées à gauche → recadrage vertical centré sur le trio.
2. Zoom d'entrée trop marqué → 1,05 en 1,6 s.
3. Expertises : lignes serrées, moitié d'écran vide → lignes extensibles avec descriptif d'une ligne.
4. « Pourquoi S2A » sans explication → une phrase sous chaque titre.
5. Secteurs : carrousel de grandes cartes, trop sombres, un seul visible → mosaïque 2×3 de six photos qui remplit l'écran, coin doré plié.
6. Texte des secteurs peu lisible → dégradé allégé, nom en superposition.
7. Exemples : photos trop basses → photos à 34 % de la hauteur d'écran.
8. Équipe : seulement deux petits portraits → deux portraits hauts + photo d'équipe en bandeau.
9. Appel à l'action vide → numéro en grand.
10. Zones tactiles des secteurs → 44 px.

## Le cabinet
1. Héros : photo de bureau cadrée sur le plafond → recadrage centré.
2. Histoire : photo trop petite, blanc en haut → la photo prend la place libre.
3. Chiffres 1998 / 19 / 2 collés → mieux espacés.
4. Méthode : titres seuls, grand vide → titre + phrase, lignes extensibles.
5. Cadre professionnel : lignes minuscules dans un grand blanc → numéros dorés, texte 1,2 rem, lignes extensibles.
6. Aperçu équipe : portraits écrasés → format 3/4.
7. « Nous rejoindre » : bloc trop petit et vide → panneau marine qui remplit, phrase et pastilles rétablies.
8. Contraste du libellé « Notre manière de travailler » → corrigé.
9. Troisième carte d'équipe affichée par erreur → deux associés seulement.
10. Appel à l'action → numéro.

## Équipe
1. Photo d'ouverture mal cadrée → centrée sur la collaboratrice.
2. Associés : portraits petits, beaucoup de blanc → portraits qui remplissent l'écran.
3. Cheffes de mission : idem → idem.
4. Collaboratrices : noms centrés, énormes espaces → liste alignée à gauche, fonction en petit.
5. Années d'expérience supprimées → volontaire (trop d'information).
6. Bouton « Voir les collaboratrices » inutile → supprimé (liste visible).
7. Bloc « Nous rejoindre » doublon → masqué (présent sur Cabinet).
8. Ombres décalées sur les portraits → conservées, couleur adaptée au fond.
9. Titres en italique doré sur fond marine peu contrastés → doré clair.
10. Dernier écran → numéro.

## Expertises
1. Photo mal cadrée (présentateur coupé) → recadrage.
2. Six lignes sans respiration → lignes extensibles, numéros dorés.
3. Panneau ouvert déformait l'écran → la ligne ouverte prend plus de place.
4. Engagements : titres seuls → une phrase chacun.
5. Échéances : seule la première date → les deux dates, source en petit.
6. Fond de l'écran des échéances sombre → clair, sans cadre.
7. Texte 14 px dense → hiérarchie titre / phrase.
8. Bouton principal doré du héros → conservé.
9. Marges de calage → corrigées.
10. Dernier écran → numéro.

## Secteurs
1. Photo d'ouverture mal cadrée → recadrage centré sur le trio.
2. Fiches secteur : photo trop petite → photo à 34 % de l'écran, diagonale.
3. Numéros 01–06 timides → doré 1,8 rem.
4. Titres trop petits → 1,6 rem.
5. Listes à puces trop petites → 0,92 rem, filets.
6. Texte collé à la barre fixe → marge basse.
7. Pas d'indication de défilement → chaque fiche est un écran calé.
8. Écran de fin vide → numéro.
9. Photos de secteurs identiques à l'accueil → cohérent.
10. Texte d'introduction long → masqué sur téléphone.

## Ressources
1. Photo mal cadrée → recadrage vertical.
2. Quatre articles dans un seul écran → lignes extensibles.
3. Filtres inutiles pour quatre articles → masqués.
4. Aperçu de deux lignes → conservé, « Lire la suite » plus visible.
5. Étiquettes de catégorie trop petites → 12 px.
6. Fond clair strié → conservé (matière).
7. Note éditoriale → masquée.
8. Barre fixe → ne masque plus le dernier article.
9. Dernier écran → numéro.
10. Calage → corrigé.

## Contact
1. Photo de Nice : sujet coupé → cadrage 45 %.
2. Bouton « Nous écrire » sombre sur marine → doré.
3. Coordonnées entre filets → conservé.
4. Titre collé à la photo → marge ajoutée.
5. Formulaire sur fond blanc → carte blanche, filet doré, ombre.
6. Champs : 16 px (pas de zoom iPhone) → conservé.
7. Case à cocher 24 px → à surveiller (limite 44 px).
8. Barre fixe masquée sur cette page → conservé.
9. Pas de calage forcé sur le formulaire → écran dédié.
10. Mention rassurante → conservée.

## Changer de cabinet / Transmettre / Créer
1. Photos recadrées (vue du bureau, pharmacie, restaurant) pour montrer les personnes.
2. Étapes : numéro au-dessus du titre → numéro à gauche.
3. Étapes : texte caché → visible, taille 0,85 rem.
4. Liste « ce que vous obtenez » trop longue → tient dans l'écran.
5. Bouton en double dans l'encart → supprimé (l'appel à l'action suit).
6. Titre long en deux écrans → resserré.
7. Calage → corrigé.
8. Dernier écran → numéro.
9. Contrastes → corrigés.
10. Hauteur sur petits téléphones → défilement interne autorisé.

## Mentions légales / Merci / 404
1. Titre collé au bord gauche → marges.
2. Grand vide entre le titre et le contenu → resserré.
3. Calage inadapté à un texte long → désactivé.
4. « 404 » trop pâle → contraste corrigé.
5. Boutons pleine largeur → conservés.
6. Encart « À compléter » → conservé (à renseigner avant mise en ligne).
7. Pied de page → compact.
8. Barre fixe → conservée.
9. Hauteur de page → 1,7 à 4 écrans.
10. Lien menu → fonctionnel.
