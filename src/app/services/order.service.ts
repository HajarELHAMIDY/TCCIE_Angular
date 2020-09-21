import { Injectable } from '@angular/core';
import { OrderC } from '../model/orderc.model';
import { CaddyService } from './caddy.service';
import { HttpClient } from '@angular/common/http';
import { CatalogueService } from '../catalogue.service';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';
import { OrderForm } from '../model/order-form.model';
import { ClientDetails } from '../model/client.details.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:OrderC = new OrderC();
  private orderForm : OrderForm = new OrderForm();
  date : Date = new Date();
  todayNumber: number = Date.now();

  constructor(private caddyService:CaddyService, private httpClient: HttpClient, private catalService: CatalogueService) {


   }
   public setClient(client:Client){
     this.order.client= client;

   }
   public loadProductsFromCaddy(){
     this.order.products=[];
     this.order.products=this.caddyService.getCurrentCaddy().productsItems;
   
   }
   public getOrderItems(order :OrderC){
   
    return this.httpClient.get(order._links.orderItems.href);
   }
   getTotal(){
let total :number =0;
this.order.products.forEach(p=>{
  total+=p.price*p.quantity;
}); 
this.order.totalAmount = total;
return total;

   }
   submitOrder(client, ville){
   
    this.orderForm.client=client;
    this.orderForm.ville = ville;
    this.orderForm.products = this.order.products;
   
     return this.httpClient.post(this.catalService.host+"/orders",this.orderForm)
   }
   getOrder(id:number):Observable<OrderC>{
      return this.httpClient.get<OrderC>(this.catalService.host+"/orders"+id);
   }
}
