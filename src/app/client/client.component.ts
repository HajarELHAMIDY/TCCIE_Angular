import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client.model';
import { AuthentificationService } from '../login/authentification.service';
import { CaddyService } from '../services/caddy.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Ville } from '../model/ville.model';
import { CatalogueService } from '../catalogue.service';
import { PayementService } from '../services/payement.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private mode :number=0;
  private panelStyle :string;
  public client: Client = new Client();
  public villes; 
  public selectedOptionVille: string;
  public message; 
  public paypal : boolean = false; 
  public url :string;
  

  constructor(public authService:AuthentificationService,public paymentService:PayementService, public catalService: CatalogueService,private router:Router, public orderService:OrderService, public caddyService:CaddyService) { }

  ngOnInit() {
   this.catalService.getResource("/villes").subscribe(
      data=> {
        this.villes = data;
        this.villes = this.villes._embedded;
      },err=>{
        console.log(err);
              })
    }
    selectOptionVille(name: string) {

      this.selectedOptionVille=name;
    
     console.log(this.orderService.todayNumber);
    }
  
  onSaveClient(){
  
    
    this.orderService.setClient(this.client);
    this.caddyService.setClient(this.client);
   this.orderService.loadProductsFromCaddy();
   
    this.mode=1;
  
  }
  onOrder(){
    this.mode=2;
    this.orderService.submitOrder(this.client, this.selectedOptionVille).subscribe(data=>{
     // this.orderService.order.idOrder=data['idOrder'];
      //this.orderService.order.date=data['date'];
     

    });

 //this.onPayOrder();
  }
  onPayPaypal(){
 
    this.paypal = true;
    

      this.paymentService.makePaymentPaypal(this.orderService.order.totalAmount).subscribe(data=>{
     
    this.url=data['redirect_url'];
    console.log(this.url)

      });
    
  }
  

}
