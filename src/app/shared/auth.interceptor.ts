import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { SnackService } from './snack.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackService: SnackService
  ) {}

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

    return next.handle(req).pipe(
      catchError((error) => {
        this.snackService.openSnackBar(
          `Error ${error.status}: ${error.error.message}`
        );
        return throwError(error.message);
      })
    );
  }
}
