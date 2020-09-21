import { Pipe, PipeTransform } from '@angular/core';
import { OrderC } from '../model/orderc.model';

@Pipe({
    name : 'filterDate'
})
export class CommandeFilterPipe implements PipeTransform{
    transform(orders : OrderC[], searchDate:string) : OrderC[]{
        if(!orders || !searchDate){
           // console.log(searchCat)
            return orders;
        }
     //   console.log(searchCat+" test")
        return  orders.filter(orders=>
            orders.date.toLocaleLowerCase().indexOf(searchDate.toLocaleLowerCase()) !==-1);
    }
}