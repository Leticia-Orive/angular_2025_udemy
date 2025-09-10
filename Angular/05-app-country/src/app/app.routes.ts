import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path:'country',
    //esto es una forma
    // loadChildren: () => import('./country/country.routes').then( m => m.countryRoutes)
    //otra forma
    loadChildren: () => import('./country/country.routes'),//.then( m => m.countryRoutes)
    //??? {}
  },
  {
    path:'**',
    redirectTo:''
  }
];
