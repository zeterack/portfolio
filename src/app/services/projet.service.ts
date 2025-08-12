import { Injectable, signal } from '@angular/core';
import { Projet } from '../models/projet.model';

@Injectable({ providedIn: 'root' })
export class ProjetService {
  private projets = signal<Projet[]>([]);
  
  constructor() {
    this.loadProjets();
  }
  
  getProjets = this.projets.asReadonly();
  
  private async loadProjets(): Promise<void> {
    try {
      const response = await fetch('assets/data/projets.json');
      const data = await response.json();
      this.projets.set(data.projets);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    }
  }
  
  getProjetById(id: string): Projet | undefined {
    return this.projets().find(projet => projet.id === id);
  }
  
  getProjetsByContexte(contexte: string): Projet[] {
    return this.projets().filter(projet => projet.contexte === contexte);
  }
  
  getProjetsByTechnologie(technologie: string): Projet[] {
    return this.projets().filter(projet => 
      projet.technologies.includes(technologie)
    );
  }
  
  searchProjets(query: string): Projet[] {
    const searchTerm = query.toLowerCase();
    return this.projets().filter(projet =>
      projet.titre.toLowerCase().includes(searchTerm) ||
      projet.description_courte.toLowerCase().includes(searchTerm)
    );
  }
}
