import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application / json',
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
