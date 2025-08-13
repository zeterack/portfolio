import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../services/projet.service';
import { CompetenceService } from '../../services/competence.service';
import { Projet } from '../../models/projet.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="projet-detail-container" *ngIf="projet()">
      <div class="container">
        <!-- Header avec retour -->
        <header class="detail-header">
          <button class="back-button" (click)="goBack()">
            <span class="back-icon">←</span>
            Retour aux projets
          </button>
          
          <div class="projet-header">
            <div class="projet-main-info">
              <h1 class="projet-title">{{ projet()!.titre }}</h1>
              <div class="projet-meta">
                <span class="projet-context" 
                      [class]="'context-' + projet()!.contexte.toLowerCase()">
                  {{ projet()!.contexte }}
                </span>
                <div class="projet-status">
                  <span class="status-badge status-termine">
                    Terminé
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Description et résumé -->
        <section class="description-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📋</span>
              Description du projet
            </h2>
            <div class="description-content">
              <p class="main-description">{{ projet()!.description_complete }}</p>
            </div>
          </div>
        </section>

        <!-- Informations générales -->
        <section class="info-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">ℹ️</span>
              Informations générales
            </h2>
            <div class="info-grid">
              <div class="info-item">
                <h3 class="info-title">Date de création</h3>
                <p class="info-value">{{ projet()!.date_realisation }}</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Contexte</h3>
                <p class="info-value">{{ getContextDescription(projet()!.contexte) }}</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Type de projet</h3>
                <p class="info-value">{{ getProjectType(projet()!.titre) }}</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Équipe</h3>
                <p class="info-value">{{ getTeamSize(projet()!.contexte) }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Technologies utilisées -->
        <section class="technologies-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🛠️</span>
              Technologies et outils
            </h2>
            <div class="technologies-content">
              <div class="tech-category">
                <h3 class="category-title">Technologies principales</h3>
                <div class="tech-badges">
                  <span *ngFor="let tech of projet()!.technologies" class="tech-badge" 
                        [title]="formatTechnology(tech)"
                        (click)="navigateToCompetenceDetail(tech)">
                    <img [src]="getTechIcon(tech)" [alt]="formatTechnology(tech)" class="tech-icon">
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        </section>
  
        <!-- Liens et ressources -->
        <section class="links-section" *ngIf="projet()!.github_url || projet()!.demo_url">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🔗</span>
              Liens et ressources
            </h2>
            <div class="links-content">
              <div class="link-buttons">
                <a *ngIf="projet()!.github_url" 
                   [href]="projet()!.github_url" 
                   target="_blank" 
                   class="link-button github">
                  <span class="link-icon">📂</span>
                  Voir le code source
                </a>
                <a *ngIf="projet()!.demo_url" 
                   [href]="projet()!.demo_url" 
                   target="_blank" 
                   class="link-button demo">
                  <span class="link-icon">🚀</span>
                  Voir la démonstration
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Actions -->
        <section class="actions-section">
          <div class="actions-container">
            <button class="action-button primary" (click)="navigateToProjects()">
              Voir tous mes projets
            </button>
            <button class="action-button secondary" (click)="goBack()">
              Retour aux projets
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- État de chargement -->
    <div *ngIf="!projet()" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Chargement du projet...</p>
    </div>
  `,
  styles: [`
    .projet-detail-container {
      min-height: calc(100vh - 80px);
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .detail-header {
      margin-bottom: 3rem;
    }

    .back-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: none;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 2rem;
    }

    .back-button:hover {
      background: var(--bg-secondary);
      border-color: var(--orange-primary);
      color: var(--text-primary);
    }

    .back-icon {
      font-size: 1.2rem;
    }

    .projet-header {
      text-align: center;
    }

    .projet-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .projet-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .projet-context {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 1rem;
    }

    .context-iut { background: var(--violet-light); color: var(--violet-primary); }
    .context-entreprise { background: var(--orange-light); color: var(--orange-primary); }
    .context-personnel { background: #e8f5e8; color: #2e7d32; }

    .status-badge {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .status-termine { background: #e8f5e8; color: #2e7d32; }
    .status-en-cours { background: var(--orange-light); color: var(--orange-primary); }
    .status-planifie { background: var(--violet-light); color: var(--violet-primary); }

    .section-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2rem;
    }

    .title-icon {
      font-size: 2rem;
    }

    .subsection-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 1rem;
      margin-top: 2rem;
    }

    .subsection-title:first-child {
      margin-top: 0;
    }

    .main-description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin: 0;
    }

    /* Info Section */
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .info-item {
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
    }

    .info-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 0.75rem;
    }

    .info-value {
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
      font-size: 1rem;
    }

    /* Technologies */
    .tech-category {
      margin-bottom: 2rem;
    }

    .tech-category:last-child {
      margin-bottom: 0;
    }

    .category-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--violet-primary);
      margin-bottom: 1rem;
    }

    .tech-badges {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .tech-badge {
      padding: 0.75rem;
      border-radius: 0.75rem;
      font-weight: 500;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }

    .tech-badge.primary {
      background: var(--orange-primary);
      color: white;
    }

    .tech-badge.primary:hover {
      background: var(--orange-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .tech-badge.secondary {
      background: var(--violet-light);
      color: var(--violet-primary);
    }

    .tech-badge.secondary:hover {
      background: var(--violet-primary);
      color: white;
      transform: translateY(-2px);
    }

    .tech-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
      
    }

    /* Objectives */
    .objective-items {
      list-style: none;
      padding: 0;
    }

    .objective-items li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .objective-items li::before {
      content: '🎯';
      position: absolute;
      left: 0;
    }

    /* Challenges */
    .challenges-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .challenge-card {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
      border-left: 4px solid var(--orange-primary);
    }

    .challenge-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
      margin-top: 0.25rem;
    }

    .challenge-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .challenge-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    .challenge-solution {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: var(--violet-light);
      color: var(--violet-primary);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Features */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .feature-card {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
    }

    .feature-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .feature-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .feature-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 0.75rem;
    }

    .feature-tech {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .feature-tech-badge {
      padding: 0.5rem;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-tech-badge:hover {
      background: var(--orange-light);
      border-color: var(--orange-primary);
      transform: translateY(-1px);
    }

    .feature-tech-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    /* Learning */
    .competence-tags {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .competence-tag {
      padding: 0.75rem 1rem;
      background: var(--violet-light);
      color: var(--violet-primary);
      border-radius: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .competence-tag:hover {
      background: var(--violet-primary);
      color: white;
      transform: translateY(-2px);
    }

    .competence-tag:hover .competence-icon {
      filter: brightness(0) invert(1);
    }

    .competence-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      transition: filter 0.3s ease;
    }

    .competence-name {
      font-size: 0.9rem;
    }

    .learning-list,
    .improvement-list {
      list-style: none;
      padding: 0;
    }

    .learning-list li,
    .improvement-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .learning-list li::before {
      content: '💡';
      position: absolute;
      left: 0;
    }

    .improvement-list li::before {
      content: '🔄';
      position: absolute;
      left: 0;
    }

    /* Results */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      text-align: center;
      padding: 2rem 1rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--orange-primary);
      margin-bottom: 0.5rem;
    }

    .metric-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .metric-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    .impact-text {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 0.5rem;
      border-left: 4px solid var(--orange-primary);
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }

    /* Links */
    .link-buttons {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .link-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .link-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .link-button.github {
      background: #24292e;
      color: white;
    }

    .link-button.github:hover {
      background: #1a1e22;
    }

    .link-button.demo {
      background: var(--orange-primary);
      color: white;
    }

    .link-button.demo:hover {
      background: var(--orange-dark);
    }

    .link-icon {
      font-size: 1.2rem;
    }

    /* Actions */
    .actions-section {
      margin-top: 3rem;
    }

    .actions-container {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .action-button {
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      border: none;
    }

    .action-button.primary {
      background: var(--orange-primary);
      color: white;
    }

    .action-button.primary:hover {
      background: var(--orange-dark);
    }

    .action-button.secondary {
      background: none;
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    }

    .action-button.secondary:hover {
      background: var(--bg-secondary);
      border-color: var(--orange-primary);
      color: var(--text-primary);
    }

    /* Loading */
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      gap: 1rem;
    }

    .loading-spinner {
      width: 2rem;
      height: 2rem;
      border: 2px solid var(--border-color);
      border-top: 2px solid var(--orange-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .section-card {
        padding: 1.5rem;
      }

      .projet-title {
        font-size: 2rem;
      }

      .projet-meta {
        flex-direction: column;
        gap: 1rem;
      }

      .info-grid,
      .challenges-grid,
      .features-grid,
      .metrics-grid {
        grid-template-columns: 1fr;
      }

      .tech-badges,
      .competence-tags,
      .link-buttons {
        justify-content: center;
      }

      .actions-container {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class ProjetDetailComponent implements OnInit {
  private projetService = inject(ProjetService);
  private competenceService = inject(CompetenceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projet = signal<Projet | null>(null);
  competences = this.competenceService.getCompetences;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjet(id);
    }
  }

  private loadProjet(id: string) {
    const projet = this.projetService.getProjetById(id);
    if (projet) {
      this.projet.set(projet);
    }
  }

  getStatusLabel(statut: string): string {
    const labels: { [key: string]: string } = {
      'termine': 'Terminé',
      'en_cours': 'En cours',
      'planifie': 'Planifié'
    };
    return labels[statut] || statut;
  }

  getContextDescription(contexte: string): string {
    const descriptions: { [key: string]: string } = {
      'IUT': 'Projet académique réalisé dans le cadre de ma formation en BUT Informatique',
      'Entreprise': 'Projet professionnel développé pendant mon alternance',
      'Personnel': 'Projet personnel pour approfondir mes compétences techniques'
    };
    return descriptions[contexte] || contexte;
  }


  getTechIcon(tech: string): string {
    const competence = this.competences().find(c => c.id === tech.toLowerCase());
    return competence?.icone || 'assets/icons/default.svg';
  }

  formatTechnology(tech: string): string {
    const competence = this.competences().find(c => c.id === tech.toLowerCase());
    return competence?.nom || tech;
  }

  navigateToCompetenceDetail(tech: string) {
    const competence = this.competences().find(c => c.id === tech.toLowerCase());
    if (competence) {
      this.router.navigate(['/competences', competence.id]);
    } else {
      // Si pas de correspondance, aller à la liste des compétences
      this.router.navigate(['/competences']);
    }
  }

  getProjectType(nomProjet: string): string {
    if (nomProjet.toLowerCase().includes('portfolio')) return 'Site web personnel';
    if (nomProjet.toLowerCase().includes('api')) return 'API REST';
    if (nomProjet.toLowerCase().includes('mobile')) return 'Application mobile';
    if (nomProjet.toLowerCase().includes('web')) return 'Application web';
    return 'Application informatique';
  }

  getTeamSize(contexte: string): string {
    const teamSizes: { [key: string]: string } = {
      'IUT': 'Équipe de 3-4 étudiants',
      'Entreprise': 'Équipe de développement (8 personnes)',
      'Personnel': 'Projet individuel'
    };
    return teamSizes[contexte] || 'Non spécifié';
  }

  navigateToProjects() {
    this.router.navigate(['/projets']);
  }

  goBack() {
    this.router.navigate(['/projets']);
  }
}
