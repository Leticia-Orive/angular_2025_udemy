import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

//Interface
interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {
    const {limit = 9, offset = 0, gender= ''} = options;
    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
      /**se puede poner asi
      limit: limit,
        offset: offset,
        gender: gender}*/
        /**o asi que queda mas bonito*/
        limit,
         offset,
         gender
      }
    }).pipe(
      tap(resp => console.log(resp))
    )
  }

}
