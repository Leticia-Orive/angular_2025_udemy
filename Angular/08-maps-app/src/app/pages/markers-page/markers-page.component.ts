import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
// 🆓 CAMBIO A LEAFLET - Completamente gratuito, sin claves API necesarias
import * as L from 'leaflet';
import { map } from 'rxjs';

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{
 divElement = viewChild<ElementRef>('map');

   // 🆓 Señal para el mapa de Leaflet (gratuito)
   map = signal<L.Map | null>(null);

   async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()?.nativeElement;
    const map = L.map(element, {
            center: [-122.409850, 37.774929], // [latitud, longitud] - formato diferente a Mapbox
            zoom: 14,
            zoomControl: true
          });
          const marker =
          this.mapListeners(map);
  }

  mapListeners(map: L.Map) {
    console.log('object')
  }
}
