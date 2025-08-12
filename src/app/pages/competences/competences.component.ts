import { Component, computed, inject, signal } from '@angular/core';
import { CompetenceService } from '../../services/competence.service';
import { Competence, NIVEAUX_DESCRIPTIONS } from '../../models/competence.model';
import { RouterLink } from '@angular/router';

type FilterType = 'tous' | 'technique' | 'soft_skills';
type FilterLieu = 'tous' | 'IUT' | 'Entreprise' | 'Autre';

@Component({
  selector: 'app-competences',
  template: `
    <div class="competences-container">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <h1 class="page-title">Mes Compétences</h1>
          <p class="page-description">
            Découvrez les compétences techniques et soft skills que j'ai développées 
            durant ma formation et mon alternance.
          </p>
        </header>

        <!-- Filtres -->
        <div class="filters">
          <div class="filter-group">
            <label class="filter-label">Type de compétence :</label>
            <div class="filter-buttons">
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedType() === 'tous'"
                (click)="setTypeFilter('tous')">
                Toutes
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedType() === 'technique'"
                (click)="setTypeFilter('technique')">
                Techniques
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedType() === 'soft_skills'"
                (click)="setTypeFilter('soft_skills')">
                Soft Skills
              </button>
            </div>
          </div>

          <div class="filter-group">
            <label class="filter-label">Lieu d'apprentissage :</label>
            <div class="filter-buttons">
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedLieu() === 'tous'"
                (click)="setLieuFilter('tous')">
                Tous
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedLieu() === 'IUT'"
                (click)="setLieuFilter('IUT')">
                IUT
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedLieu() === 'Entreprise'"
                (click)="setLieuFilter('Entreprise')">
                Entreprise
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedLieu() === 'Autre'"
                (click)="setLieuFilter('Autre')">
                Autre
              </button>
            </div>
          </div>
        </div>

        <!-- Résultats -->
        <div class="results-info">
          <span class="results-count">
            {{ filteredCompetences().length }} compétence(s) trouvée(s)
          </span>
        </div>

        <!-- Grille des compétences -->
        <div class="competences-grid">
          @for (competence of filteredCompetences(); track competence.id) {
            <a [routerLink]="['/competences', competence.id]" class="competence-card">
              <div class="card-header">
                <div class="competence-icon">
                  <img [src]="competence.icone" [alt]="competence.nom" class="icon-image">
                </div>
                <div class="competence-niveau">
                  <span 
                    class="niveau-badge"
                    [class]="'niveau-badge--' + competence.niveau"
                    [title]="getNiveauDescription(competence.niveau)">
                    {{ formatNiveau(competence.niveau) }}
                  </span>
                </div>
              </div>
              
              <div class="card-content">
                <h3 class="competence-nom">{{ competence.nom }}</h3>
                <p class="competence-description">{{ competence.description }}</p>
                
                <div class="competence-tags">
                  <span class="tag tag--type">{{ formatType(competence.type) }}</span>
                  <span class="tag tag--lieu">{{ competence.lieu_apprentissage }}</span>
                </div>
                
                @if (competence.projets_lies.length > 0) {
                  <div class="competence-projets">
                    <span class="projets-count">
                      {{ competence.projets_lies.length }} projet(s) lié(s)
                    </span>
                  </div>
                }
              </div>
            </a>
          } @empty {
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <h3>Aucune compétence trouvée</h3>
              <p>Essayez de modifier vos filtres pour voir plus de résultats.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .competences-container {
      min-height: calc(100vh - 80px);
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .page-description {
      font-size: 1.2rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .filters {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-label {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.9rem;
    }

    .filter-buttons {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background: var(--bg-primary);
      color: var(--text-secondary);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .filter-btn:hover {
      border-color: var(--orange-primary);
      color: var(--orange-primary);
    }

    .filter-btn--active {
      background: var(--orange-primary);
      color: white;
      border-color: var(--orange-primary);
    }

    .results-info {
      margin-bottom: 1.5rem;
    }

    .results-count {
      color: var(--text-secondary);
      font-weight: 500;
    }

    .competences-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .competence-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 1.5rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      display: block;
    }

    .competence-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border-color: var(--orange-primary);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .competence-icon {
      width: 48px;
      height: 48px;
      border-radius: 0.5rem;
      background: var(--bg-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
    }

    .icon-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .niveau-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      cursor: help;
    }

    .niveau-badge--initie {
      background: #e3f2fd;
      color: #1565c0;
    }

    .niveau-badge--debutant {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .niveau-badge--intermediaire {
      background: #fff3e0;
      color: #ef6c00;
    }

    .niveau-badge--avancee {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .niveau-badge--expert {
      background: #ffebee;
      color: #c62828;
    }

    .competence-nom {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .competence-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .competence-tags {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .tag {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .tag--type {
      background: var(--violet-light);
      color: var(--violet-primary);
    }

    .tag--lieu {
      background: var(--orange-light);
      color: var(--orange-primary);
    }

    .projets-count {
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .competences-grid {
        grid-template-columns: 1fr;
      }

      .filters {
        padding: 1rem;
      }

      .filter-group {
        gap: 0.75rem;
      }

      .filter-buttons {
        gap: 0.25rem;
      }

      .filter-btn {
        font-size: 0.875rem;
        padding: 0.4rem 0.8rem;
      }
    }
  `],
  imports: [RouterLink]
})
export class CompetencesComponent {
  private competenceService = inject(CompetenceService);
  
  selectedType = signal<FilterType>('tous');
  selectedLieu = signal<FilterLieu>('tous');
  
  competences = this.competenceService.getCompetences;
  
  filteredCompetences = computed(() => {
    let filtered = this.competences();
    
    if (this.selectedType() !== 'tous') {
      filtered = filtered.filter(comp => comp.type === this.selectedType());
    }
    
    if (this.selectedLieu() !== 'tous') {
      filtered = filtered.filter(comp => comp.lieu_apprentissage === this.selectedLieu());
    }
    
    return filtered;
  });
  
  setTypeFilter(type: FilterType): void {
    this.selectedType.set(type);
  }
  
  setLieuFilter(lieu: FilterLieu): void {
    this.selectedLieu.set(lieu);
  }
  
  formatType(type: string): string {
    return type === 'technique' ? 'Technique' : 'Soft Skill';
  }
  
  formatNiveau(niveau: string): string {
    const niveaux = {
      'initie': 'Initié',
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avancee': 'Avancée',
      'expert': 'Expert'
    };
    return niveaux[niveau as keyof typeof niveaux] || niveau;
  }
  
  getNiveauDescription(niveau: string): string {
    const description = NIVEAUX_DESCRIPTIONS.find(n => n.niveau === niveau);
    return description?.description || '';
  }
}
