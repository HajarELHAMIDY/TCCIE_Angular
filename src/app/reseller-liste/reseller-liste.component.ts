import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-reseller-liste',
  templateUrl: './reseller-liste.component.html',
  styleUrls: ['./reseller-liste.component.css']
})
export class ResellerListeComponent implements OnInit {
  public resellers; 
  private timeStam : number=0;
  public totalRecords : String;
  public page : Number =1;
  constructor( public catService : CatalogueService) { 
    this.catService.getResource("/resellers?size=100").subscribe(data=>{
      this.resellers=data;
      this.resellers = this.resellers._embedded.resellers; 
this.totalRecords= this.resellers.length;
console.log("taille : "+this.totalRecords)
      
    })
  }
  getTs(){
    return this.timeStam;
  }
  ngOnInit() {
  }

}
