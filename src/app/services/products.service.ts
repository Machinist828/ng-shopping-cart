import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { PRODUCTS_LIST } from "../mock-data/mock-products";
import { ProductViewModel } from "../modules/products/models/product-view.model";
import { Product } from "../modules/products/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = PRODUCTS_LIST;
  itemsInCart: BehaviorSubject<ProductViewModel[]> = new BehaviorSubject<ProductViewModel[]>([]);
  constructor() { }

  getProducts(): Observable<Product[]> {

    return of(this.products);
  }

  refreshProducts(itemsInCart: ProductViewModel[]) {
    this.products.filter(p => {
      const cartItem = itemsInCart.find(x => x.id === p.id);
      if(cartItem) {
        p.stock -= cartItem.quantity;
      }
    });
    this.itemsInCart.next([]);
  }
}
