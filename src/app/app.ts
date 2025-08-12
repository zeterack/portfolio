import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2025 Portfolio. Développé avec Angular.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
    }

    .app-footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
      padding: 2rem 0;
      margin-top: auto;
    }

    .app-footer .container {
      text-align: center;
    }

    .app-footer p {
      color: var(--text-muted);
      margin: 0;
    }
  `]
})
export class AppComponent {
  title = 'portfolio';
}
