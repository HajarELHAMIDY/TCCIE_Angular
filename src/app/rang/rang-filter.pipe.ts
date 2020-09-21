import { Pipe, PipeTransform } from '@angular/core';
import { Rang } from '../model/rang.model';

@Pipe({
    name : 'filterRang'
})
export class RangFilterPipe implements PipeTransform{
    transform(rangs : Rang[], searchRang:string) : Rang[]{
        if(!rangs || !searchRang){
         
            return rangs;
        }
     
        return  rangs.filter(rangs=>
            rangs.nameRang.toLocaleLowerCase().indexOf(searchRang.toLocaleLowerCase()) !==-1);
    }

} 