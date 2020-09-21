import { Product } from './product.model';
import { OptionP } from './optionp.model';

export class OrderItems{
    public product : Product;
    public quantity:number;
    public price: number;
    public optionP : string; 
    
}