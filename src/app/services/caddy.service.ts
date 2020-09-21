import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/product.model';
import { OrderItems } from '../model/order-item.model';
import { Client } from '../model/client.model';
import { OptionP } from '../model/optionp.model';


@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  
 // currentCaddyName:string="Panier 1";

 //private caddies : Map<string,Caddy> = new Map();
 public caddy : Caddy;
  


  constructor() { 
    
   
    let caddy= localStorage.getItem("Panier");
   if(caddy){
     this.caddy= JSON.parse(caddy)
    
   }else{
     this.caddy= new Caddy("Panier 1");
    
   }
  
      

    
    
  }
  public setClient(client :Client){
    this.caddy.client =client;
  }

  getCurrentCaddy():Caddy{
   
  
       return this.caddy;
        } 
  chercheItem(id : number): OrderItems{
    
      for(let p of Object.keys(this.caddy.productsItems)){
       
      if(this.caddy.productsItems[p].product.idProduct==id){
       
        return  this.caddy.productsItems[p];
       }

    }
    


    return null
  }
  public addProductToCaddy(product: Product, option : string): void {
 
    let productItem: OrderItems=this.chercheItem(product.idProduct);

 
    if(productItem!=null && productItem.optionP==option){
      
      productItem.quantity+=product.quantity;

    
  
      this.saveCaddies()
    } else{ 
      productItem = new OrderItems();
      productItem.price = product.price;
      productItem.quantity = product.quantity;
      productItem.product = product;
      productItem.optionP = option ; 
      this.caddy.productsItems.push(productItem);
      console.log( this.caddy.productsItems);
    this.saveCaddies()
    }

  }
  getTotal(): number{
    let total =0;
    let items: IterableIterator<OrderItems> = this.getCurrentCaddy().productsItems.values();
    for(let pi of items){
      
      total+=pi.price*pi.quantity;
    }
    return total;

  }
  public saveCaddies(){
  
   localStorage.setItem('Panier', JSON.stringify(this.caddy));

  }
  deleteProduct(p){
    this.caddy.productsItems = this.caddy.productsItems.filter(item => item !== p);
    this.saveCaddies();
  }
  deleteCaddy(){
    

    var val = confirm("Voulez-vous vider  le  panier ?");

    if( val == true ) {
      localStorage.removeItem("Panier");
    }
    location.reload();
  }

}
