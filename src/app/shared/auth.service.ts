import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {}

  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('token'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, role: string) {
    return this.http
      .post<any>(`api/login`, {
        username,
        password,
        role,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('token', JSON.stringify(user));
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
