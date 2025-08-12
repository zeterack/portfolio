export interface Projet {
  id: string;
  titre: string;
  contexte: 'IUT' | 'Entreprise' | 'Personnel' | 'Autre';
  date_realisation: string;
  image: string;
  description_courte: string;
  description_complete: string;
  objectifs: string[];
  technologies: string[];
  soft_skills: string[];
  defis_techniques: string[];
  solutions_apportees: string[];
  resultats: string[];
  demo_url: string | null;
  github_url: string | null;
  screenshots: string[];
}
