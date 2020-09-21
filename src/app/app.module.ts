import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CaddyComponent } from './caddy/caddy.component';
import { ClientComponent } from './client/client.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { CategoryComponent } from './category/category.component';
import { RegisterCategoryComponent } from './register-category/register-category.component';
import { ResellerComponent } from './reseller/reseller.component';
import { RegisterResselerComponent } from './register-resseler/register-resseler.component';
import { RangComponent } from './rang/rang.component';
import { RegisterRangComponent } from './register-rang/register-rang.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

import { FirstPageComponent } from './first-page/first-page.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { ResellerListeComponent } from './reseller-liste/reseller-liste.component';
import { LoginInterceptor } from './login/login.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PayCartComponent } from './pay-cart/pay-cart.component';
import { ProductFilterPipe } from './products/product-filter.pipe';
import { CategoryFilterPipe } from './category/category-filter.pipe';
import { RangFilterPipe } from './rang/rang-filter.pipe';
import { ResellerFilterPipe } from './reseller/reseller-filter.pipe';
import { ClientFilterPipe } from './admin/client-filter.pipe';
import { CommandesComponent } from './commandes/commandes.component';
import { RegisterOrderComponent } from './register-order/register-order.component';
import { CommandeFilterPipe } from './commandes/commande-filter.pipe';
import { ResellerListeFilterPipe } from './reseller-liste/reseller-liste-filter.pipe';
import { OrderItemsComponent } from './order-items/order-items.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ClientOrderComponent } from './client-order/client-order.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    ProductDetailsComponent,
    CaddyComponent,
    ClientComponent,
    RegisterProductComponent,
    CategoryComponent,
    RegisterCategoryComponent,
    ResellerComponent,
    RegisterResselerComponent,
    RangComponent,
    RegisterRangComponent,
    RegisterClientComponent,
    ClientFilterPipe,
    AdminComponent,
    RegisterAdminComponent,
    CommandeFilterPipe, 
    FirstPageComponent,
    ResellerFilterPipe,
    ResellerListeComponent,
    RangFilterPipe,
    PayCartComponent,
    ProductFilterPipe,
    CategoryFilterPipe,
    CommandesComponent,
    RegisterOrderComponent, 
    ResellerListeFilterPipe, OrderItemsComponent, ProductItemComponent, ClientOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, FormsModule,
    NgxPaginationModule
    
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS ,
    useClass : LoginInterceptor,
    multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
