import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Competence } from '../models/competence.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompetenceService {
  private http = HttpClient;
  private competences = signal<Competence[]>([]);
  
  constructor() {
    this.loadCompetences();
  }
  
  getCompetences = this.competences.asReadonly();
  
  private async loadCompetences(): Promise<void> {
    try {
      const response = await fetch('assets/data/competences.json');
      const data = await response.json();
      this.competences.set(data.competences);
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
