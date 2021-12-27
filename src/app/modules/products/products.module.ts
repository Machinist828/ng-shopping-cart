import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { MaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [ProductsComponent, ListProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule { }
