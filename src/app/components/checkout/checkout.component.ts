import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ProductViewModel } from 'src/app/modules/products/models/product-view.model';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup = {} as any;
  secondFormGroup: FormGroup = {} as any;

  sub: Subscription = new Subscription();
  items: ProductViewModel[] = [];

  constructor(private _formBuilder: FormBuilder, private productService: ProductService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.sub = this.productService.itemsInCart.subscribe(result => {
      this.items = result;
    });
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      billingAddress: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      shippingAddress: ['', Validators.required],
    });
  }

  get totalPrice(): number {
    let sum = 0;
    this.items.map(x => sum += x.price * x.quantity);
    return sum;
  }

  onPayClick() {
    if(this.items.length === 0) {
      // validation error
      this.snackBar.open('There are no products in your cart', 'close', { panelClass: 'snackbar__container__success' });
    } else {
      this.snackBar.open('Checked out successfully!', 'close', { panelClass: 'snackbar__container__success' });

      //here we would make the payment call and after success update the list of products and reset cart
      this.productService.refreshProducts(this.items);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
