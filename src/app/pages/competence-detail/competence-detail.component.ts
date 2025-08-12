import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetenceService } from '../../services/competence.service';
import { Competence } from '../../models/competence.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-competence-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="competence-detail-container" *ngIf="competence()">
      <div class="container">
        <!-- Header avec retour -->
        <header class="detail-header">
          <button class="back-button" (click)="goBack()">
            <span class="back-icon">←</span>
            Retour aux compétences
          </button>
          
          <div class="competence-header">
            <div class="competence-main-info">
              <h1 class="competence-title">{{ competence()!.nom }}</h1>
              <div class="competence-meta">
                <span class="competence-category" 
                      [class]="'category-' + competence()!.type.toLowerCase().replace('_', '-')">
                  {{ competence()!.type === 'technique' ? '🛠️ Technique' : '🤝 Soft Skill' }}
                </span>
                <div class="competence-level">
                  <span class="level-label">Niveau :</span>
                  <span class="level-badge" [class]="'level-' + getNiveauNumber(competence()!.niveau)">
                    {{ competence()!.niveau }}
                  </span>
                  <div class="level-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" 
                           [style.width.%]="(getNiveauNumber(competence()!.niveau) * 20)"></div>
                    </div>
                    <span class="level-text">{{ getNiveauNumber(competence()!.niveau) }}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Description détaillée -->
        <section class="description-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📋</span>
              Description détaillée
            </h2>
            <div class="description-content">
              <p class="main-description">{{ competence()!.description }}</p>
              
              <!-- Informations techniques pour les compétences techniques -->
              <div *ngIf="competence()!.type === 'technique'" class="technical-info">
                <h3 class="subsection-title">Domaines d'application</h3>
                <ul class="info-list">
                  <li *ngFor="let domain of getTechnicalDomains(competence()!.nom)">{{ domain }}</li>
                </ul>
                
                <h3 class="subsection-title">Technologies connexes</h3>
                <div class="related-tech">
                  <span *ngFor="let tech of getRelatedTechnologies(competence()!.nom)" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Exemples d'application pour les soft skills -->
              <div *ngIf="competence()!.type === 'soft_skills'" class="soft-skill-info">
                <h3 class="subsection-title">Exemples d'application</h3>
                <ul class="info-list">
                  <li *ngFor="let example of getSoftSkillExamples(competence()!.nom)">{{ example }}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Projets associés -->
        <section class="projects-section" *ngIf="relatedProjects().length > 0">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🚀</span>
              Projets utilisant cette compétence
            </h2>
            <div class="projects-grid">
              <div *ngFor="let project of relatedProjects()" 
                   class="project-card"
                   (click)="navigateToProject(project.id)">
                <div class="project-header">
                  <h3 class="project-title">{{ project.nom }}</h3>
                  <span class="project-context" 
                        [class]="'context-' + project.contexte.toLowerCase()">
                    {{ project.contexte }}
                  </span>
                </div>
                <p class="project-description">{{ project.description | slice:0:150 }}...</p>
                <div class="project-technologies">
                  <span *ngFor="let tech of project.technologies" 
                        class="tech-badge"
                        [class.highlighted]="tech === competence()!.nom">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Progression et apprentissage -->
        <section class="progression-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📈</span>
              Progression et apprentissage
            </h2>
            <div class="progression-content">
              
              <!-- Timeline d'apprentissage -->
              <div class="learning-timeline">
                <h3 class="subsection-title">Parcours d'apprentissage</h3>
                <div class="timeline">
                  <div *ngFor="let step of getLearningSteps(competence()!.nom); let i = index" 
                       class="timeline-item" 
                       [class.completed]="i < getNiveauNumber(competence()!.niveau)">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h4 class="timeline-title">{{ step.title }}</h4>
                      <p class="timeline-description">{{ step.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Objectifs futurs -->
              <div class="future-goals">
                <h3 class="subsection-title">Objectifs d'amélioration</h3>
                <ul class="goals-list">
                  <li *ngFor="let goal of getFutureGoals(competence()!.nom)">{{ goal }}</li>
                </ul>
              </div>

              <!-- Ressources recommandées -->
              <div class="resources">
                <h3 class="subsection-title">Ressources pour progresser</h3>
                <div class="resources-grid">
                  <div *ngFor="let resource of getRecommendedResources(competence()!.nom)" 
                       class="resource-card">
                    <div class="resource-type">{{ resource.type }}</div>
                    <h4 class="resource-title">{{ resource.title }}</h4>
                    <p class="resource-description">{{ resource.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Évaluation et preuves -->
        <section class="evaluation-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">⭐</span>
              Évaluation et justifications
            </h2>
            <div class="evaluation-content">
              
              <!-- Auto-évaluation -->
              <div class="self-evaluation">
                <h3 class="subsection-title">Auto-évaluation</h3>
                <div class="evaluation-item">
                  <p class="evaluation-text">
                    {{ getSelfEvaluation(competence()!.nom) }}
                  </p>
                </div>
              </div>

              <!-- Preuves et réalisations -->
              <div class="achievements">
                <h3 class="subsection-title">Preuves et réalisations</h3>
                <div class="achievements-grid">
                  <div *ngFor="let achievement of getAchievements(competence()!.nom)" 
                       class="achievement-card">
                    <div class="achievement-icon">{{ achievement.icon }}</div>
                    <div class="achievement-content">
                      <h4 class="achievement-title">{{ achievement.title }}</h4>
                      <p class="achievement-description">{{ achievement.description }}</p>
                    </div>
                  </div>
                </div>
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
              Retour aux compétences
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- État de chargement -->
    <div *ngIf="!competence()" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Chargement de la compétence...</p>
    </div>
  `,
  styles: [`
    .competence-detail-container {
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

    .competence-header {
      text-align: center;
    }

    .competence-title {
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .competence-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .competence-category {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 1rem;
    }

    .category-technique {
      background: var(--violet-light);
      color: var(--violet-primary);
    }

    .category-soft-skills {
      background: var(--orange-light);
      color: var(--orange-primary);
    }

    .competence-level {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .level-label {
      font-weight: 500;
      color: var(--text-secondary);
    }

    .level-badge {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .level-1 { background: #ffebee; color: #c62828; }
    .level-2 { background: #fff3e0; color: #ef6c00; }
    .level-3 { background: #f3e5f5; color: var(--violet-primary); }
    .level-4 { background: #e8f5e8; color: #2e7d32; }
    .level-5 { background: var(--orange-light); color: var(--orange-primary); }

    .level-progress {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .progress-bar {
      width: 100px;
      height: 8px;
      background: var(--bg-secondary);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--orange-primary), var(--violet-primary));
      transition: width 0.3s ease;
    }

    .level-text {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.875rem;
    }

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
      margin-bottom: 1.5rem;
    }

    .info-list {
      list-style: none;
      padding: 0;
    }

    .info-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .info-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--orange-primary);
      font-weight: bold;
    }

    .related-tech {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tech-tag {
      padding: 0.5rem 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    /* Projects Section */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      padding: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      border-color: var(--orange-primary);
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .project-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .project-context {
      padding: 0.25rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .context-iut { background: var(--violet-light); color: var(--violet-primary); }
    .context-entreprise { background: var(--orange-light); color: var(--orange-primary); }
    .context-personnel { background: #e8f5e8; color: #2e7d32; }

    .project-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .project-technologies {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tech-badge {
      padding: 0.25rem 0.75rem;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .tech-badge.highlighted {
      background: var(--orange-primary);
      color: white;
      border-color: var(--orange-primary);
    }

    /* Timeline */
    .timeline {
      position: relative;
      padding-left: 2rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0.75rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border-color);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
    }

    .timeline-item.completed .timeline-marker {
      background: var(--orange-primary);
      border-color: var(--orange-primary);
    }

    .timeline-item.completed::before {
      background: var(--orange-primary);
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 1rem;
      height: 1rem;
      background: var(--bg-secondary);
      border: 2px solid var(--border-color);
      border-radius: 50%;
    }

    .timeline-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .timeline-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .goals-list {
      list-style: none;
      padding: 0;
    }

    .goals-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .goals-list li::before {
      content: '🎯';
      position: absolute;
      left: 0;
    }

    /* Resources */
    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
    }

    .resource-card {
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
    }

    .resource-type {
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 0.5rem;
    }

    .resource-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .resource-description {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.4;
      margin: 0;
    }

    /* Evaluation */
    .evaluation-text {
      background: var(--bg-secondary);
      padding: 1.5rem;
      border-radius: 0.5rem;
      border-left: 4px solid var(--orange-primary);
      font-style: italic;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }

    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .achievement-card {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    .achievement-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .achievement-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .achievement-description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
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

      .competence-title {
        font-size: 2rem;
      }

      .competence-meta {
        flex-direction: column;
        gap: 1rem;
      }

      .competence-level {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .projects-grid,
      .resources-grid,
      .achievements-grid {
        grid-template-columns: 1fr;
      }

      .actions-container {
        flex-direction: column;
        align-items: stretch;
      }

      .timeline {
        padding-left: 1.5rem;
      }

      .timeline-marker {
        left: -1.5rem;
      }
    }
  `]
})
export class CompetenceDetailComponent implements OnInit {
  private competenceService = inject(CompetenceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  competence = signal<Competence | null>(null);
  relatedProjects = computed(() => {
    const comp = this.competence();
    if (!comp) return [];
    
    // Simulation de projets liés (à remplacer par un service réel)
    return [
      {
        id: '1',
        nom: "Portfolio Personnel",
        description: "Développement de ce portfolio avec Angular 18, intégrant des fonctionnalités avancées de routing, services et composants standalone",
        contexte: "Personnel",
        technologies: comp.type === 'technique' ? [comp.nom, "TypeScript", "CSS3"] : ["Communication", "Gestion de projet"]
      }
    ].filter(p => p.technologies.includes(comp.nom));
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCompetence(id);
    }
  }

  private loadCompetence(id: string) {
    const competence = this.competenceService.getCompetenceById(id);
    if (competence) {
      this.competence.set(competence);
    }
  }

  getNiveauNumber(niveau: string): number {
    const niveauxMap: { [key: string]: number } = {
      'initie': 1,
      'debutant': 2,
      'intermediaire': 3,
      'avancee': 4,
      'expert': 5
    };
    return niveauxMap[niveau] || 1;
  }

  getLevelLabel(niveau: string): string {
    const labels: { [key: string]: string } = {
      'initie': 'Initié',
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avancee': 'Avancé',
      'expert': 'Expert'
    };
    return labels[niveau] || 'Non défini';
  }

  getTechnicalDomains(competenceName: string): string[] {
    const domains: { [key: string]: string[] } = {
      'Angular': ['Développement web frontend', 'Applications single-page', 'Progressive Web Apps'],
      'TypeScript': ['Développement web type-safe', 'Applications enterprise', 'Outils et frameworks modernes'],
      'Java': ['Développement backend', 'Applications enterprise', 'Microservices'],
      'SQL': ['Gestion de bases de données', 'Requêtes complexes', 'Optimisation de performances']
    };
    return domains[competenceName] || ['Développement logiciel', 'Applications web', 'Projets techniques'];
  }

  getRelatedTechnologies(competenceName: string): string[] {
    const related: { [key: string]: string[] } = {
      'Angular': ['RxJS', 'NgRx', 'Angular Material', 'Jest'],
      'TypeScript': ['JavaScript', 'Node.js', 'Webpack', 'ESLint'],
      'Java': ['Spring Boot', 'Maven', 'JUnit', 'Hibernate'],
      'SQL': ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB']
    };
    return related[competenceName] || ['Git', 'VS Code', 'Linux'];
  }

  getSoftSkillExamples(competenceName: string): string[] {
    const examples: { [key: string]: string[] } = {
      'Communication': ['Présentation de projets devant une équipe', 'Rédaction de documentation technique', 'Animation de réunions'],
      'Travail en équipe': ['Collaboration sur des projets en groupe', 'Partage de connaissances', 'Résolution de conflits'],
      'Gestion de projet': ['Planification de sprints', 'Estimation de charges', 'Suivi des livrables'],
      'Résolution de problèmes': ['Debugging de code complexe', 'Analyse de performances', 'Optimisation de processus'],
      'Apprentissage continu': ['Veille technologique', 'Formation autodidacte', 'Participation à des conférences'],
      'Adaptabilité': ['Apprentissage de nouvelles technologies', 'Adaptation aux changements de requirements', 'Flexibilité dans les méthodes de travail']
    };
    return examples[competenceName] || ['Application en contexte professionnel', 'Développement personnel', 'Projets académiques'];
  }

  getLearningSteps(competenceName: string): { title: string; description: string }[] {
    return [
      { title: 'Initiation', description: 'Découverte des concepts de base et première prise en main' },
      { title: 'Pratique guidée', description: 'Réalisation de projets tutoriels et exercices encadrés' },
      { title: 'Application autonome', description: 'Développement de projets personnels et mise en pratique' },
      { title: 'Maîtrise avancée', description: 'Optimisation, bonnes pratiques et patterns avancés' },
      { title: 'Expertise', description: 'Veille technologique, contribution et transmission de savoir' }
    ];
  }

  getFutureGoals(competenceName: string): string[] {
    const goals: { [key: string]: string[] } = {
      'Angular': ['Maîtriser Angular 18+ et les nouveautés', 'Approfondir NgRx pour la gestion d\'état', 'Contribuer à des projets open source'],
      'TypeScript': ['Explorer les dernières features ES2024+', 'Maîtriser les types avancés', 'Optimiser les builds et bundling'],
      'Java': ['Approfondir Spring Boot 3+', 'Maîtriser les microservices', 'Explorer les technologies cloud'],
      'SQL': ['Optimisation avancée de requêtes', 'Administration de bases de données', 'NoSQL et bases distribuées']
    };
    return goals[competenceName] || ['Approfondissement des concepts avancés', 'Veille technologique', 'Partage de connaissances'];
  }

  getRecommendedResources(competenceName: string): { type: string; title: string; description: string }[] {
    return [
      { type: 'Documentation', title: 'Documentation officielle', description: 'Guide de référence et meilleures pratiques' },
      { type: 'Formation', title: 'Cours en ligne spécialisés', description: 'Formations avancées sur des plateformes reconnues' },
      { type: 'Communauté', title: 'Forums et communautés', description: 'Échanges avec des experts et retours d\'expérience' },
      { type: 'Pratique', title: 'Projets open source', description: 'Contribution à des projets pour gagner en expérience' }
    ];
  }

  getSelfEvaluation(competenceName: string): string {
    return `Mon niveau actuel reflète une progression constante dans la maîtrise de ${competenceName}. 
    J'ai acquis cette compétence à travers mes projets académiques et professionnels, en m'appuyant sur 
    une pratique régulière et un apprentissage continu. Les projets réalisés démontrent ma capacité à 
    appliquer cette compétence dans des contextes variés et à résoudre des problèmes concrets.`;
  }

  getAchievements(competenceName: string): { icon: string; title: string; description: string }[] {
    return [
      { icon: '🎯', title: 'Projets réussis', description: 'Réalisation de plusieurs projets utilisant cette compétence' },
      { icon: '📈', title: 'Progression mesurable', description: 'Évolution constante du niveau de maîtrise' },
      { icon: '🏆', title: 'Reconnaissance', description: 'Validation par des pairs et encadrants' },
      { icon: '🔧', title: 'Application pratique', description: 'Utilisation régulière en contexte professionnel' }
    ];
  }

  navigateToProject(projectId: string) {
    this.router.navigate(['/projets', projectId]);
  }

  navigateToProjects() {
    this.router.navigate(['/projets']);
  }

  goBack() {
    this.router.navigate(['/competences']);
  }
}
