import { Component, OnInit } from '@angular/core';
import { Reseller } from '../model/reseller.model';
import { CatalogueService } from '../catalogue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reseller',
  templateUrl: './reseller.component.html',
  styleUrls: ['./reseller.component.css']
})
export class ResellerComponent implements OnInit {
  public resellers;
  public reseller : Reseller= new Reseller();
  private timeStam : number=0;
  private editPhoto : boolean = false;;
  private selectedFile; 
  private currentFileUpload; 
  currentReseller; 
  searchReseller : string="";
  public totalRecords : String;
  public page : Number =1;
  constructor(private catalService:CatalogueService, private router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.catalService.getResource("/resellers?size=100")
    .subscribe(data=>{
this.resellers=data;
this.resellers = this.resellers._embedded.resellers; 
this.totalRecords= this.resellers.length;
console.log("taille : "+this.totalRecords)
    },err=>{
console.log(err);
    })
 
  }
  getTs(){
    return this.timeStam;
  }
  OnDeleteReseller(p){
    var val = confirm("Voulez-vous supprimer ce revendeur ?");

if( val == true ) {
 
  this.catalService.deleteResource(p, "/resellers/delete/") .subscribe(
    data => {
      console.log(data);
      this.ngOnInit();
    },
    error => console.log(error));
       
} 
    
  }  
  updateReseller(reseller){
    this.catalService.setterReseller(reseller);
  
    this.router.navigate(['resellers/register']);
    
  }
  newReseller(){
    let reseller = new Reseller();
    reseller.idReseller =0;
    this.catalService.setterReseller(reseller);
    this.router.navigate(['resellers/register'])


  }
  OnEditPhoto(p){
   
    this.currentReseller = p; 
    this.editPhoto =!this.editPhoto;
  }
  onSelectedFile(event){
    this.selectedFile = event.target.files; 
  }
  uploadPhoto(){
    
    this.currentFileUpload = this.selectedFile.item(0);
    this.catalService.uploadPhoto(this.currentFileUpload, this.currentReseller.idReseller,"/uploadPhotoReseller/").subscribe(event => {
      if(event.type == HttpEventType.UploadProgress){
   
      }else if (event instanceof HttpResponse){
        this.timeStam=Date.now();

      }

      },err=>{
        alert('Problème de chargement !! ')
    })
    this.selectedFile = undefined;



  }

}
