import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`api/employee/profile`);
  }

  edit(profileData) {
    return this.http.put('api/employee/profile', profileData);
  }
}
