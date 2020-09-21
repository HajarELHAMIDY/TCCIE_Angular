import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  public rangs;
  public categories;
  public selectedOptionCat: string;
  public selectedOptionGamme: string;
  product: Product= new Product();
  submitted = false;
  op:boolean = false; 


  constructor(private catService: CatalogueService, private router:Router) { 
    
  }

  ngOnInit() {
    this.rangs = this.catService.getResource('/rangs').subscribe(data=>{
      this.rangs=data;
      this.rangs= this.rangs._embedded;
            },err=>{
      console.log(err);
            })
    this.categories = this.catService.getResource('/categories').subscribe(data=>{
      this.categories=data;
      this.categories = this.categories._embedded;
                    },err=>{
              console.log(err);
                    })
  }
  
  save() {

    this.catService.createProduct(this.product, this.selectedOptionCat,this.selectedOptionGamme, this.op)
      .subscribe(data => console.log(data), error => console.log(error));
   // this.product = new Product();
    this.router.navigate(['/products/1/0'])
   // location.reload();
  //  let p =this.route.snapshot.params.p1;
   //   this.getPath(p);
   
   
  }
  selectOption(name: string) {

    this.selectedOptionCat=name;
  
   
  }
  selectOptionGamme(name: string) {

    this.selectedOptionGamme=name;
   
  }
  onSubmit() {
   
    this.submitted = true;
    this.save();    
  }

}
