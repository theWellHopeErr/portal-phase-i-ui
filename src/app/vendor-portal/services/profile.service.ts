import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`api/vendor/profile`);
  }

  edit(profileData) {
    return this.http.put('api/vendor/profile', profileData);
  }
}
