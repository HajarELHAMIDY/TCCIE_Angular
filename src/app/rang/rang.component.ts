import { Component, OnInit } from '@angular/core';
import { Rang } from '../model/rang.model';
import { CatalogueService } from '../catalogue.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rang',
  templateUrl: './rang.component.html',
  styleUrls: ['./rang.component.css']
})
export class RangComponent implements OnInit {

  public rangs;
  public rang : Rang= new Rang();
  searchRang: string = ""; 

  constructor(private catalService:CatalogueService, private router : Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.catalService.getResource("/rangs")
    .subscribe(data=>{
this.rangs=data;
this.rangs = this.rangs._embedded.rangs;
    },err=>{
console.log(err);
    })
  }
 
  OnDeleteRang(p){
    var val = confirm("Voulez-vous supprimer cette gamme ?");

if( val == true ) {
  console.log(p)
  this.catalService.deleteResource(p, "/rangs/delete/") .subscribe(
    data => {
      console.log(data);
      this.ngOnInit();
    },
    error => console.log(error));
       
} 
    
  }  
  updateRang(rang){
    this.catalService.setterRang(rang);
  
    this.router.navigate(['rangs/register']);
    
  }
  newRang(){
    let rang = new Rang();
    rang.idRang =0;
    this.catalService.setterCategory(rang);
    this.router.navigate(['rangs/register'])


  }
}
