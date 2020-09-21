import { Component, OnInit, Input } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() idOrderItem; 
  product; 
  constructor(public catalService:CatalogueService) { }

  ngOnInit() {
    this.catalService.getProductByOrder(this.idOrderItem).subscribe(data=>{
      this.product =data;
    })
  }

}
