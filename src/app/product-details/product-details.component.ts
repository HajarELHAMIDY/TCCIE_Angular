import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model';
import { AuthentificationService } from '../login/authentification.service';
import { CaddyService } from '../services/caddy.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  currentProduct : Product;
  editPhoto:boolean;
  selectedFile;
  progresse: number;
  currentFileUpload;
  currentTime:number=0;
  mode:number=0;
  public rangs;
  public categories;
  public selectedOptionCat: string;
  public selectedOptionGamme: string;
  product : Product; 
  cat ;
  rang;
  submitted = false;
  changedCat : Boolean= false; 
  changedRang : Boolean = false ;
  option: boolean;
  optionP: string;
  options; 


  constructor(private router:Router,private route : ActivatedRoute,
    public caddyService: CaddyService, public authService: AuthentificationService, public catalService : CatalogueService) { }

  ngOnInit() {
    let url = atob(this.route.snapshot.params.url);
    this.catalService.getProduct(url).subscribe(data=>{
      this.currentProduct = data;
    })
    this.rangs = this.catalService.getResource('/rangs').subscribe(data=>{
      this.rangs=data;
      this.rangs=this.rangs._embedded; 
            },err=>{
      console.log(err);
            })
    this.categories = this.catalService.getResource('/categories').subscribe(data=>{
      this.categories=data;
      this.categories = this.categories._embedded;
                    },err=>{
              console.log(err);
                    }); 
    this.options = this.catalService.getResource('/optionPs').subscribe(data=>{
      this.options = data; 
      this.options=this.options._embedded;

      console.log(this.options)
   

    });

  }
 
  uploadPhoto(){
    this.progresse =0;
    this.currentFileUpload = this.selectedFile.item(0);
    console.log(this.currentProduct.idProduct);
    this.catalService.uploadPhoto(this.currentFileUpload, this.currentProduct.idProduct,"/uploadPhoto/").subscribe(event => {
      if(event.type == HttpEventType.UploadProgress){
        this.progresse = Math.round(100*event.loaded/event.total);
      }else if (event instanceof HttpResponse){
        this.currentTime=Date.now();
        this.editPhoto = false;
      }
      },err=>{
        alert('Problème de chargement !! ');
    })
    this.selectedFile = undefined;



  }
  onSelectedFile(event){
    this.selectedFile = event.target.files; 
  }
  onEditPhoto(p){
  
    this.currentProduct = p; 
    this.editPhoto =!this.editPhoto;
    
  }
  
  onAddProductToCaddy(p:Product){
       
      this.caddyService.addProductToCaddy(p, this.optionP);
    
  }
  getTS(){

    return this.currentTime;
  }
  onEditProduct(){
   
    this.mode =1;
   
    this.cat = this.catalService.getCategory(this.currentProduct).subscribe
    (data=>{
      this.cat = data;

      this.currentProduct.category= this.cat;

    
    }
      )

      this.rang = this.catalService.getRang(this.currentProduct).
      subscribe(data=>{
        this.rang = data;
  
        this.currentProduct.rang= this.rang;

  
      },err=>{
          console.log(err);
        }
        )
  }
  onUpdateProduct(data){
   console.log(this.currentProduct.opt)
    if(this.changedRang ==false){
 
      this.selectedOptionGamme = this.currentProduct.rang.nameRang;
    
    }
   
    if(this.changedCat == false && this.currentProduct.category!=null){
      this.selectedOptionCat = this.currentProduct.category.nameCategory;

    }
  
 
    this.catalService.updateProduct( this.selectedOptionCat,this.selectedOptionGamme, this.currentProduct)
    .subscribe(data => console.log(data), error => console.log(error));
  this.mode=0; 
location.reload();

  }
  selectOption(name: string) {

    this.changedCat = true;
 
    this.selectedOptionCat=name;
   
  }
  selectOptionGamme(name: string) {
    this.changedRang = true ; 
 
    this.selectedOptionGamme=name;
   
  }
  selectOptionPs(name){
    this.option=true; 

 this.optionP = name;
 console.log(this.optionP)

  }
 
}
