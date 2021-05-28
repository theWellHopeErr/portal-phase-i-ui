import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  get() {
    return this.http.get(`api/customer/profile`);
  }

  edit(profileData) {
    return this.http.put('api/customer/profile', profileData);
  }

  createData(masterData) {
    return this.http.post('api/customer/master-data', masterData);
  }
}
