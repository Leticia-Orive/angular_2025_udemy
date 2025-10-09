import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { DecimalPipe, JsonPipe } from '@angular/common';
// 🆓 CAMBIO A LEAFLET - Completamente gratuito, sin claves API necesarias
import * as L from 'leaflet';

// 🎉 ¡Ya no necesitas claves API ni pagos! OpenStreetMap es gratuito

// 🔧 ARREGLO IMPORTANTE: Configurar iconos por defecto de Leaflet
// Esto soluciona el problema común de iconos que no aparecen
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe,
    JsonPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  /* Contenedor principal del mapa */
  div[data-map="container"] {
    width: 100vw;
    height: calc(100vh - 64px);
    position: relative;
  }

  /* Si el selector div no funciona, usa esta alternativa */
  :host {
    display: block;
    width: 100vw;
    height: calc(100vh - 64px);
  }

  /* Asegurar que el div del mapa tenga dimensiones */
  #map {
    width: 100% !important;
    height: 100% !important;
    min-height: 400px !important;
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

  // 🆓 Señal para el mapa de Leaflet (gratuito)
  map = signal<L.Map | null>(null);

  // Señal para el zoom
  zoom = signal(14);
  coordinates = signal({
    lng: -74.5,
    lat: 40,
  });

  // Efecto para actualizar el zoom
  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.setZoom(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) {
      console.error('No se encontró el elemento del mapa');
      return;
    }

    // Espera un poco para asegurar que el DOM esté completamente renderizado
    await new Promise((resolve) => setTimeout(resolve, 100));

    const element = this.divElement()!.nativeElement;
    const { lat, lng } = this.coordinates();


    // Verificar que el elemento tenga dimensiones
    if (element.offsetWidth === 0 || element.offsetHeight === 0) {
      console.error('❌ El elemento del mapa no tiene dimensiones! Width:', element.offsetWidth, 'Height:', element.offsetHeight);
      return;
    }

    try {
      // 🆓 Crear el mapa con Leaflet (GRATUITO - OpenStreetMap)
      const map = L.map(element, {
        center: [lat, lng], // [latitud, longitud] - formato diferente a Mapbox
        zoom: this.zoom(),
        zoomControl: true
      });

      // 🗺️ Añadir capa de OpenStreetMap (gratuita)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      console.log('✅ Mapa creado exitosamente con OpenStreetMap');

      // Configurar los listeners del mapa
      this.mapListeners(map);

    } catch (error) {
      console.error('❌ Error al crear el mapa:', error);
    }
  }

  // Configurar los listeners del mapa de Leaflet
  mapListeners(map: L.Map) {
    // Listener para cambios de zoom
    map.on('zoomend', () => {
      const newZoom = map.getZoom();
      this.zoom.set(newZoom);
      console.log('🔍 Zoom actualizado a:', newZoom);
    });
    // Listener para cambios de posición del mapa
    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
      console.log('📍 Posición actualizada:', center);
    });

    // 🎮 Añadir controles de Leaflet (equivalentes a Mapbox)
    // Control de escala
    L.control.scale({
      metric: true,
      imperial: false,
      position: 'bottomleft'
    }).addTo(map);

    // Listener para cuando el mapa está listo
    map.whenReady(() => {
      console.log('🎉 Mapa de OpenStreetMap cargado y listo');

      // 📍 Añadir un marcador de ejemplo para verificar que todo funciona
      L.marker([this.coordinates().lat, this.coordinates().lng])
        .addTo(map)
        .bindPopup('¡Tu mapa funciona correctamente! 🗺️')
        .openPopup();
    });

    // Asignar el mapa a la señal
    this.map.set(map);
    console.log('📍 Mapa asignado a la señal');
  }
}
