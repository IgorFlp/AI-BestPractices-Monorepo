import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <header class="app-header">
      <div class="nav-container">
        <h1 class="logo">Plataforma CFP</h1>
        <nav class="nav-menu">
          <a routerLink="/events/new" routerLinkActive="active" class="nav-link">Cadastros de eventos</a>
          <a routerLink="/talks/new" routerLinkActive="active" class="nav-link">Cadastro de palestra</a>
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">Dashboard</a>
        </nav>
      </div>
    </header>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app-header {
      background-color: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      font-family: system-ui, -apple-system, sans-serif;
    }

    .nav-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.5rem;
    }

    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2b6cb0;
      margin: 0;
    }

    .nav-menu {
      display: flex;
      gap: 1.5rem;
    }

    .nav-link {
      text-decoration: none;
      color: #4a5568;
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .nav-link:hover {
      color: #3182ce;
      background-color: #ebf8ff;
    }

    .nav-link.active {
      color: #ffffff;
      background-color: #3182ce;
    }

    .main-content {
      background-color: #f7fafc;
      min-height: calc(100vh - 4.5rem);
      padding: 1rem 0;
    }
  `]
})
export class App {
  protected title = 'frontend';
}
