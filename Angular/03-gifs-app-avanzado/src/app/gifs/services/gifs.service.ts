import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif..mapper";

@Injectable ({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio de Gifs Listo');
   }

  //metodo
  loadTrendingGifs(){
    //En angular recomienda que se utile un objecto llamado http

    //Este http es un objecto que nos permite hacer peticiones get, put, post, delete, patch etc

    //Ahora vamos hacer una peticion get
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      },
      //Para que funcione la peticion nos tenemos que subscribir
    }).subscribe( (resp) => {
      //console.log(resp);
      //resp.data[0].images.original.url
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    });
  }

  //Creamos otro metodo para buscar gifs
  searchGifs(query: string){
   this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        console.log({ search: gifs });
      });
  }

}
