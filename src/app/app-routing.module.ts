import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CaddyComponent } from './caddy/caddy.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { CategoryComponent } from './category/category.component';
import { RegisterCategoryComponent } from './register-category/register-category.component';
import { RangComponent } from './rang/rang.component';
import { RegisterRangComponent } from './register-rang/register-rang.component';
import { Reseller } from './model/reseller.model';
import { ResellerComponent } from './reseller/reseller.component';
import { RegisterResselerComponent } from './register-resseler/register-resseler.component';
import { ClientComponent } from './client/client.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { ResellerListeComponent } from './reseller-liste/reseller-liste.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { AuthentificationguardService } from './login/authentificationguard.service';
import { AdminGuardService } from './login/adminGuard.service';
import { PayCartComponent } from './pay-cart/pay-cart.component';
import { AdminComponent } from './admin/admin.component';
import { CommandesComponent } from './commandes/commandes.component';
import { RegisterOrderComponent } from './register-order/register-order.component';



const routes: Routes = [
  //user
  {path:'products/:p1/:p2', component:ProductsComponent},
  {path:'home',component:FirstPageComponent},
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'caddies',component:CaddyComponent},
  {path:'product-details/:url',component:ProductDetailsComponent},
  {path:'client-cmd',component:ClientComponent},
  {path:'resellers-liste',component:ResellerListeComponent},
  {path:'register-client',component:RegisterClientComponent},
  {path:'client-cmd/payCard',component:PayCartComponent},
 


  {path:'login',component:LoginComponent},
  //admin
  {path:'products/add',component:RegisterProductComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'categories',component:CategoryComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'categories/register',component:RegisterCategoryComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'rangs',component:RangComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'rangs/register',component:RegisterRangComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'resellers',component:ResellerComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'resellers/register',component:RegisterResselerComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'clients',component:AdminComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  {path:'commandes',component:CommandesComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  
  {path:'orders/register',component:RegisterOrderComponent,canActivate: [AuthentificationguardService,AdminGuardService]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
