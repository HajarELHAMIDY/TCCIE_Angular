import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthentificationService } from './authentification.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
  constructor(private authService: AuthentificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone(
          {
            setHeaders: {
              Authorization: "tccie "+user.token
            },
          }
        );
        return next.handle(modifiedReq);
      })
    );
  }
}
