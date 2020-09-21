import { Component, OnInit } from '@angular/core';
import { Reseller } from '../model/reseller.model';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { HttpBackend, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-resseler',
  templateUrl: './register-resseler.component.html',
  styleUrls: ['./register-resseler.component.css']
})
export class RegisterResselerComponent implements OnInit {

  reseller : Reseller ;
  message : any;
  

  constructor(private catalService : CatalogueService, private router : Router) { 

  }

  ngOnInit() {
    this.reseller = this.catalService.getterReseller();
  }
  

  public addReseller(){
    
    this.catalService.registerResource(this.reseller,"/resellers/add")
    .subscribe((data)=> this.message =data);
 
    
    this.router.navigate(['/resellers']);
  //HttpBackend.post()
  //validateurs spring
  //spring uri 
  //preupdate
  //preremove

  }
  
  
  processForm(){
    console.log(this.reseller.idReseller)
    if(this.reseller.idReseller==undefined || this.reseller.idReseller==0){
      this.addReseller();
    }else{
      this.catalService.updateResource("/resellers/update",this.reseller).subscribe((data)=> this.message =data);
      this.router.navigate(['/resellers']);

  

    }
  }
}
