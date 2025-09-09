import { Routes } from '@angular/router';
//import { DashboardPageComponent } from './gifs/pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [

  {
    path: 'dashboard',
    //component: DashboardPageComponent
    //de esta forma hacemos una importación del componente de forma dinámica,
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
    //ruta hija dentro del dashboard
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component'),
      },

      {
        path: 'search',
        //loadComponent(carga diferida) es una función que retorna una promesa. de esta forma hacemos una importación del componente de forma dinámica,
        loadComponent: () => import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: 'history/:query',
        //loadComponent(carga diferida) es una función que retorna una promesa. de esta forma hacemos una importación del componente de forma dinámica,
        loadComponent: () => import('./gifs/pages/git-history/git-history.component'),
      },


      {
        path: '**',
        //redirección a la ruta dashboard
        redirectTo: 'trending'

      }
    ],
  },

      {
        path: '**',
        //redirección a la ruta dashboard
        redirectTo: 'dashboard'
      },



];
