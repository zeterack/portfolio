# Prompt de Création - Portfolio de Fin d'Alternance

## Contexte
Je suis en fin d'alternance et je dois créer un site web portfolio professionnel pour présenter mes compétences, projets et expériences acquises durant ma formation.

## Structure du projet

Le portfolio sera composé de 4 pages principales avec une navigation claire et intuitive :

### 1. Page d'Accueil - Description Personnelle
**Route** : `/` ou `/home`

**Contenu** :
- Courte description personnelle professionnelle
- Photo de profil
- Présentation synthétique de mon parcours
- Call-to-action vers les autres sections
- Liens rapides vers CV et contacts

**Design** : Page épurée et accueillante avec focus sur la présentation personnelle

### 2. Page Compétences
**Route** : `/competences`

**Structure de la page** :
- **Filtres de tri** :
  - Par type : Compétences techniques / Soft skills
  - Par lieu d'apprentissage : IUT / Entreprise / Autre
  - Combinaison des deux filtres possible

**Layout** : 
- Grille de 3 compétences par ligne (responsive)
- Chaque compétence sous forme de carte cliquable

**Contenu des cartes** :
- Nom de la compétence
- Icône ou logo représentatif
- Niveau de maîtrise (barre de progression ou étoiles)
- Tags : type + lieu d'apprentissage

**Page détail compétence** (`/competences/:id`) :
- Titre et description courte de la compétence
- Niveau de maîtrise détaillé
- Contexte d'apprentissage
- **Section "Projets liés"** : Liste cliquable de tous les projets utilisant cette compétence
- Liens vers formations/certifications si applicable

### 3. Page Projets
**Route** : `/projets`

**Structure de la page** :
- **Filtres de tri** :
  - Par contexte : IUT / Entreprise (Alternance) / Personnel / Autre
  - Par technologie utilisée
  - Par date de réalisation

**Layout** : 
- Grille de 3 projets par ligne (responsive)
- Chaque projet sous forme de carte cliquable

**Contenu des cartes** :
- Titre du projet
- Image/screenshot représentatif
- Courte description (2-3 lignes)
- Liste des technologies utilisées (badges) sont des compétences
- Contexte de réalisation (tag coloré)
- Date de réalisation
- Lien GitHub (icône + bouton direct)

**Page détail projet** (`/projets/:id`) :
- Titre et description complète
- Contexte et objectifs du projet
- Technologies utilisées (avec liens vers les compétences)
- Soft skills mobilisées (avec liens vers les compétences)
- Défis techniques rencontrés
- Solutions apportées
- Résultats obtenus
- Galerie d'images/screenshots
- Liens vers démo live et/ou repository GitHub

### 4. Page Alternance
**Route** : `/alternance`

**Contenu détaillé** :
- **Présentation de l'entreprise** :
  - Nom et secteur d'activité
  - Taille et environnement de travail
  - Technologies et stack technique utilisées

- **Détails de l'alternance** :
  - Durée et période
  - Rythme (ex: 3 semaines entreprise / 1 semaine IUT)
  - Intitulé du poste et équipe d'accueil

- **Missions et responsabilités** :
  - Liste détaillée des missions réalisées
  - Évolution des responsabilités au cours du temps
  - Projets principaux menés

- **Compétences développées** :
  - Compétences techniques acquises
  - Soft skills développées
  - Outils et méthodologies découverts

- **Expérience et apprentissages** :
  - Points positifs et défis relevés
  - Adaptation au monde professionnel
  - Collaboration avec l'équipe
  - Impact de l'alternance sur mon projet professionnel

- **Témoignages** (optionnel) :
  - Retour de mon maître d'apprentissage
  - Recommandations de collègues

### Navigation et UX

**Menu principal** :
- Accueil
- Compétences  
- Projets
- Alternance
- Contact (modal ou page dédiée)

**Fonctionnalités transversales** :
- **Liens croisés** : Depuis une compétence → projets liés, et depuis un projet → compétences utilisées

**Responsive Design** :
- Mobile : 1 carte par ligne
- Tablette : 2 cartes par ligne  
- Desktop : 3 cartes par ligne
- Menu burger sur mobile

Cette structure offre une navigation intuitive avec des interconnexions logiques entre les différentes sections, permettant aux visiteurs de découvrir votre profil de manière fluide et engageante.

## Système de niveaux de compétences

Le portfolio utilise un système de 5 niveaux pour évaluer les compétences, avec des descriptions précises qui apparaîtront en tooltip au survol :

### **Initié**
J'ai lu la documentation, je connais ses usages et j'ai peut-être déjà essayé le produit.

### **Débutant** 
J'ai déjà utilisé la compétence dans un projet.

### **Intermédiaire**
Je connais une grande partie des fonctionnalités de la compétence et connais ses points de blocages.

### **Avancée**
Je connais presque tout de la compétence et une grande partie des points de blocages classiques.

### **Expert**
Je connais tout sur le bout des doigts, je suis le plus à jour sur le sujet possible et j'ai déjà résolu des cas de blocage complexes sur cette compétence.

**Implémentation technique** : Ces descriptions seront intégrées comme tooltips ou popovers au survol des badges de niveau dans l'interface, permettant aux visiteurs de comprendre précisément le niveau de maîtrise pour chaque compétence.

## Charte Graphique

Le portfolio respectera une identité visuelle moderne et professionnelle basée sur une palette de couleurs cohérente :

### **Palette de Couleurs**

**Couleur Principale** : **Orange**
- Utilisation : Éléments d'accentuation, boutons primaires, liens actifs, badges de niveau
- Variations : Orange vif pour les interactions, orange plus doux pour les backgrounds

**Couleurs Neutres** : **Blanc / Noir** 
- Mode Jour : Fond blanc, texte noir/gris foncé
- Mode Nuit : Fond noir/gris très foncé, texte blanc/gris clair
- Utilisation : Texte principal, backgrounds, cartes, navigation

**Couleur d'Atténuation** : **Violet**
- Utilisation : Éléments secondaires, hover effects, bordures subtiles, tags secondaires
- Variations : Violet clair pour les backgrounds légers, violet foncé pour les accents

### **Mode Jour/Nuit**

**Fonctionnalité obligatoire** : Le portfolio doit proposer un toggle mode jour/nuit

**Mode Jour** :
- Background principal : Blanc (#FFFFFF)
- Texte principal : Noir/Gris foncé (#212121, #424242)
- Cartes : Fond blanc avec ombres légères
- Accents : Orange vif, violet clair

**Mode Nuit** :
- Background principal : Noir/Gris très foncé (#121212, #1e1e1e)
- Texte principal : Blanc/Gris clair (#FFFFFF, #E0E0E0)
- Cartes : Fond gris foncé avec bordures subtiles
- Accents : Orange plus doux, violet plus saturé

### **Implémentation Technique**
- **Toggle button** visible dans la navigation pour basculer entre les modes
- **Persistance** : Sauvegarde de la préférence utilisateur (localStorage)
- **Détection automatique** : Respect de la préférence système (prefers-color-scheme)
- **Transitions fluides** : Animation douce lors du changement de mode
- **Accessibilité** : Contraste suffisant dans les deux modes
