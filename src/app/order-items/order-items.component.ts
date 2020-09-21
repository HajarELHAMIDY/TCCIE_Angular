import { Component, OnInit, Input } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { OrderC } from '../model/orderc.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  @Input() orderItemses:any;
  @Input() idOrder;
  public order; 
  public product; 

 
  constructor(private catalogueService : CatalogueService) {
 
  }
 
  ngOnInit(): void {
  this.catalogueService.getOrderItems(this.idOrder).subscribe(data=>{
    this.orderItemses = data; 
    this.orderItemses = this.orderItemses._embedded.orderItemses; 

 
   
  });
  this.catalogueService.getOrder(this.idOrder).subscribe(data=>{
    this.order= data; 


  }); 


 
  }
  
    
  
  getProduct(id){
    this.catalogueService.getProductByOrder(id).subscribe(data=>{
      this.product = data; 
      console.log(this.product); 
    })    
  }
 
 
}
