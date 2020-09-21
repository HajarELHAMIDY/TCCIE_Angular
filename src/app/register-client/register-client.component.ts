import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Client } from '../model/client.model';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css']
})
export class RegisterClientComponent implements OnInit {
  public client : Client = new Client();
  public login : Login = new Login();
  message; 
  pwd : string = ""; 
  mode =0;
  public villes; 
  public selectedOptionVille: string;
  constructor(public catalService : CatalogueService, private router : Router) { }

  ngOnInit() {
    this.catalService.getResource("/villes").subscribe(
      data=> {
        this.villes = data;
        this.villes = this.villes._embedded; 
      },err=>{
        console.log(err);
              })
  }
  selectOptionVille(name: string) {

    this.selectedOptionVille=name;
  
   
  }
  registerClient(){
    this.login.email = this.client.email
   
  if(this.pwd == this.login.pwd){
    this.mode=0;
    this.catalService.createClient(this.client,this.login, this.selectedOptionVille)
   .subscribe((data)=> this.message =data);

this.router.navigate(['/home']);
  }else{
    this.mode=1;
  }

  }
    
}
