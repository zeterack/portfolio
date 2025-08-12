import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  template: `
    <div class="accueil-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Bonjour, je suis
              <span class="highlight">Votre Nom</span>
            </h1>
            <p class="hero-subtitle">
              Développeur Full Stack en alternance
            </p>
            <p class="hero-description">
              Passionné par le développement web moderne, je crée des applications performantes 
              et accessibles en utilisant les dernières technologies. Actuellement en fin d'alternance, 
              je recherche de nouveaux défis pour continuer à développer mes compétences.
            </p>
            <div class="hero-actions">
              <a href="/competences" class="btn btn--primary">
                Découvrir mes compétences
              </a>
              <a href="/projets" class="btn btn--secondary">
                Voir mes projets
              </a>
            </div>
            <div class="hero-links">
              <a href="#" class="link-item" aria-label="Télécharger CV">
                📄 Télécharger mon CV
              </a>
              <a href="#" class="link-item" aria-label="Me contacter">
                📧 Me contacter
              </a>
            </div>
          </div>
          <div class="hero-image">
            <div class="image-placeholder">
              <span>Photo de profil</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Stats -->
      <section class="stats">
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">10+</div>
            <div class="stat-label">Compétences techniques</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">5+</div>
            <div class="stat-label">Projets réalisés</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2</div>
            <div class="stat-label">Années d'alternance</div>
          </div>
        </div>
      </section>

      <!-- Quick Access -->
      <section class="quick-access">
        <div class="container">
          <h2 class="section-title">Explorer mon portfolio</h2>
          <div class="access-grid">
            <a href="/competences" class="access-card">
              <div class="card-icon">🚀</div>
              <h3 class="card-title">Compétences</h3>
              <p class="card-description">
                Découvrez mes compétences techniques et soft skills acquises durant ma formation et mon alternance.
              </p>
            </a>
            <a href="/projets" class="access-card">
              <div class="card-icon">💼</div>
              <h3 class="card-title">Projets</h3>
              <p class="card-description">
                Explorez les projets que j'ai réalisés en entreprise, à l'IUT et sur mon temps personnel.
              </p>
            </a>
            <a href="/alternance" class="access-card">
              <div class="card-icon">🏢</div>
              <h3 class="card-title">Alternance</h3>
              <p class="card-description">
                Découvrez mon expérience en alternance, les missions réalisées et les compétences développées.
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .accueil-container {
      min-height: calc(100vh - 80px);
    }

    .hero {
      padding: 4rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .highlight {
      color: var(--orange-primary);
      background: linear-gradient(135deg, var(--orange-primary), var(--orange-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      color: var(--violet-primary);
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .hero-description {
      font-size: 1.1rem;
      color: var(--text-secondary);
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn--primary {
      background: var(--orange-primary);
      color: white;
    }

    .btn--primary:hover {
      background: var(--orange-dark);
      transform: translateY(-2px);
    }

    .btn--secondary {
      background: transparent;
      color: var(--violet-primary);
      border: 2px solid var(--violet-primary);
    }

    .btn--secondary:hover {
      background: var(--violet-primary);
      color: white;
    }

    .hero-links {
      display: flex;
      gap: 2rem;
    }

    .link-item {
      color: var(--text-secondary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .link-item:hover {
      color: var(--orange-primary);
    }

    .hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .image-placeholder {
      width: 300px;
      height: 300px;
      background: var(--bg-secondary);
      border: 2px dashed var(--border-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .stats {
      background: var(--bg-secondary);
      padding: 3rem 2rem;
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .stats-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      color: var(--orange-primary);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--text-secondary);
      font-weight: 500;
    }

    .quick-access {
      padding: 4rem 2rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: var(--text-primary);
    }

    .access-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .access-card {
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 2rem;
      text-decoration: none;
      transition: all 0.3s ease;
      display: block;
    }

    .access-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border-color: var(--orange-primary);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .card-description {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .hero {
        padding: 2rem 1rem;
      }

      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-actions {
        flex-direction: column;
      }

      .stats-container {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .access-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .hero-links {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class AccueilComponent {}
