// RUTAS DEL MÓDULO REACTIVE FORMS
// Este módulo demuestra diferentes tipos de formularios reactivos
import { Routes } from "@angular/router";
import { BasicPageComponent } from "./basic-page/basic-page.component";
import { DynamicPageComponent } from "./dynamic-page/dynamic-page.component";
import { SwitchesPageComponent } from "./switches-page/switches-page.component";

export const reactiveRoutes: Routes = [
  {
    path: '',
    children:[
      {
        // FORMULARIOS BÁSICOS: Validaciones, estados, manejo de errores
        // URL: /reactive/basic
        path: 'basic',
        title: 'Basicos',           // Título que aparece en el navegador
        component: BasicPageComponent
      },
      {
        // FORMULARIOS DINÁMICOS: FormArray, agregar/quitar campos
        // URL: /reactive/dynamic
        path: 'dynamic',
        title: 'Dinamicos',
        component: DynamicPageComponent
      },
      {
        // CONTROLES ESPECIALES: Switches, checkboxes, radio buttons
        // URL: /reactive/switches
        path: 'switches',
        title: 'Switches',
        component: SwitchesPageComponent
      },
      {
        // RUTA POR DEFECTO: Redirige a básicos si no se especifica subruta
        path: '**',
        redirectTo: 'basic'
      },

    ]
  },
]
