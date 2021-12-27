import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/products.service';
import { ProductViewModel } from '../../models/product-view.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: ProductViewModel[] = [];
  productsInCart: ProductViewModel[] = [];
  sub: Subscription = new Subscription();

  constructor(private productsService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sub =this.productsService.itemsInCart.subscribe(res => {
      this.productsInCart = res;
    });
    this.productsService.getProducts().subscribe(result => {
      this.products = result.map(x => new ProductViewModel(x.id, 0, x.title, x.price, x.imageUrl, x.stock, x.description));
    });
  }

  isMinusBtnDisabled(quantity: number): boolean {
    return quantity === 0;
  }

  onAddToCartClicked(product: ProductViewModel) {

    if(this.productsInCart.find(x => x.id === product.id)) {
      this.snackBar.open('You already selected that product', 'close', { panelClass: 'snackbar__container__success' });
      return;
    }
    let toCart = new ProductViewModel(
      product.id,
      1,
      product.title,
      product.price,
      product.imageUrl,
      product.stock,
      product.description
    );



    this.productsInCart.push(toCart);

    this.productsService.itemsInCart.next(this.productsInCart);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
