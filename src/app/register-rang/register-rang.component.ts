import { Component, OnInit } from '@angular/core';
import { Rang } from '../model/rang.model';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-rang',
  templateUrl: './register-rang.component.html',
  styleUrls: ['./register-rang.component.css']
})
export class RegisterRangComponent implements OnInit {

  rang : Rang ;
  message : any;
 

  constructor(private catalService : CatalogueService, private router : Router) { 

  }

  ngOnInit() {
    this.rang = this.catalService.getterRang();
  }
  

  public addRang(){
    
    this.catalService.registerResource(this.rang, "/rangs/add")
    .subscribe((data)=> this.message =data);
 
    
    this.router.navigate(['/rangs']);
  

  }
  
  processForm(){
    console.log(this.rang.idRang)
    if(this.rang.idRang==undefined){
      this.addRang();
    }else{
      this.catalService.updateResource("/rangs/update",this.rang).subscribe((data)=> this.message =data);
      this.router.navigate(['/rangs']);

  

    }
  }

}
