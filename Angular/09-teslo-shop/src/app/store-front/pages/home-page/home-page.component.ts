import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
//import { ProductCardComponent } from '../../../products/components/product-card/product-card.component';
import { ProductsService } from '../../../products/services/products.service';

import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  ProductsService = inject(ProductsService);
  productsResorce = rxResource({
    request: () => ({}),
    loader:({request}) => {
      return this.ProductsService.getProducts({

      })
    }
  })

}


