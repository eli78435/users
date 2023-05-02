import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { NoAccessComponent } from '../components/no-access/no-access.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ShoppingCardComponent } from '../components/shopping-card/shopping-card.component';
import { ManageOrdersComponent } from '../components/admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from '../components/admin/manage-products/manage-products.component';

const components = [
  CheckoutComponent,
  LoginComponent,
  HomeComponent,
  NavbarComponent,
  NoAccessComponent,
  NotFoundComponent,
  OrdersComponent,
  ShoppingCardComponent,
  ManageOrdersComponent,
  ManageProductsComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [components]
})
export class ComponentModule {}
