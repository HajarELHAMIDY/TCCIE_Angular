import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './model/product.model';
import { ProductDetails } from './model/product.datails.model';
import { Category } from './model/category.model';
import { Rang } from './model/rang.model';
import { Reseller } from './model/reseller.model';

import { ClientDetails } from './model/client.details.model';
import { Client } from './model/client.model';
import { AuthResponseData, AuthentificationService } from './login/authentification.service';
import { tap } from 'rxjs/operators';
import { User } from './login/user.model';
import { OrderC } from './model/orderc.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:String = "http://localhost:8080"
  private productDetails : ProductDetails = new ProductDetails();
  private clientDetails : ClientDetails = new ClientDetails(); 
  private category : Category  = new Category();
  private rang :Rang = new Rang();
  private reseller : Reseller = new Reseller();
  private order : OrderC = new OrderC();
 
  public activeH  :boolean =true; 
  public activeP :boolean; 
  constructor(private http:HttpClient,private authService:AuthentificationService, private router:Router) {

   }
   public getResource(url){
     return this.http.get(this.host+url)

     
   }
   onSelectedProduct(){
    this.activeP = true; 
    this.activeH = false;
  
      this.router.navigateByUrl("/products/1/0");
    }
   
   public deleteResource(id: number, url){
    return this.http.delete(this.host+url+id,  { responseType: 'text' });

   }
   public getProduct(url): Observable<Product>{
    return this.http.get<Product>(url);

    
  }/*
  getProduitsByCatRang (idCat, idRang) : Observable<Object> {
    this.filte.id1 = idRang;
    this.filte.id2 = idCat; 
    return this.http.post(this.host+"/productsFiltre", this.filte);
    
  }*/
  public getCategory(p) {
    return this.http.get(p._links.category.href);
  }

  public getRang(p){
    console.log(p._links.rang.href)
    return this.http.get(p._links.rang.href);
  }
  public getVille(p){
  
    return this.http.get(p._links.ville.href);
  }
   uploadPhoto(file : File, idProduct, url):Observable<HttpEvent<{}>>{

    let formdata : FormData = new FormData();
    formdata.append('file', file);
    const req   = new HttpRequest('POST',this.host+url+idProduct,formdata,{
      reportProgress : true, 
      responseType:'text'

    }); 
    return this.http.request(req);


   }
   deleteProduct(p : Product){
     let idProduct = p.idProduct;

    return this.http.delete(this.host+'/products/delete/'+idProduct, { responseType: 'text' });

   }
   
  createProduct(product: Product, nameCat :string, nameGamme : string, op:boolean): Observable<Object> {
   
    this.productDetails.p = product;
   this.productDetails.op = op; 
    this.productDetails.category = nameCat;
    this.productDetails.gamme= nameGamme;

    
    return this.http.post(this.host+'/products/add', this.productDetails);
  }
  
  createClient(client, login, ville): Observable<AuthResponseData> {
    this.clientDetails.client = client; 
    this.clientDetails.login = login; 
    this.clientDetails.ville =ville; 
   
        
    return this.http.post<AuthResponseData>(this.host+'/registerUser', this.clientDetails).pipe(
      tap(resData => {
        this.handleAuthentication(
          resData.user_id,
          resData.token,
          resData.expiration

        );
      })
    );
  }
  private handleAuthentication(
    userId: number,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.autoLogin();
  }

  updateProduct(nameCat : string, nameG : string, product: Product): Observable<Object> {
   
    this.productDetails.p = product;
    this.productDetails.category = nameCat;
    this.productDetails.gamme= nameG;
    console.log("test test update")
  
    return this.http.put(this.host+'/products/update', this.productDetails);
  }

  updateResource(url,object): Observable<Object> {
    
  
    return this.http.put(this.host+url,object);
  }
  registerResource(object, url): Observable<Object>{
   console.log(object)
    return this.http.post(this.host+url,object);

  }
  updateOptionProduct(name, p){
    
  }
  getOrderItems(id){
   
    return this.http.get(this.host+"/orderCs/"+id+"/orderItems"); 
  }
  getOrder(id){

    return this.http.get(this.host+"/orderCs/"+id); 
  }
  getProductByOrder(id){
    return this.http.get(this.host+"/orderItemses/"+id+"/product"); 
  }
  getClientByOrder(id){
    return this.http.get(this.host+"/orderCs/"+id+"/client"); 
  } 
  // getters and setters 
  setterCategory (category){
    this.category = category;
  }
  getterCategory(){
    return this.category;
  }
  setterRang (rang){
    this.rang = rang;
  }
  getterRang(){
    return this.rang;
  }

  setterReseller(reseller){
    this.reseller = reseller;
  }
  getterReseller(){
    return this.reseller;
  }
  setterOrder(order){
    this.order = order;
  }
  getterOrder(){
    return this.order;
  }
}
