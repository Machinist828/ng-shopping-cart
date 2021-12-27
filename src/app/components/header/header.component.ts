import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter();
  @Output() cartToggled = new EventEmitter();

  numberOfItemsInCart: number = 0;

  sub: Subscription = new Subscription();

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.itemsInCart.subscribe(result => {
      this.numberOfItemsInCart = result.length;
    })
  }

  onToggleSidenav() {
    this.sideNavToggled.emit();
  }

  onShoppingCartToggle() {
    this.cartToggled.emit();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
