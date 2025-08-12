import { Injectable, signal } from '@angular/core';
import { Competence } from '../models/competence.model';

@Injectable({ providedIn: 'root' })
export class CompetenceService {
  private competences = signal<Competence[]>([]);
  
  constructor() {
    this.loadCompetences();
  }
  
  getCompetences = this.competences.asReadonly();
  
  private async loadCompetences(): Promise<void> {
    try {
      // Import dynamique du fichier JSON
      const competencesModule = await import('../../assets/data/competences.json');
      this.competences.set(competencesModule.default.competences as Competence[]);
    } catch (error) {
      console.error('Erreur lors du chargement des compétences:', error);
    }
  }
  
  getCompetenceById(id: string): Competence | undefined {
    return this.competences().find(comp => comp.id === id);
  }
  
  getCompetencesByType(type: 'technique' | 'soft_skills'): Competence[] {
    return this.competences().filter(comp => comp.type === type);
  }
  
  getCompetencesByLieu(lieu: string): Competence[] {
    return this.competences().filter(comp => comp.lieu_apprentissage === lieu);
  }
  
  searchCompetences(query: string): Competence[] {
    const searchTerm = query.toLowerCase();
    return this.competences().filter(comp =>
      comp.nom.toLowerCase().includes(searchTerm) ||
      comp.description.toLowerCase().includes(searchTerm)
    );
  }
}
