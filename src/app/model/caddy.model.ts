import { OrderItems } from './order-item.model';
import { Client } from './client.model';

export class Caddy{
    public name:string;
   // public productsItems : Map<number,ProductItem>= new Map();
   public productsItems : OrderItems[]=[]
    public client:Client;
    constructor(name:string){
        this.name = name;

    }
   
  
}