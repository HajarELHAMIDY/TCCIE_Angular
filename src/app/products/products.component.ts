import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthentificationService } from '../login/authentification.service';
import { Product } from '../model/product.model';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products; 
  private rangs;
 searchName : string="" ; 
  
  private editPhoto : boolean=false;
  public addCart : boolean = false; 
  private currentProduct :any;
  private selectedFile; 
  private progresse;
  private currentFileUpload; 
  private title: string;
  private timeStam : number=0;
  private categories;
  public currentCat = null;
  public currentRang;
  public data : Array<any>;
  public totalRecords : String;
  public page : Number =1;



  constructor(private catService: CatalogueService,private caddyService:CaddyService, private router:Router, private route:ActivatedRoute, public authService:AuthentificationService) {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url =val.url;
        let p =this.route.snapshot.params.p1;
       
   this.getPath(p);
      }
      
      


    });
    let p =this.route.snapshot.params.p1;
    if(p ==1){
      this.getProduits("/products");
    }

   }

  ngOnInit() {
   
    this.getCategories(); 
    this.getRangs();
    
  }
  
  public getCategories(){
    this.catService.getResource("/categories").subscribe(data=>{
      this.categories =data;
    
    });

  }
  public getRangs(){
    this.catService.getResource("/rangs").subscribe(data=>{
      this.rangs =data;
    
    });

  }
  /*  
  getProductByCat(c){
    this.currentCat = c ;
    let i=0; 
    for(let p of this.products._embedded.products ){
      if(p.catgory.idCategory == c.idCategory){
          i++; 
      }
    }

    this.totalRecords = i.toString();

  this.products = this.catService.getProduitsByCatRang(this.currentCat.idCategory, this.currentRang.idRang).subscribe(data=>{
      this.products =data;
     
    
    });
  }*/
  getProductByRang(c){

    this.currentRang = c ;
  
    this.router.navigateByUrl('products/3/'+c.idRang);
  }
  newProduct(): void {
 this.router.navigate(['/products/add']);
  
  }
  reloadData() {
    this.products = this.catService.getResource("/products");
  }


  
  uploadPhoto(){
    this.progresse =0;
    this.currentFileUpload = this.selectedFile.item(0);
    this.catService.uploadPhoto(this.currentFileUpload, this.currentProduct.idProduct,"/uploadPhoto/").subscribe(event => {
      if(event.type == HttpEventType.UploadProgress){
        this.progresse = Math.round(100*event.loaded/event.total);
      }else if (event instanceof HttpResponse){
        this.timeStam=Date.now();

      }

      },err=>{
        alert('Problème de chargement !! ')
    })
    this.selectedFile = undefined;



  }
  private getProduits(url){
    this.catService.getResource(url).subscribe(data=>{
      this.products=data;
      this.products= this.products._embedded.products;
      this.totalRecords= this.products.length;

    })
  }
  getTs(){
    return this.timeStam;
  }
  isAdmin(){
    return this.authService.isAdmin();
  }
  onProductDetails(p: Product){
    let url =btoa(p._links.product.href)
    this.router.navigateByUrl('product-details/'+url);



  }
  onAddProductToCaddy(p: Product){
  
    this.addCart=false;
  
    this.caddyService.addProductToCaddy(p, null);
     
    


  }
  OnEditPhoto(p){
   
    this.currentProduct = p; 
    this.editPhoto =!this.editPhoto;
  }
  onAddToCard(p){
    this.currentProduct = p; 
    this.addCart=!this.addCart;
   
  }
  OnDeleteProduct(p){
    var val = confirm("Voulez-vous supprimer ce produit ?");

if( val == true ) {
  this.catService.deleteResource(p.idProduct, "/products/delete/") .subscribe(
    data => {
    
      let p =this.route.snapshot.params.p1;
      this.getPath(p);
   
    },
    error => console.log(error));
       
} 
    
  }
  getPath(p){
    
    if(p ==1){
      
      this.title="La liste des produits"
      this.getProduits("/products");
    }
    else if(p==2){
  
    }
    else if(p==3){
      this.title="La liste des produits"
      let pr=this.route.snapshot.params.p2;
      this.getProduits("/rangs/"+pr+'/products');
    }
    else if(p==4){
      this.title="Les produits disponibles"
      let pcat=this.route.snapshot.params.p2;
      this.getProduits("/products/dispoProduct");
    }
    
  }
  onSelectedFile(event){
    this.selectedFile = event.target.files; 
  }
 


}
