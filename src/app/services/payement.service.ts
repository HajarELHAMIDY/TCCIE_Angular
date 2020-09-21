import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { TokenPayement } from '../model/token.payement.model';

@Injectable({
  providedIn: 'root'
})
export class PayementService {
  host : String = "http://localhost:8080"
  token : TokenPayement = new TokenPayement();  

  constructor(private http : HttpClient) { }
  makePaymentPaypal (sum){ 
    console.log(sum)
    return this.http.post(this.host+'/paypal/payment',sum); 
  }
  completePayment (paymentId, payerId)  { 
   return this.http.post ( this.host + '/complete/payment?paymentId='+ paymentId +'&payerId=' + payerId, {})
   .pipe(map((response: Response) => response.json ()));  
   
  }

  chargeCard (token: string, sum) { 
   
    this.token.token=token; 
    
    this.token.montant = sum; 
     
    const headers = new HttpHeaders({'token': token,'montant': sum}); 
    this .http.post ('http://localhost:8080/payment/charge', this.token) 
      .subscribe (resp => { 
        console.log (resp); 
      }) 
  }
}
