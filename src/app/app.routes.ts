import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent),
    title: 'Accueil - Portfolio'
  },
  {
    path: 'competences',
    loadComponent: () => import('./pages/competences/competences.component').then(m => m.CompetencesComponent),
    title: 'Compétences - Portfolio'
  },
  {
    path: 'competences/:id',
    loadComponent: () => import('./pages/competence-detail/competence-detail.component').then(m => m.CompetenceDetailComponent),
    title: 'Détail Compétence - Portfolio'
  },
  {
    path: 'projets',
    loadComponent: () => import('./pages/projets/projets.component').then(m => m.ProjetsComponent),
    title: 'Projets - Portfolio'
  },
  {
    path: 'projets/:id',
    loadComponent: () => import('./pages/projet-detail/projet-detail.component').then(m => m.ProjetDetailComponent),
    title: 'Détail Projet - Portfolio'
  },
  {
    path: 'alternance',
    loadComponent: () => import('./pages/alternance/alternance.component').then(m => m.AlternanceComponent),
    title: 'Alternance - Portfolio'
  },
  {
    path: '**',
    redirectTo: '/accueil'
  }
];
