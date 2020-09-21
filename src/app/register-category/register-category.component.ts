import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-register-category',
  templateUrl: './register-category.component.html',
  styleUrls: ['./register-category.component.css']
})
export class RegisterCategoryComponent implements OnInit {
  category : Category ;
  message : any;
 

  constructor(private catalService : CatalogueService, private router : Router) { 

  }

  ngOnInit() {
    this.category = this.catalService.getterCategory();
  }
  

  public addCategory(){
    
    this.catalService.registerResource(this.category, "/categories/add")
    .subscribe((data)=> this.message =data);
 
    
    this.router.navigate(['/categories']);
  

  }
  
  processForm(){

    if(this.category.idCategory==0){
      this.addCategory();
    }else{
      this.catalService.updateResource("/categories/update",this.category).subscribe((data)=> this.message =data);
      this.router.navigate(['/categories']);

  

    }
  }
}
