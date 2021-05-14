import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get('api/customer/profile');
  }

  edit(profileData) {
    console.log('asdasdasdasd');

    console.log(profileData);

    return this.http.put<any>('api/customer/profile', profileData);
  }
}
