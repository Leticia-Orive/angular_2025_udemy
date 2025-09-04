import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { GiphyResponse } from "../interfaces/giphy.interface";

@Injectable ({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs();
   }

  //metodo
  loadTrendingGifs(){
    //En angular recomienda que se utile un objecto llamado http

    //Este http es un objecto que nos permite hacer peticiones get, put, post, delete, patch etc

    //Ahora vamos hacer una peticion get
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`),{
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }


  }
}
