import { OrderItems } from "./order-item.model";
import { Client } from './client.model';

export class OrderC{
    public idOrder:number;
    public products : Array<OrderItems>=[];
    public totalAmount : number;
    public date : string;
    public client:Client={
        idClient:0,
        firstName:"",
        lastName:"",
        address:"",
        ptsF:0,
        phone:"",
        email:"",
        codePostal:"",
        ville : null,
        rolesUser:[]
    }    
    _links:{
        self:{
            href:string;

        },
        orderC:{
            href:string;

        },
        orderItems:{
            href:string; 
        },
        client:{
            href:string; 
        }
    }
}