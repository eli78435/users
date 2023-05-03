import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ManageOrdersComponent } from './components/admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shopping-card', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'manage-orders', component: ManageOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'no-access', component: NoAccessComponent, canActivate: [AuthGuard] },
  { path: '*', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
