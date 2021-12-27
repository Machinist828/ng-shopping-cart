import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductViewModel } from 'src/app/modules/products/models/product-view.model';
import { Product } from 'src/app/modules/products/models/product.model';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  @Output() cartClosed: EventEmitter<any> = new EventEmitter<any>();

  sub: Subscription = new Subscription();
  items: ProductViewModel[] = [];

  constructor(private router: Router, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.sub = this.productService.itemsInCart.subscribe(result => {
      this.items = result;
    });
  }

  onCartCloseClick() {
    this.cartClosed.emit();
  }

  onCheckoutClick() {
    this.cartClosed.emit();
    this.router.navigate(['checkout']);
  }

  get totalPrice(): number {
    let sum = 0;
    this.items.map(x => sum += x.price * x.quantity);
    return sum;
  }

  onRemoveItemFromCart(product: ProductViewModel) {
    this.items = this.items.filter(x => x.id !== product.id);
    this.productService.itemsInCart.next(this.items);
  }

  incrementQuantity(product: ProductViewModel) {
    product.quantity++;
    this.productService.itemsInCart.next(this.items);
  }

  decrementQuantity(product: ProductViewModel) {
    product.quantity--;
    if (product.quantity === 0) {
      this.onRemoveItemFromCart(product);
    } else {
      this.productService.itemsInCart.next(this.items);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
