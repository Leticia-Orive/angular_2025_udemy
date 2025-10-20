import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EspeciesComponent } from './pages/especies/especies.component';
import {  HistoriaComponent } from './pages/historia/historia.component';
import {  ReservaComponent } from './pages/reserva/reserva.component';
import {  ContactoComponent } from './pages/contacto/contacto.component';
import {  HabitatComponent } from './pages/habitat/habitat.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { AdoptarComponent } from './pages/adoptar/adoptar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'especies', component: EspeciesComponent },
  { path: 'historia', component: HistoriaComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'habitat', component: HabitatComponent },
  { path: 'alimentacion', component: AlimentacionComponent },
  { path: 'adoptar', component: AdoptarComponent },
  { path: '**', redirectTo: '' }
];
