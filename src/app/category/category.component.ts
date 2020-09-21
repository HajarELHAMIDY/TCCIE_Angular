import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categories;
  public category : Category = new Category();
  public searchCat: string=""; 

  constructor(private catalService:CatalogueService, private router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.catalService.getResource("/categories")
    .subscribe(data=>{
this.categories=data;
this.categories = this.categories._embedded.categories
    },err=>{
console.log(err);
    })
  }
 
  OnDeleteCategory(p){
    var val = confirm("Voulez-vous supprimer ce catégorie ?");

if( val == true ) {
  console.log(p)
  this.catalService.deleteResource(p, "/categories/delete/") .subscribe(
    data => {
      console.log(data);
      
  this.ngOnInit();
    },
    error => console.log(error));
       
} 
    
  }  
  updateCategory(category){
    this.catalService.setterCategory(category);
  
    this.router.navigate(['categories/register']);
    
  }
  newCategory(){
    let category = new Category();
    category.idCategory =0;
    this.catalService.setterCategory(category);
    this.router.navigate(['categories/register'])


  }
 
  
  
  

}
