import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

   
  public clients;
  public totalRecords : String;
  public page : Number =1;

  public search: string=""; 
  ville ; 
nameVille:string="";

  constructor(private catalService:CatalogueService, private router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.catalService.getResource("/clients")
    .subscribe(data=>{
this.clients=data;

this.clients = this.clients._embedded.clients
this.totalRecords = this.clients.length;
    },err=>{
console.log(err);
    })
   
  }
 

  getVille(c){
    this.ville = this.catalService.getVille(c).
    subscribe(data=>{
      this.ville = data;
    

  
    }
      );
      this.nameVille = this.ville.name;
      console.log(this.ville)
   
  }

 
  

}
