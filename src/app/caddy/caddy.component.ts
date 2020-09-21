import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';
import { Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {
  currentTime:number=0;
  taille :number =0;
  constructor(public caddyService: CaddyService,private router:Router, public catalService:CatalogueService) { }

  ngOnInit() {
    this.taille=this.caddyService.getCurrentCaddy().productsItems.length; 

  }
  getTS(){

    return this.currentTime;
  }
 
  getTotalCaddy():number{
   return  this.caddyService.getTotal();
  }
  onNewOrder(){
    this.router.navigateByUrl('/client-cmd')
  }

  onSelectedProduct(){
    this.router.navigateByUrl("/products/1/0");
  }
  
  onRemoveProductFromCaddy(p){
    

    var val = confirm("Voulez-vous supprimer ce produit du panier ?");

if( val == true ) {
  this.caddyService.deleteProduct(p);
  this.ngOnInit
       
}
  }
  removeCaddy(){
    this.caddyService.deleteCaddy();
    this.ngOnInit
  }

}
