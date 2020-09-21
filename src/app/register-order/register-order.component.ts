import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { OrderC } from '../model/orderc.model';

@Component({
  selector: 'app-register-order',
  templateUrl: './register-order.component.html',
  styleUrls: ['./register-order.component.css']
})
export class RegisterOrderComponent implements OnInit {

  order : OrderC ;
  message : any;
 

  constructor(private catalService : CatalogueService, private router : Router) { 

  }

  ngOnInit() {
    this.order = this.catalService.getterOrder();
  }
  

  public addOrder(){
    
    this.catalService.registerResource(this.order, "/order/add")
    .subscribe((data)=> this.message =data);
 
    
    this.router.navigate(['/commandes']);
  

  }
  
  processForm(){

    if(this.order.idOrder==0|| this.order.idOrder==undefined){
      this.addOrder();
    }else{
      this.catalService.updateResource("/orders/update",this.order).subscribe((data)=> this.message =data);
      this.router.navigate(['/commandes']);

  

    }
}
}
