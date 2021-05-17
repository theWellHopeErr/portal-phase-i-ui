import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProfileService } from '../services/profile.service';
import { Profile } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditEnabled = false;
  loading = false;
  form: Profile = {
    cid: '',
    name1: '',
    name2: '',
    city: '',
    region: '',
    district: '',
    street: '',
    pcode: '',
    country: '',
    tel: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileService.get().subscribe((res: Profile) => {
      this.form = res;
      this.profileForm = this.formBuilder.group(this.form);
    });
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group(this.form);
  }

  edit(): void {
    this.isEditEnabled = true;
  }

  save(): void {
    this.loading = true;

    this.form = this.profileForm.value;
    this.profileService.edit(this.profileForm.value).subscribe((res) => {
      this.isEditEnabled = false;
      this.loading = false;
    });
  }

  cancel(): void {
    this.profileForm.setValue(this.form);
    this.isEditEnabled = false;
  }
}
