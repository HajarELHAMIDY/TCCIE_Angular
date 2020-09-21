import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../model/client.model';

@Pipe({
    name : 'filterClient'
})
export class ClientFilterPipe implements PipeTransform{
    transform(clients : Client[], search:string) : Client[]{
        if(!clients || !search){
         
            return clients;
        }
  
        return  clients.filter(clients=>
            clients.ptsF.toString().indexOf(search) !==-1);
         
    }
}  
    



