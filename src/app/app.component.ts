import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from './login/authentification.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  private categories;
  public currentCat;
  
  public activeG :boolean; 
  public activeR:boolean; 
  public menu = false; 
  
  constructor(private catService : CatalogueService, public caddyService:CaddyService, private router:Router, private authService : AuthentificationService){


  }
  ngOnInit(): void {
    this.authService.autoLogin();

  }
  activeMenu(){
 
    this.menu=!this.menu;
  }
  private getCategories(){
    this.catService.getResource("/categories").subscribe(data=>{
      this.categories =data;
    });

  }
  getProductByCat(c){
    this.currentCat = c ;
    this.router.navigateByUrl('products/2/'+c.idCategory);
  }
 
  atHome(){
    this.catService.activeP = false; 
    this.catService.activeH = true;
    this.activeG = false;
    this.activeR = false;
  }
  atCaddy(){
    this.catService.activeP = false; 
    this.catService.activeH = false;
    this.activeG = false;
    this.activeR = false;
  }
  atResellers(){
    this.catService.activeP = false; 
    this.catService.activeH = false;
    this.activeG = false;
    this.activeR = true;
  }
  atGestion(){
    this.catService.activeP = false; 
    this.catService.activeH = false;
    this.activeG = true;
    this.activeR = false;
  }
  onProductPromotion(){
  
    this.router.navigateByUrl('products/3/0');

  }
  onProductDispo(){
  
    this.router.navigateByUrl('products/4/0');

  }
  isAdmin(){
    return this.authService.isAdmin();
    return true;
  }
  onLogin(){
    // this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
  onLogout(){
    this.authService.logout();

  }
 
}
