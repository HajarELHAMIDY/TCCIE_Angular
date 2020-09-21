import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthentificationService, AuthResponseData } from './authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  connected = false;
  message=""; 
  constructor(private authService: AuthentificationService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    form.form.disable();
    const email = form.value.email;
    const password = form.value.pwd;

    let authObs: Observable<AuthResponseData>;
    authObs = this.authService.login(email, password);

    authObs.subscribe(
      resData => {
      
        this.connected = false;
        this.message = ""
        this.router.navigate(['']);
      },
      errorMessage => {
        this.connected = true;
        form.form.enable();
        form.reset();
this.message=errorMessage; 
      }
    );


  }
}
