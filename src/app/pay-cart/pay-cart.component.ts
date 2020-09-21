import { Component, OnInit } from '@angular/core';
import { PayementService } from '../services/payement.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-pay-cart',
  templateUrl: './pay-cart.component.html',
  styleUrls: ['./pay-cart.component.css']
})
export class PayCartComponent implements OnInit {
   constructor(public payementService : PayementService, public orderService:OrderService) { }
  ngOnInit() {
  }
  chargeCreditCard () { 
    let form = document.getElementsByTagName ("form") [0]; 
    (< any > window).Stripe.card.createToken ({ 
      number: form.cardNumber.value, 
      exp_month: form.expMonth.value, 
      exp_year: form.expYear.value, 
      cvc: form.cvc.value 
    }, (status: number , response: any ) => { 
      if (status === 200) { 
        let token = response.id; 
        this.payementService.chargeCard(token, this.orderService.getTotal()); 
      } else { 
        console.log (response.error.message); 
      } 
    }); 
  }

}
