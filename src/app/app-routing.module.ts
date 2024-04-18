import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { ServiceAuthGuardGuard } from './service-auth-guard.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'seller-auth',component:SellerAuthComponent},
  {path:'seller-home',component:SellerHomeComponent,
    canActivate:[ServiceAuthGuardGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent, canActivate:[ServiceAuthGuardGuard]},
  {path:'seller-update-product/:id', component:SellerUpdateProductComponent,canActivate:[ServiceAuthGuardGuard]},
  {path:'search-product/:query', component:SearchProductComponent},
  {path:'product-detail/:id', component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
