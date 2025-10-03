import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  div {
    width: 100vw;
    height: calc( 100vh - 64px) ;

  }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
 async ngAfterViewInit() {
  if (!this.divElement()?.nativeElement) return;

  // Espera un poco para asegurar que el DOM esté completamente renderizado
  await new Promise((resolve) => setTimeout(resolve, 100));

  const element = this.divElement()!.nativeElement;
  console.log({element});

  // Crear el mapa de Mapbox
  const map = new mapboxgl.Map({
    container: element, // Usar la referencia del elemento directamente
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
}

}
