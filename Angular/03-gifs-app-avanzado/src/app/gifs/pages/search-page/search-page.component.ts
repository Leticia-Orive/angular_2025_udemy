import { Component, inject, OnInit, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';


@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',


})
export  default class SearchPageComponent  {
  gifService = inject(GifService);

//Crear un metodo
onSearch(query: string){
  //console.log({query})
  this.gifService.searchGifs(query);

}
}
