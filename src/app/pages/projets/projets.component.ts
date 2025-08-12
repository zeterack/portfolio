import { Component, computed, inject, signal } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { Projet } from '../../models/projet.model';
import { RouterLink } from '@angular/router';

type FilterContexte = 'tous' | 'IUT' | 'Entreprise' | 'Personnel' | 'Autre';

@Component({
  selector: 'app-projets',
  template: `
    <div class="projets-container">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <h1 class="page-title">Mes Projets</h1>
          <p class="page-description">
            Découvrez les projets que j'ai réalisés durant ma formation, 
            mon alternance et sur mon temps personnel.
          </p>
        </header>

        <!-- Filtres -->
        <div class="filters">
          <div class="filter-group">
            <label class="filter-label">Contexte de réalisation :</label>
            <div class="filter-buttons">
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedContexte() === 'tous'"
                (click)="setContexteFilter('tous')">
                Tous
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedContexte() === 'IUT'"
                (click)="setContexteFilter('IUT')">
                IUT
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedContexte() === 'Entreprise'"
                (click)="setContexteFilter('Entreprise')">
                Entreprise
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedContexte() === 'Personnel'"
                (click)="setContexteFilter('Personnel')">
                Personnel
              </button>
              <button 
                class="filter-btn"
                [class.filter-btn--active]="selectedContexte() === 'Autre'"
                (click)="setContexteFilter('Autre')">
                Autre
              </button>
            </div>
          </div>
        </div>

        <!-- Résultats -->
        <div class="results-info">
          <span class="results-count">
            {{ filteredProjets().length }} projet(s) trouvé(s)
          </span>
        </div>

        <!-- Grille des projets -->
        <div class="projets-grid">
          @for (projet of filteredProjets(); track projet.id) {
            <a [routerLink]="['/projets', projet.id]" class="projet-card">
              <div class="card-image">
                <img [src]="projet.image" [alt]="projet.titre" class="project-image">
                <div class="image-overlay">
                  <span class="view-details">Voir détails</span>
                </div>
              </div>
              
              <div class="card-content">
                <div class="card-header">
                  <h3 class="projet-titre">{{ projet.titre }}</h3>
                  <span class="contexte-badge" [class]="'contexte-badge--' + projet.contexte.toLowerCase()">
                    {{ projet.contexte }}
                  </span>
                </div>
                
                <p class="projet-description">{{ projet.description_courte }}</p>
                
                <div class="projet-technologies">
                  @for (tech of projet.technologies.slice(0, 4); track tech) {
                    <span class="tech-badge">{{ formatTechnology(tech) }}</span>
                  }
                  @if (projet.technologies.length > 4) {
                    <span class="tech-badge tech-badge--more">
                      +{{ projet.technologies.length - 4 }}
                    </span>
                  }
                </div>
                
                <div class="card-footer">
                  <div class="projet-date">
                    <span class="date-label">📅</span>
                    <span class="date-value">{{ formatDate(projet.date_realisation) }}</span>
                  </div>
                  
                  <div class="projet-links">
                    @if (projet.github_url) {
                      <a href="{{ projet.github_url }}" 
                         target="_blank" 
                         rel="noopener"
                         class="github-link"
                         (click)="$event.stopPropagation()"
                         aria-label="Voir sur GitHub">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    }
                    @if (projet.demo_url) {
                      <a href="{{ projet.demo_url }}" 
                         target="_blank" 
                         rel="noopener"
                         class="demo-link"
                         (click)="$event.stopPropagation()"
                         aria-label="Voir la démo">
                        🔗
                      </a>
                    }
                  </div>
                </div>
              </div>
            </a>
          } @empty {
            <div class="empty-state">
              <div class="empty-icon">📁</div>
              <h3>Aucun projet trouvé</h3>
              <p>Essayez de modifier vos filtres pour voir plus de résultats.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .projets-container {
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

    .projets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 2rem;
    }

    .projet-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      display: block;
    }

    .projet-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
      border-color: var(--orange-primary);
    }

    .card-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .project-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .projet-card:hover .project-image {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .projet-card:hover .image-overlay {
      opacity: 1;
    }

    .view-details {
      color: white;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .card-content {
      padding: 1.5rem;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .projet-titre {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.3;
    }

    .contexte-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    .contexte-badge--iut {
      background: #e3f2fd;
      color: #1565c0;
    }

    .contexte-badge--entreprise {
      background: #f3e5f5;
      color: #7b1fa2;
    }

    .contexte-badge--personnel {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .contexte-badge--autre {
      background: #fff3e0;
      color: #ef6c00;
    }

    .projet-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .projet-technologies {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .tech-badge {
      padding: 0.25rem 0.5rem;
      background: var(--violet-light);
      color: var(--violet-primary);
      border-radius: 0.25rem;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .tech-badge--more {
      background: var(--bg-secondary);
      color: var(--text-muted);
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .projet-date {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    .date-label {
      font-size: 1rem;
    }

    .projet-links {
      display: flex;
      gap: 0.5rem;
    }

    .github-link, .demo-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .github-link:hover {
      background: var(--text-primary);
      color: white;
      transform: translateY(-2px);
    }

    .demo-link:hover {
      background: var(--orange-primary);
      color: white;
      transform: translateY(-2px);
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
      .projets-grid {
        grid-template-columns: 1fr;
      }

      .filters {
        padding: 1rem;
      }

      .filter-buttons {
        gap: 0.25rem;
      }

      .filter-btn {
        font-size: 0.875rem;
        padding: 0.4rem 0.8rem;
      }

      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `],
  imports: [RouterLink]
})
export class ProjetsComponent {
  private projetService = inject(ProjetService);
  
  selectedContexte = signal<FilterContexte>('tous');
  
  projets = this.projetService.getProjets;
  
  filteredProjets = computed(() => {
    let filtered = this.projets();
    
    if (this.selectedContexte() !== 'tous') {
      filtered = filtered.filter(projet => projet.contexte === this.selectedContexte());
    }
    
    return filtered;
  });
  
  setContexteFilter(contexte: FilterContexte): void {
    this.selectedContexte.set(contexte);
  }
  
  formatTechnology(tech: string): string {
    const techNames: Record<string, string> = {
      'angular': 'Angular',
      'typescript': 'TypeScript',
      'css': 'CSS',
      'git': 'Git',
      'java': 'Java',
      'spring-boot': 'Spring Boot',
      'sql': 'SQL'
    };
    return techNames[tech] || tech;
  }
  
  formatDate(dateStr: string): string {
    const months = [
      'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
      'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
    ];
    
    const [year, month] = dateStr.split('-');
    const monthName = months[parseInt(month) - 1] || '';
    return `${monthName} ${year}`;
  }
}
