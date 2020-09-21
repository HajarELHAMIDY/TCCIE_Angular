import { Pipe, PipeTransform } from '@angular/core';
import { Reseller } from '../model/reseller.model';

@Pipe({
    name : 'filterReseller'
})
export class ResellerFilterPipe implements PipeTransform{
    transform(resellers : Reseller[], searchReseller:string) : Reseller[]{
        if(!resellers || !searchReseller){
         
            return resellers;
        }
     
        return  resellers.filter(resellers=>
            resellers.nameReseller.toLocaleLowerCase().indexOf(searchReseller.toLocaleLowerCase()) !==-1);
    }

} 