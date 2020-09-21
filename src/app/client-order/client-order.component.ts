import { Component, OnInit, Input } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {
  @Input() idOrder; 
  client; 
  ville; 
  
  constructor(public catalService:CatalogueService) { }

  ngOnInit() {
    this.catalService.getClientByOrder(this.idOrder).subscribe(data=>{
      this.client = data; 

    });
    

  }

}
