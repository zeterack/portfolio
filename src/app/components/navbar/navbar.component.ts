import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ContactModalComponent } from '../../shared/contact-modal/contact-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo/Brand -->
        <div class="nav-brand">
          <a routerLink="/accueil" class="brand-link">
            <span class="brand-text">Portfolio</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="nav-menu" [class.nav-menu--open]="isMenuOpen">
          <a routerLink="/accueil" 
             routerLinkActive="nav-link--active" 
             class="nav-link"
             (click)="closeMenu()">
            Accueil
          </a>
          <a routerLink="/competences" 
             routerLinkActive="nav-link--active" 
             class="nav-link"
             (click)="closeMenu()">
            Compétences
          </a>
          <a routerLink="/projets" 
             routerLinkActive="nav-link--active" 
             class="nav-link"
             (click)="closeMenu()">
            Projets
          </a>
          <a routerLink="/alternance" 
             routerLinkActive="nav-link--active" 
             class="nav-link"
             (click)="closeMenu()">
            Alternance
          </a>
          <button class="contact-btn" (click)="openContact()">
            Contact
          </button>
        </div>

        <!-- Theme Toggle -->
        <button class="theme-toggle" 
                (click)="themeService.toggleTheme()"
                [attr.aria-label]="themeService.isDark() ? 'Passer en mode clair' : 'Passer en mode sombre'">
          @if (themeService.isDark()) {
            <span class="theme-icon">☀️</span>
          } @else {
            <span class="theme-icon">🌙</span>
          }
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="menu-toggle" 
                (click)="toggleMenu()"
                [class.menu-toggle--active]="isMenuOpen"
                aria-label="Toggle menu">
          <span class="menu-line"></span>
          <span class="menu-line"></span>
          <span class="menu-line"></span>
        </button>
      </div>
    </nav>
    
    <!-- Contact Modal -->
    <app-contact-modal 
      *ngIf="showContactModal()"
      (closeModal)="closeContactModal()">
    </app-contact-modal>
  `,
  styles: [`
    .navbar {
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 1000;
      transition: all 0.3s ease;
    }

    .nav-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
    }

    .nav-brand {
      flex-shrink: 0;
    }

    .brand-link {
      text-decoration: none;
      color: var(--text-primary);
    }

    .brand-text {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--orange-primary);
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      position: relative;
    }

    .nav-link:hover {
      color: var(--orange-primary);
      background: var(--orange-light);
    }

    .nav-link--active {
      color: var(--orange-primary);
      background: var(--orange-light);
    }

    .contact-btn {
      background: var(--orange-primary);
      color: white;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .contact-btn:hover {
      background: var(--orange-dark);
      transform: translateY(-2px);
    }

    .theme-toggle {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .theme-toggle:hover {
      background: var(--violet-light);
      border-color: var(--violet-primary);
    }

    .theme-icon {
      font-size: 1.2rem;
    }

    .menu-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      gap: 4px;
    }

    .menu-line {
      width: 24px;
      height: 3px;
      background: var(--text-primary);
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    .menu-toggle--active .menu-line:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }

    .menu-toggle--active .menu-line:nth-child(2) {
      opacity: 0;
    }

    .menu-toggle--active .menu-line:nth-child(3) {
      transform: rotate(-45deg) translate(8px, -8px);
    }

    /* Mobile Styles */
    @media (max-width: 768px) {
      .nav-container {
        padding: 1rem;
      }

      .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        flex-direction: column;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        gap: 1rem;
      }

      .nav-menu--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }

      .menu-toggle {
        display: flex;
      }

      .theme-toggle {
        margin-right: 1rem;
      }
    }
  `],
  imports: [RouterLink, RouterLinkActive, CommonModule, ContactModalComponent]
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  isMenuOpen = false;
  showContactModal = signal(false);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openContact(): void {
    this.showContactModal.set(true);
    this.closeMenu();
  }

  closeContactModal(): void {
    this.showContactModal.set(false);
  }
}
