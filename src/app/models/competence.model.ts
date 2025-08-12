export interface Competence {
  id: string;
  nom: string;
  type: 'technique' | 'soft_skills';
  lieu_apprentissage: 'IUT' | 'Entreprise' | 'Autre';
  icone: string;
  niveau: 'initie' | 'debutant' | 'intermediaire' | 'avancee' | 'expert';
  description: string;
  contexte_apprentissage: string;
  projets_lies: string[];
  certifications: string[];
  formations: string[];
}

export interface NiveauDescription {
  niveau: string;
  description: string;
}

export const NIVEAUX_DESCRIPTIONS: NiveauDescription[] = [
  {
    niveau: 'initie',
    description: "J'ai lu la documentation, je connais ses usages et j'ai peut-être déjà essayé le produit."
  },
  {
    niveau: 'debutant',
    description: "J'ai déjà utilisé la compétence dans un projet."
  },
  {
    niveau: 'intermediaire',
    description: "Je connais une grande partie des fonctionnalités de la compétence et connais ses points de blocages."
  },
  {
    niveau: 'avancee',
    description: "Je connais presque tout de la compétence et une grande partie des points de blocages classiques."
  },
  {
    niveau: 'expert',
    description: "Je connais tout sur le bout des doigts, je suis le plus à jour sur le sujet possible et j'ai déjà résolu des cas de blocage complexes sur cette compétence."
  }
];
