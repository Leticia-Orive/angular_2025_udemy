import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment';
import { DecimalPipe } from '@angular/common';

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = environment.mapboxkey

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  div {
    width: 100vw;
    height: calc( 100vh - 64px) ;

  }
  #controls {
    background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;

  }
  `
})
export class FullscreenMapPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
//me creo una propiedad
map = signal<mapboxgl.Map | null>(null);

  //me creo una señal
  zoom = signal(14);

  // voy hacer un zoom efect
  zoomEffect = effect(() => {
    if (!this.map()) return;

    this.map()?.setZoom(this.zoom());
    // this.map()?.zoomTo(this.zoom());
  });

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
    zoom: this.zoom(), // starting zoom
  });

}
//me creo otro metodo

mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });



    this.map.set(map);
  }
}
