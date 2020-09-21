import { OrderC } from './orderc.model';
import { Client } from './client.model';
import { OrderItems } from './order-item.model';
import { ClientDetails } from './client.details.model';

export class OrderForm{
    client : Client ;
    products : Array<OrderItems>=[];
    ville : string;
    methode:string;
}