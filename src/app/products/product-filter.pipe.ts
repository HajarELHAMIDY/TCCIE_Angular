import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../model/product.model';


@Pipe({
    name : 'filter'
})
export class ProductFilterPipe implements PipeTransform{
    transform(products : Product[], search:string) : Product[]{
        if(!products || !search){
            console.log(search)
            return products;
        }
        console.log(search+" test")
        return  products.filter(products=>
            products.nameProduct.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !==-1);
    }

} 