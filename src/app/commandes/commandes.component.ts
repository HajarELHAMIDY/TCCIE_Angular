import { Component, OnInit } from '@angular/core';
import { OrderItems } from '../model/order-item.model';
import { CatalogueService } from '../catalogue.service';
import { OrderService } from '../services/order.service';
import { OrderC } from '../model/orderc.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes ; 
  orderItems;
  searchDate: string ="";
  order : OrderC = new OrderC(); 
  cpt=0; 
  public totalRecords : String;
  public page : Number =1;


  constructor(public catalService : CatalogueService, public orderService : OrderService, public router : Router ) { 

  }

  ngOnInit() {
    this.catalService.getResource("/orderCs").subscribe(
      data=> {
        this.commandes = data;
       this.commandes=this.commandes._embedded.orderCs; 
       this.totalRecords= this.commandes.length;
      },err=>{
        console.log(err);
              }); 

           
  }
  getCpt(){
    this.cpt=this.cpt+1;
   
  }
 
   
  updateOrder(order){
    this.catalService.setterOrder(order);
  
    this.router.navigate(['orders/register']);
    
  }
  newOrder(){
    let order = new OrderC();
    order.idOrder =0;
    this.catalService.setterCategory(order);
    this.router.navigate(['orders/register'])


  }
  OnDeleteOrder(c){
    var val = confirm("Voulez-vous supprimer cette commande ?");

if( val == true ) {

  this.catalService.deleteResource(c.idOrder, "/orders/delete/") .subscribe(
    data => {
      
      
  this.ngOnInit();
    },
    error => console.log(error));
       
} 
  }


}
