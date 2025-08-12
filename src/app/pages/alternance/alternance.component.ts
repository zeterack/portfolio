import { Component } from '@angular/core';

@Component({
  selector: 'app-alternance',
  template: `
    <div class="alternance-container">
      <div class="container">
        <!-- Header -->
        <header class="page-header">
          <h1 class="page-title">Mon Alternance</h1>
          <p class="page-description">
            Découvrez mon expérience en alternance, les missions réalisées 
            et les compétences développées en entreprise.
          </p>
        </header>

        <!-- Entreprise -->
        <section class="entreprise-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🏢</span>
              Présentation de l'entreprise
            </h2>
            <div class="entreprise-grid">
              <div class="info-item">
                <h3 class="info-title">Nom de l'entreprise</h3>
                <p class="info-value">[Nom de votre entreprise]</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Secteur d'activité</h3>
                <p class="info-value">[Secteur d'activité - ex: Services informatiques, Banque, E-commerce...]</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Taille de l'entreprise</h3>
                <p class="info-value">[Nombre d'employés - ex: PME de 50 personnes]</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Environnement de travail</h3>
                <p class="info-value">[Description de l'environnement - ex: Bureau moderne, télétravail partiel, équipe jeune et dynamique...]</p>
              </div>
            </div>
            
            <div class="tech-stack">
              <h3 class="info-title">Technologies utilisées</h3>
              <div class="tech-badges">
                <span class="tech-badge">Java</span>
                <span class="tech-badge">Spring Boot</span>
                <span class="tech-badge">Angular</span>
                <span class="tech-badge">PostgreSQL</span>
                <span class="tech-badge">Git</span>
                <span class="tech-badge">Docker</span>
                <span class="tech-badge">Jenkins</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Détails de l'alternance -->
        <section class="details-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">📅</span>
              Détails de l'alternance
            </h2>
            <div class="details-grid">
              <div class="detail-item">
                <div class="detail-icon">⏱️</div>
                <div class="detail-content">
                  <h3 class="detail-title">Durée et période</h3>
                  <p class="detail-text">[Ex: Septembre 2023 - Août 2025 (2 ans)]</p>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">🔄</div>
                <div class="detail-content">
                  <h3 class="detail-title">Rythme</h3>
                  <p class="detail-text">[Ex: 3 semaines entreprise / 1 semaine IUT]</p>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">👨‍💻</div>
                <div class="detail-content">
                  <h3 class="detail-title">Intitulé du poste</h3>
                  <p class="detail-text">[Ex: Développeur Full Stack en alternance]</p>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">👥</div>
                <div class="detail-content">
                  <h3 class="detail-title">Équipe d'accueil</h3>
                  <p class="detail-text">[Ex: Équipe de développement de 8 personnes, encadrement par un développeur senior]</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Missions -->
        <section class="missions-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🎯</span>
              Missions et responsabilités
            </h2>
            
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3 class="timeline-title">Première année (2023-2024)</h3>
                  <ul class="mission-list">
                    <li>Développement de fonctionnalités front-end avec Angular</li>
                    <li>Participation aux tests unitaires et d'intégration</li>
                    <li>Correction de bugs et maintenance du code existant</li>
                    <li>Apprentissage des méthodologies agiles (Scrum)</li>
                  </ul>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3 class="timeline-title">Deuxième année (2024-2025)</h3>
                  <ul class="mission-list">
                    <li>Développement full-stack d'un module complet</li>
                    <li>Conception et implémentation d'APIs REST</li>
                    <li>Mentorat des nouveaux alternants</li>
                    <li>Participation à l'architecture technique des projets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Compétences développées -->
        <section class="competences-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🚀</span>
              Compétences développées
            </h2>
            
            <div class="competences-grid">
              <div class="competence-category">
                <h3 class="category-title">Compétences techniques</h3>
                <ul class="competence-list">
                  <li>Maîtrise approfondie d'Angular et TypeScript</li>
                  <li>Développement d'APIs REST avec Spring Boot</li>
                  <li>Optimisation des performances frontend et backend</li>
                  <li>Tests automatisés (unitaires et intégration)</li>
                  <li>Déploiement et CI/CD avec Docker et Jenkins</li>
                </ul>
              </div>
              
              <div class="competence-category">
                <h3 class="category-title">Soft skills</h3>
                <ul class="competence-list">
                  <li>Travail en équipe et communication efficace</li>
                  <li>Gestion de projet et respect des délais</li>
                  <li>Adaptabilité et apprentissage continu</li>
                  <li>Résolution de problèmes complexes</li>
                  <li>Autonomie et prise d'initiative</li>
                </ul>
              </div>
              
              <div class="competence-category">
                <h3 class="category-title">Outils et méthodologies</h3>
                <ul class="competence-list">
                  <li>Méthodologies Agile/Scrum</li>
                  <li>Outils de versioning (Git, GitLab)</li>
                  <li>Outils de gestion de projet (Jira, Confluence)</li>
                  <li>IDEs et outils de développement</li>
                  <li>Bases de données relationnelles</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Expérience et apprentissages -->
        <section class="experience-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">💡</span>
              Expérience et apprentissages
            </h2>
            
            <div class="experience-grid">
              <div class="experience-item">
                <h3 class="experience-title">Points positifs</h3>
                <ul class="experience-list">
                  <li>Intégration rapide dans l'équipe de développement</li>
                  <li>Montée en compétences progressive et encadrée</li>
                  <li>Participation à des projets clients réels</li>
                  <li>Découverte du monde professionnel et de ses enjeux</li>
                </ul>
              </div>
              
              <div class="experience-item">
                <h3 class="experience-title">Défis relevés</h3>
                <ul class="experience-list">
                  <li>Apprentissage de technologies non vues en cours</li>
                  <li>Adaptation aux contraintes techniques et temporelles</li>
                  <li>Gestion du stress lors des livraisons importantes</li>
                  <li>Communication avec les équipes métier</li>
                </ul>
              </div>
              
              <div class="experience-item">
                <h3 class="experience-title">Impact sur mon projet professionnel</h3>
                <p class="experience-text">
                  Cette alternance m'a permis de confirmer mon orientation vers le développement full-stack 
                  et de développer une passion pour l'architecture logicielle. J'ai acquis une vision complète 
                  du cycle de développement et souhaite désormais évoluer vers des responsabilités techniques 
                  plus importantes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Témoignages -->
        <section class="temoignages-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">💬</span>
              Témoignages
            </h2>
            
            <div class="temoignages-grid">
              <div class="temoignage-card">
                <div class="temoignage-content">
                  <p class="temoignage-text">
                    "[Insérer ici le témoignage de votre maître d'apprentissage sur vos compétences, 
                    votre évolution et votre contribution à l'équipe]"
                  </p>
                </div>
                <div class="temoignage-author">
                  <div class="author-info">
                    <h4 class="author-name">[Nom du maître d'apprentissage]</h4>
                    <p class="author-title">[Titre - ex: Lead Developer, CTO...]</p>
                  </div>
                </div>
              </div>
              
              <div class="temoignage-card">
                <div class="temoignage-content">
                  <p class="temoignage-text">
                    "[Témoignage optionnel d'un collègue ou d'un autre membre de l'équipe]"
                  </p>
                </div>
                <div class="temoignage-author">
                  <div class="author-info">
                    <h4 class="author-name">[Nom du collègue]</h4>
                    <p class="author-title">[Titre - ex: Développeur Senior...]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .alternance-container {
      min-height: calc(100vh - 80px);
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .page-header {
      text-align: center;
      margin-bottom: 4rem;
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

    /* Entreprise Section */
    .entreprise-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .info-item {
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    .info-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 0.5rem;
    }

    .info-value {
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }

    .tech-stack {
      margin-top: 1rem;
    }

    .tech-badges {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }

    .tech-badge {
      padding: 0.5rem 1rem;
      background: var(--violet-light);
      color: var(--violet-primary);
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
    }

    /* Détails Section */
    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .detail-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    .detail-icon {
      font-size: 2rem;
      flex-shrink: 0;
    }

    .detail-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .detail-text {
      color: var(--text-secondary);
      margin: 0;
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
      background: var(--orange-primary);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 2rem;
    }

    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0.5rem;
      width: 1rem;
      height: 1rem;
      background: var(--orange-primary);
      border-radius: 50%;
      border: 3px solid var(--bg-primary);
    }

    .timeline-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .mission-list {
      list-style: none;
      padding: 0;
    }

    .mission-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .mission-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--orange-primary);
      font-weight: bold;
    }

    /* Compétences Section */
    .competences-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .competence-category {
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    .category-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--violet-primary);
      margin-bottom: 1rem;
    }

    .competence-list {
      list-style: none;
      padding: 0;
    }

    .competence-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .competence-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--orange-primary);
      font-weight: bold;
    }

    /* Expérience Section */
    .experience-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .experience-item {
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
    }

    .experience-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 1rem;
    }

    .experience-list {
      list-style: none;
      padding: 0;
    }

    .experience-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .experience-list li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--orange-primary);
      font-weight: bold;
      font-size: 1.2rem;
    }

    .experience-text {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }

    /* Témoignages Section */
    .temoignages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .temoignage-card {
      padding: 2rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
      border-left: 4px solid var(--orange-primary);
    }

    .temoignage-text {
      font-style: italic;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }

    .temoignage-author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .author-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .author-title {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin: 0;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .section-card {
        padding: 1.5rem;
      }

      .entreprise-grid,
      .details-grid,
      .competences-grid,
      .experience-grid,
      .temoignages-grid {
        grid-template-columns: 1fr;
      }

      .timeline {
        padding-left: 1.5rem;
      }

      .timeline-marker {
        left: -1.5rem;
      }

      .page-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class AlternanceComponent {}
