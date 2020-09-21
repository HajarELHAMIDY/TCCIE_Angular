import { PipeTransform, Pipe } from '@angular/core';
import { Category } from '../model/category.model';

@Pipe({
    name : 'filterCat'
})
export class CategoryFilterPipe implements PipeTransform{
    transform(categories : Category[], searchCat:string) : Category[]{
        if(!categories || !searchCat){
            console.log(searchCat)
            return categories;
        }
        console.log(searchCat+" test")
        return  categories.filter(categories=>
            categories.nameCategory.toLocaleLowerCase().indexOf(searchCat.toLocaleLowerCase()) !==-1);
    }

} 