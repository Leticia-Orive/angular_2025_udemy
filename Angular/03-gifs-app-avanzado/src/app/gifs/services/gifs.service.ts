import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif..mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log(gifs);
  return gifs;
};

//Objecto literal
// {
//   'goku': [gif1,gif2,gif3],
//   'saitama': [gif1,gif2,gif3],
//   'dragon ball': [gif1,gif2,gif3],
// }

// Record<string, Gif[]>

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();

  }
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  })

  //metodo
  loadTrendingGifs() {
    //En angular recomienda que se utile un objecto llamado http

    //Este http es un objecto que nos permite hacer peticiones get, put, post, delete, patch etc

    //Ahora vamos hacer una peticion get
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
        //Para que funcione la peticion nos tenemos que subscribir
      })
      .subscribe((resp) => {
        //console.log(resp);
        //resp.data[0].images.original.url
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({ gifs });
      });
  }

  //Creamos otro metodo para buscar gifs
  searchGifs(query: string):Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        //TODO hISTORIAL
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
    /** .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        console.log({ search: gifs });
      });*/
  }
  //Creamos un metodo para obtener los gifs del historial
  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
