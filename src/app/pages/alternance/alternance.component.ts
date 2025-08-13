import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-alternance',
  imports: [RouterLink],
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
                <p class="info-value">Blueway</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Secteur d'activité</h3>
                <p class="info-value">Éditeur de logiciel</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Taille de l'entreprise</h3>
                <p class="info-value">100 personnes</p>
              </div>
              <div class="info-item">
                <h3 class="info-title">Environnement de travail</h3>
                <p class="info-value">Équipe innovation de 3 personnes (incluant le directeur du service), environnement dynamique et orienté R&D</p>
              </div>
            </div>
            
            <div class="tech-stack">
              <h3 class="info-title">Technologies utilisées</h3>
              <div class="tech-badges">
                <a routerLink="/competences/python" class="tech-badge tech-badge-link">
                  <img src="assets/icons/python.svg" alt="Python" class="tech-icon">
                  <span>Python</span>
                </a>
                <a routerLink="/competences/fastapi" class="tech-badge tech-badge-link">
                  <img src="assets/icons/fastapi.webp" alt="FastAPI" class="tech-icon">
                  <span>FastAPI</span>
                </a>
                <a routerLink="/competences/postgres" class="tech-badge tech-badge-link">
                  <img src="assets/icons/postgresql.svg" alt="PostgreSQL" class="tech-icon">
                  <span>PostgreSQL</span>
                </a>
                <a routerLink="/competences/docker" class="tech-badge tech-badge-link">
                  <img src="assets/icons/docker.webp" alt="Docker" class="tech-icon">
                  <span>Docker</span>
                </a>
                <a routerLink="/competences/kubernetes" class="tech-badge tech-badge-link">
                  <img src="assets/icons/kubernetes.svg" alt="Kubernetes" class="tech-icon">
                  <span>Kubernetes</span>
                </a>
                <a routerLink="/competences/gitlab-ci" class="tech-badge tech-badge-link">
                  <img src="assets/icons/gitlab.svg" alt="GitLab CI/CD" class="tech-icon">
                  <span>GitLab CI/CD</span>
                </a>
                <a routerLink="/competences/rag" class="tech-badge tech-badge-link">
                  <img src="assets/icons/rag.webp" alt="RAG" class="tech-icon">
                  <span>RAG</span>
                </a>
                <a routerLink="/competences/mistral-ai" class="tech-badge tech-badge-link">
                  <img src="assets/icons/mistral.webp" alt="Mistral AI" class="tech-icon">
                  <span>Mistral AI</span>
                </a>
                <a routerLink="/competences/openai-api" class="tech-badge tech-badge-link">
                  <img src="assets/icons/openai.svg" alt="OpenAI" class="tech-icon">
                  <span>OpenAI</span>
                </a>
                <a routerLink="/competences/huggingface" class="tech-badge tech-badge-link">
                  <img src="assets/icons/huggingface.svg" alt="HuggingFace" class="tech-icon">
                  <span>HuggingFace</span>
                </a>
                <a routerLink="/competences/earthly" class="tech-badge tech-badge-link">
                  <img src="assets/icons/earthly.svg" alt="Earthly" class="tech-icon">
                  <span>Earthly</span>
                </a>
                <a routerLink="/competences/argocd" class="tech-badge tech-badge-link">
                  <img src="assets/icons/argocd.webp" alt="ArgoCD" class="tech-icon">
                  <span>ArgoCD</span>
                </a>
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
                  <p class="detail-text">Septembre 2024 - Août 2028 (4 ans)</p>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">🔄</div>
                <div class="detail-content">
                  <h3 class="detail-title">Rythme</h3>
                  <p class="detail-text">1 semaine école / 1 semaine entreprise</p>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">👨‍💻</div>
                <div class="detail-content">
                  <h3 class="detail-title">Intitulé du poste</h3>
                  <p class="detail-text">Développeur Innovation</p>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">👥</div>
                <div class="detail-content">
                  <h3 class="detail-title">Équipe d'accueil</h3>
                  <p class="detail-text">Équipe innovation de 3 personnes</p>
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
                  <h3 class="timeline-title">Première année (2024-2025) - En cours</h3>
                  <div class="mission-categories">
                    <div class="mission-category">
                      <h4 class="mission-category-title">🔧 Développement d'Applications</h4>
                      <ul class="mission-list">
                        <li><strong>NiceGUI :</strong> Création d'interfaces utilisateur modernes pour les applications RAG</li>
                        <li><strong>FastAPI :</strong> Développement d'APIs RESTful Python pour le projet InnoLabs</li>
                        <li><strong>SQLAlchemy :</strong> Gestion des interactions avec PostgreSQL via ORM</li>
                        <li><strong>PGvector :</strong> Implémentation de la recherche vectorielle pour les technologies RAG</li>
                        <li><strong>MultiTenant :</strong> Mise en place de l'isolation des données utilisateurs</li>
                      </ul>
                    </div>
                    
                    <div class="mission-category">
                      <h4 class="mission-category-title">⚙️ DevOps & Automatisation</h4>
                      <ul class="mission-list">
                        <li><strong>GitLab CI/CD :</strong> Automatisation des tests et déploiements</li>
                        <li><strong>Earthly :</strong> Création d'images Docker optimisées et reproductibles</li>
                        <li><strong>Harbor :</strong> Gestion du registre d'images Docker</li>
                        <li><strong>ArgoCD :</strong> Déploiement continu sur Kubernetes</li>
                        <li><strong>Paketo :</strong> Création d'images sécurisées respectant les normes cybersécurité</li>
                      </ul>
                    </div>
                    
                    <div class="mission-category">
                      <h4 class="mission-category-title">🐳 Containerisation & Orchestration</h4>
                      <ul class="mission-list">
                        <li><strong>Docker Compose :</strong> Orchestration locale des services d'application</li>
                        <li><strong>Kubernetes :</strong> Déploiement en production des microservices</li>
                        <li><strong>Okteto :</strong> Synchronisation temps réel avec les pods Kubernetes</li>
                      </ul>
                    </div>
                    
                    <div class="mission-category">
                      <h4 class="mission-category-title">📊 Qualité & Observabilité</h4>
                      <ul class="mission-list">
                        <li><strong>Observabilité :</strong> Monitoring avec Grafana, Prometheus, Loki et Tempo</li>
                        <li><strong>Tests d'intégration :</strong> Implémentation de +350 assertions avec Bruno</li>
                        <li><strong>Documentation :</strong> Création de documentation technique complète</li>
                      </ul>
                    </div>
                    
                    <div class="mission-category">
                      <h4 class="mission-category-title">🤖 IA & Traitement d'Images</h4>
                      <ul class="mission-list">
                        <li><strong>Streaming d'images :</strong> Protocol multipart/form pour optimiser les performances</li>
                        <li><strong>Détection d'objets :</strong> Reconnaissance automatique d'éléments dans les images</li>
                        <li><strong>Catégorisation IA :</strong> Classification automatique du contenu (NSFW, thématique)</li>
                        <li><strong>Description automatique :</strong> Génération de descriptions textuelles d'images</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Projets réalisés -->
        <section class="projets-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">🚀</span>
              Projets réalisés
            </h2>
            
            <div class="projets-grid">
              <div class="projet-card">
                <div class="projet-header">
                  <h3 class="projet-title">InnoLabs - API Platform</h3>
                  <span class="projet-duration">Projet principal</span>
                </div>
                <p class="projet-description">
                  Plateforme d'APIs Python exposant des services IA pour les utilisateurs Blueway. 
                  Architecture microservices avec FastAPI, déploiement Kubernetes et monitoring avancé.
                </p>
                <div class="projet-tech">
                  <span class="tech-tag">FastAPI</span>
                  <span class="tech-tag">Kubernetes</span>
                  <span class="tech-tag">PostgreSQL</span>
                  <span class="tech-tag">ArgoCD</span>
                </div>
              </div>
              
              <div class="projet-card">
                <div class="projet-header">
                  <h3 class="projet-title">RAG Refactoring & Testing</h3>
                  <span class="projet-duration">~70h</span>
                </div>
                <p class="projet-description">
                  Refactorisation complète du système RAG pour la production avec implémentation 
                  de +350 tests d'intégration via Bruno pour garantir la fiabilité.
                </p>
                <div class="projet-tech">
                  <span class="tech-tag">Python</span>
                  <span class="tech-tag">Bruno</span>
                  <span class="tech-tag">PostgreSQL</span>
                  <span class="tech-tag">PGvector</span>
                </div>
              </div>
              
              <div class="projet-card">
                <div class="projet-header">
                  <h3 class="projet-title">RAG Image - Computer Vision</h3>
                  <span class="projet-duration">~130h</span>
                </div>
                <p class="projet-description">
                  Extension du RAG pour le traitement d'images : embedding avec Jina-Clip-V1, 
                  détection d'objets zero-shot, classification thématique, détection NSFW et génération 
                  de descriptions automatiques.
                </p>
                <div class="projet-tech">
                  <span class="tech-tag">Computer Vision</span>
                  <span class="tech-tag">HuggingFace</span>
                  <span class="tech-tag">S3 Bucket</span>
                  <span class="tech-tag">Multipart/Form</span>
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
                  <li>Développement d'APIs RESTful avec FastAPI et Python</li>
                  <li>Architecture microservices et containerisation Docker</li>
                  <li>Orchestration Kubernetes et déploiement continu</li>
                  <li>Intelligence Artificielle : RAG, Computer Vision, NLP</li>
                  <li>Bases de données : PostgreSQL, PGvector, SQLAlchemy</li>
                  <li>DevOps : GitLab CI/CD, Earthly, ArgoCD, Harbor</li>
                  <li>Observabilité : Grafana, Prometheus, Loki, Tempo</li>
                  <li>Cloud Computing : Kubernetes, S3 Bucket OVH</li>
                </ul>
              </div>
              
              <div class="competence-category">
                <h3 class="category-title">Compétences IA & Data</h3>
                <ul class="competence-list">
                  <li>Développement de systèmes RAG (Retrieval-Augmented Generation)</li>
                  <li>Traitement d'images : embedding, détection d'objets, classification</li>
                  <li>Modération de contenu avec détection NSFW automatisée</li>
                  <li>Intégration de modèles HuggingFace (Jina-Clip-V1, FalconAI)</li>
                  <li>Recherche vectorielle et similarité sémantique</li>
                  <li>Architecture MultiTenant pour isolation des données</li>
                </ul>
              </div>
              
              <div class="competence-category">
                <h3 class="category-title">Soft skills & Management</h3>
                <ul class="competence-list">
                  <li>Gestion de projet : planification, suivi, documentation</li>
                  <li>Travail en autonomie sur projets complexes</li>
                  <li>Capacités pédagogiques et partage de connaissances</li>
                  <li>Résolution de problèmes techniques innovants</li>
                  <li>Communication technique et documentation complète</li>
                  <li>Synchronisation d'équipe et collaboration DevOps</li>
                  <li>Amélioration continue de l'anglais technique</li>
                </ul>
              </div>
              
              <div class="competence-category">
                <h3 class="category-title">Outils et méthodologies</h3>
                <ul class="competence-list">
                  <li>Méthodologies DevOps et intégration continue</li>
                  <li>Tests d'intégration avancés (Bruno, +350 assertions)</li>
                  <li>Monitoring et observabilité en production</li>
                  <li>Gestion des dépendances Python (pip, poetry)</li>
                  <li>Containerisation avancée (Docker, Earthly, Paketo)</li>
                  <li>Documentation technique et guides d'utilisation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Défis et solutions -->
        <section class="defis-section">
          <div class="section-card">
            <h2 class="section-title">
              <span class="title-icon">⚡</span>
              Défis rencontrés et solutions
            </h2>
            
            <div class="defis-grid">
              <div class="defi-card">
                <h3 class="defi-title">🤖 Choix des modèles d'IA</h3>
                <div class="defi-content">
                  <h4 class="defi-subtitle">Difficultés rencontrées :</h4>
                  <ul class="defi-list">
                    <li>Compréhension complexe de la plateforme HuggingFace</li>
                    <li>Impossibilité de déployer certains modèles de manière sécurisée</li>
                    <li>Manque d'indicateurs de performance pour comparer les modèles</li>
                  </ul>
                  
                  <h4 class="defi-subtitle">Solutions mises en place :</h4>
                  <ul class="solution-list">
                    <li>Apprentissage progressif par expérimentation sur HuggingFace</li>
                    <li>Création de scripts de déploiement personnalisés (handlers)</li>
                    <li>Choix de modèles généralistes avec tests en production différés</li>
                  </ul>
                </div>
              </div>
              
              <div class="defi-card">
                <h3 class="defi-title">👤 Projet en forte autonomie</h3>
                <div class="defi-content">
                  <h4 class="defi-subtitle">Contexte :</h4>
                  <p class="defi-description">
                    Développement du RAG Image en totale autonomie, les autres membres 
                    étant mobilisés sur d'autres projets critiques.
                  </p>
                  
                  <h4 class="defi-subtitle">Approche adoptée :</h4>
                  <ul class="solution-list">
                    <li>Renforcement des capacités de pédagogie</li>
                    <li>Documentation technique exhaustive pour faciliter le transfert</li>
                    <li>Présentations régulières des choix techniques au tuteur</li>
                    <li>Création de guides d'utilisation pour les utilisateurs finaux</li>
                  </ul>
                </div>
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
                  <li>Immersion totale dans l'écosystème IA et cloud computing</li>
                  <li>Développement de projets à fort impact technique</li>
                  <li>Autonomie progressive sur des technologies de pointe</li>
                  <li>Acquisition d'une expertise DevOps complète</li>
                  <li>Participation à l'innovation R&D de l'entreprise</li>
                </ul>
              </div>
              
              <div class="experience-item">
                <h3 class="experience-title">Défis techniques relevés</h3>
                <ul class="experience-list">
                  <li>Maîtrise de l'écosystème HuggingFace et modèles IA</li>
                  <li>Architecture microservices complexe avec Kubernetes</li>
                  <li>Optimisation des performances pour le traitement d'images</li>
                  <li>Mise en place de l'observabilité en environnement distribué</li>
                  <li>Gestion de la sécurité et conformité (NSFW, cybersécurité)</li>
                </ul>
              </div>
              
              <div class="experience-item">
                <h3 class="experience-title">Impact sur mon projet professionnel</h3>
                <p class="experience-text">
                  Cette expérience m'a permis de me spécialiser dans l'intelligence artificielle 
                  et l'architecture cloud. J'ai développé une expertise unique combinant IA, DevOps 
                  et développement full-stack. Mon objectif est désormais de continuer dans cette 
                  voie d'innovation technologique, avec un focus sur les solutions IA en production 
                  et l'architecture de systèmes distribués performants.
                </p>
              </div>
              
              <div class="experience-item">
                <h3 class="experience-title">Réalisations quantifiées</h3>
                <ul class="experience-list">
                  <li>+350 tests d'intégration implémentés</li>
                  <li>130h dédiées au développement RAG Image</li>
                  <li>Architecture MultiTenant pour isolation complète</li>
                  <li>Monitoring 4 composants : métriques, logs, traces, dashboards</li>
                  <li>Pipeline CI/CD automatisé sur 3 environnements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Témoignages
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
        </section> -->
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
      color: white;
      border-radius: 0.5rem;
      font-weight: 500;
      font-size: 0.875rem;
      display: inline-block;
    }

    .tech-badge-link {
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .tech-badge-link:hover {
      background: var(--violet-primary);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .tech-icon {
      width: 18px;
      height: 18px;
      object-fit: contain;
      flex-shrink: 0;
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
    .mission-categories {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .mission-category {
      padding: 1rem;
      background: var(--bg-secondary);
      border-radius: 0.5rem;
      border-left: 3px solid var(--orange-primary);
    }

    .mission-category-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin-bottom: 0.75rem;
    }

    /* Projets Section */
    .projets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .projet-card {
      padding: 1.5rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
    }

    .projet-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .projet-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .projet-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .projet-duration {
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
      background: var(--violet-light);
      color: var(--violet-primary);
      border-radius: 1rem;
      font-weight: 500;
    }

    .projet-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .projet-tech {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      background: rgba(255, 152, 0, 0.1);
      color: var(--orange-primary);
      border-radius: 0.375rem;
      font-weight: 500;
    }

    /* Défis Section */
    .defis-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .defi-card {
      padding: 2rem;
      background: var(--bg-secondary);
      border-radius: 0.75rem;
      border: 1px solid var(--border-color);
    }

    .defi-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1.5rem;
    }

    .defi-subtitle {
      font-size: 1rem;
      font-weight: 600;
      color: var(--orange-primary);
      margin: 1rem 0 0.5rem 0;
    }

    .defi-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .defi-list,
    .solution-list {
      list-style: none;
      padding: 0;
      margin-bottom: 1rem;
    }

    .defi-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .defi-list li::before {
      content: '⚠️';
      position: absolute;
      left: 0;
      font-size: 0.875rem;
    }

    .solution-list li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .solution-list li::before {
      content: '✅';
      position: absolute;
      left: 0;
      font-size: 0.875rem;
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
