import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../services/projet.service';
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
                <h3 class="info-title">Durée du projet</h3>
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
                  <span *ngFor="let tech of projet()!.technologies" class="tech-badge primary">
                    {{ tech }}
                  </span>
                </div>
              </div>
              
              <div class="tech-category">
                <h3 class="category-title">Outils et environnement</h3>
                <div class="tech-badges">
                  <span *ngFor="let tool of getTools(projet()!.technologies)" class="tech-badge secondary">
                    {{ tool }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Objectifs et défis -->
        <section class="objectives-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🎯</span>
              Objectifs et défis relevés
            </h2>
            <div class="objectives-content">
              
              <!-- Objectifs -->
              <div class="objectives-list">
                <h3 class="subsection-title">Objectifs du projet</h3>
                <ul class="objective-items">
                  <li *ngFor="let objective of projet()!.objectifs">{{ objective }}</li>
                </ul>
              </div>

              <!-- Défis techniques -->
              <div class="challenges-list">
                <h3 class="subsection-title">Défis techniques relevés</h3>
                <div class="challenges-grid">
                  <div *ngFor="let challenge of projet()!.defis_techniques; let i = index" class="challenge-card">
                    <div class="challenge-icon">⚡</div>
                    <div class="challenge-content">
                      <h4 class="challenge-title">Défi technique #{{ i + 1 }}</h4>
                      <p class="challenge-description">{{ challenge }}</p>
                      <span class="challenge-solution">Solution : {{ projet()!.solutions_apportees[i] || 'En cours de résolution' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Réalisations et fonctionnalités -->
        <section class="features-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">✨</span>
              Fonctionnalités développées
            </h2>
            <div class="features-content">
              
              <!-- Fonctionnalités principales -->
              <div class="features-grid">
                <div *ngFor="let feature of getFeatures(projet()!.titre)" class="feature-card">
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <div class="feature-info">
                    <h4 class="feature-title">{{ feature.title }}</h4>
                    <p class="feature-description">{{ feature.description }}</p>
                    <div class="feature-tech">
                      <span *ngFor="let tech of feature.technologies" class="feature-tech-badge">
                        {{ tech }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Apprentissages et compétences -->
        <section class="learning-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📚</span>
              Apprentissages et compétences développées
            </h2>
            <div class="learning-content">
              
              <!-- Compétences techniques -->
              <div class="competences-developed">
                <h3 class="subsection-title">Compétences techniques acquises</h3>
                <div class="competence-tags">
                  <span *ngFor="let competence of getCompetencesDeveloped(projet()!.technologies)" 
                        class="competence-tag"
                        (click)="navigateToCompetence(competence)">
                    {{ competence }}
                  </span>
                </div>
              </div>

              <!-- Apprentissages personnels -->
              <div class="personal-learning">
                <h3 class="subsection-title">Apprentissages personnels</h3>
                <ul class="learning-list">
                  <li *ngFor="let learning of getPersonalLearnings(projet()!.contexte)">{{ learning }}</li>
                </ul>
              </div>

              <!-- Points d'amélioration -->
              <div class="improvements">
                <h3 class="subsection-title">Axes d'amélioration identifiés</h3>
                <ul class="improvement-list">
                  <li *ngFor="let improvement of getImprovements(projet()!.titre)">{{ improvement }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Résultats et impact -->
        <section class="results-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📊</span>
              Résultats et impact
            </h2>
            <div class="results-content">
              
              <!-- Métriques -->
              <div class="metrics-grid">
                <div *ngFor="let metric of getMetrics(projet()!.titre)" class="metric-card">
                  <div class="metric-value">{{ metric.value }}</div>
                  <div class="metric-label">{{ metric.label }}</div>
                  <div class="metric-description">{{ metric.description }}</div>
                </div>
              </div>

              <!-- Impact et retour -->
              <div class="impact-section">
                <h3 class="subsection-title">Impact et retour d'expérience</h3>
                <p class="impact-text">{{ getImpactDescription(projet()!.titre) }}</p>
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
      padding: 0.75rem 1.25rem;
      border-radius: 0.75rem;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .tech-badge.primary {
      background: var(--orange-primary);
      color: white;
    }

    .tech-badge.secondary {
      background: var(--violet-light);
      color: var(--violet-primary);
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
      padding: 0.25rem 0.5rem;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    /* Learning */
    .competence-tags {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    .competence-tag {
      padding: 0.75rem 1.25rem;
      background: var(--violet-light);
      color: var(--violet-primary);
      border-radius: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .competence-tag:hover {
      background: var(--violet-primary);
      color: white;
      transform: translateY(-2px);
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  projet = signal<Projet | null>(null);

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

  getTools(technologies: string[]): string[] {
    const tools = ['Git', 'VS Code', 'npm'];
    if (technologies.includes('Angular')) tools.push('Angular CLI', 'TypeScript');
    if (technologies.includes('Java')) tools.push('Maven', 'IntelliJ IDEA');
    if (technologies.includes('SQL')) tools.push('PostgreSQL', 'DBeaver');
    return tools;
  }

  getObjectives(nomProjet: string): string[] {
    return [
      'Développer une solution technique robuste et scalable',
      'Appliquer les bonnes pratiques de développement',
      'Respecter les délais et les spécifications du projet',
      'Acquérir de nouvelles compétences techniques',
      'Collaborer efficacement en équipe'
    ];
  }

  getChallenges(technologies: string[]): Array<{title: string, description: string, solution: string}> {
    return [
      {
        title: 'Architecture technique',
        description: 'Concevoir une architecture maintenir et évolutive',
        solution: 'Adoption des patterns SOLID et Clean Architecture'
      },
      {
        title: 'Performance et optimisation',
        description: 'Assurer des performances optimales de l\'application',
        solution: 'Mise en place de lazy loading et optimisation des requêtes'
      },
      {
        title: 'Gestion de la complexité',
        description: 'Gérer la complexité croissante du projet',
        solution: 'Découpage en modules et composants réutilisables'
      }
    ];
  }

  getFeatures(nomProjet: string): Array<{icon: string, title: string, description: string, technologies: string[]}> {
    if (nomProjet.toLowerCase().includes('portfolio')) {
      return [
        {
          icon: '🎨',
          title: 'Interface utilisateur moderne',
          description: 'Design responsive avec thème sombre/clair et animations fluides',
          technologies: ['Angular', 'CSS3', 'TypeScript']
        },
        {
          icon: '📱',
          title: 'Navigation intuitive',
          description: 'Système de routing avancé avec lazy loading des composants',
          technologies: ['Angular Router']
        },
        {
          icon: '🔍',
          title: 'Système de filtrage',
          description: 'Filtres dynamiques pour projets et compétences',
          technologies: ['RxJS', 'Signals']
        }
      ];
    }
    return [
      {
        icon: '⚙️',
        title: 'Fonctionnalité principale',
        description: 'Implémentation des features principales du projet',
        technologies: ['Technologies utilisées']
      }
    ];
  }

  getCompetencesDeveloped(technologies: string[]): string[] {
    const competences = ['Gestion de projet', 'Résolution de problèmes'];
    if (technologies.includes('Angular')) competences.push('Angular', 'TypeScript');
    if (technologies.includes('Java')) competences.push('Java');
    if (technologies.includes('SQL')) competences.push('SQL');
    return competences;
  }

  getPersonalLearnings(contexte: string): string[] {
    const learnings: { [key: string]: string[] } = {
      'IUT': [
        'Travail en équipe sur un projet technique complexe',
        'Application des concepts théoriques en pratique',
        'Gestion du temps et respect des échéances académiques'
      ],
      'Entreprise': [
        'Adaptation aux contraintes professionnelles',
        'Communication avec les équipes métier',
        'Intégration des processus qualité en entreprise'
      ],
      'Personnel': [
        'Autonomie dans l\'apprentissage de nouvelles technologies',
        'Persévérance face aux difficultés techniques',
        'Importance de la documentation et des bonnes pratiques'
      ]
    };
    return learnings[contexte] || ['Acquisition de nouvelles compétences techniques'];
  }

  getImprovements(nomProjet: string): string[] {
    return [
      'Améliorer la couverture de tests unitaires',
      'Optimiser les performances de l\'application',
      'Enrichir la documentation technique',
      'Ajouter des fonctionnalités avancées',
      'Améliorer l\'accessibilité de l\'interface'
    ];
  }

  getMetrics(nomProjet: string): Array<{value: string, label: string, description: string}> {
    if (nomProjet.toLowerCase().includes('portfolio')) {
      return [
        { value: '4', label: 'Pages', description: 'Pages principales du site' },
        { value: '10+', label: 'Composants', description: 'Composants Angular créés' },
        { value: '100%', label: 'Responsive', description: 'Adaptable à tous les écrans' },
        { value: '3', label: 'Semaines', description: 'Durée de développement' }
      ];
    }
    return [
      { value: '100%', label: 'Fonctionnel', description: 'Objectifs atteints' },
      { value: '0', label: 'Bugs critiques', description: 'Application stable' },
      { value: '95%', label: 'Satisfaction', description: 'Retour positif des utilisateurs' }
    ];
  }

  getImpactDescription(nomProjet: string): string {
    return `Ce projet m'a permis de consolider mes compétences techniques et de développer ma capacité à mener un projet de bout en bout. L'expérience acquise contribue directement à mon évolution professionnelle et démontre ma capacité à livrer des solutions techniques de qualité dans les délais impartis.`;
  }

  navigateToCompetence(competenceName: string) {
    // Ici on devrait faire une recherche pour trouver l'ID de la compétence
    // Pour l'instant, on navigue vers la liste des compétences
    this.router.navigate(['/competences']);
  }

  navigateToProjects() {
    this.router.navigate(['/projets']);
  }

  goBack() {
    this.router.navigate(['/projets']);
  }
}
