import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';
import { Client } from '../model/client.model';

export interface AuthResponseData {
  user_id: number;
  token: string;
  expiration: number;
  
}

@Injectable({ providedIn: 'root' })
export class AuthentificationService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private link: string="http://127.0.0.1:8080/tccie/authentification";
  private host : string ="http://127.0.0.1:8080/"
  private  userAuth : Client; 
  constructor(private http: HttpClient, private router: Router) {
    
  }
  
  getUserId(id: number){
    return this.http.get<Client>(this.host+"clients/"+id);
  }
  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.link,
        {
          email: username,
          pwd: password
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
        
          this.handleAuthentication(
            resData.user_id,
            resData.token,
            resData.expiration

          );
          this.getUserId( resData.user_id).subscribe(data=>{
            this.userAuth = data;
          });
        })
      );
  }

  autoLogin() {
    const userData: {
      id: number;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      this.getUserId( loadedUser.id).subscribe(data=>{
        this.userAuth = data;
      });
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    location.reload();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      this.userAuth = null; 
    }, expirationDuration);
  }

  private handleAuthentication(
    userId: number,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Mauvaises authentifications';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
  public isAdmin(){
    if(this.userAuth){
      if(this.userAuth.rolesUser.indexOf('ADMIN')>-1){
        return true;
      }
    }
    return false; 
  }
}

