import { Category } from './category.model';
import { Rang } from './rang.model';


export class Product {
    idProduct:number;
    nameProduct:string;
    descProduct : string;
   price : number;
    promotion:Boolean;
    stock:number;
   imageP:string;
    quantity:number;
    catgory: Category;
    category : Category;
    opt : Boolean; 
  
    rang :Rang;
    
    _links:{
        self:{
            href:string;

        },
        product:{
            href:string;

        },
        category:{
            href:string; 
        },
        rang:{
            href:string; 
        }
    }
} 