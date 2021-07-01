import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { SnackService } from 'src/app/shared/snack.service';
import { ProfileService } from '../services/profile.service';
import { Profile } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private snackService: SnackService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Profile | Employee Portal');
    this.profileService.get().subscribe((res: Profile) => {
      this.form = res;
      this.profileData = res;
      this.profileForm = this.formBuilder.group(this.form);
      this.formLoading = false;
    });
  }

  profileForm: FormGroup;
  isEditEnabled = false;
  saveLoading = false;
  formLoading = true;
  panelOpenState = false;
  profileData;
  form: Profile = {
    eid: '',
    name1: '',
    name2: '',
    title: '',
    address: '',
    city: '',
    region: '',
    p_code: '',
    nationality: '',
    tel: '',
  };

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group(this.form);
  }

  edit(): void {
    this.isEditEnabled = true;
  }

  save(): void {
    this.saveLoading = true;

    this.form = this.profileForm.value;
    this.profileService.edit(this.profileForm.value).subscribe((res) => {
      this.isEditEnabled = false;
      this.saveLoading = false;
      this.snackService.openSnackBar(`Profile Updated!!`);
    });
  }

  cancel(): void {
    this.profileForm.setValue(this.form);
    this.isEditEnabled = false;
  }
}
