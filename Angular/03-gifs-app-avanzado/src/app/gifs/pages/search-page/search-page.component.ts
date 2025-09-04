import { Component, inject, OnInit, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export  default class SearchPageComponent  {
//Inyectamos el servicio
gifService = inject(GifService)
gifs = signal<Gif[]>([])

//Crear un metodo
onSearch(query: string){
  //console.log({query})
  this.gifService.searchGifs(query)
  .subscribe(resp => {
    console.log(resp);
  });
}

}
