import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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
    cid: 'string',
    name1: 'string',
    name2: 'string',
    title: 'string',
    address: 'string',
    street: 'string',
    city: 'string',
    pcode: 'string',
    state: 'string',
    country: 'string',
    tel: 'string',
    fax: 'string',
  };

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    // this.profileForm = formBuilder.group({
    //   cid: [this.form['cid']],
    //   name1: [this.form['name1']],
    //   name2: [this.form['name2']],
    //   title: [this.form['title']],
    //   address: [this.form['address']],
    //   street: [this.form['street']],
    //   city: [this.form['city']],
    //   pcode: [this.form['pcode']],
    //   state: [this.form['state']],
    //   country: [this.form['country']],
    //   tel: [this.form['tel']],
    //   fax: [this.form['fax']],
    // });
    this.profileService.get().subscribe((res: Profile) => {
      this.form = res;
      console.log(this.form);
    });
    // TODO: Populate FormBuilder with response data
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
    this.profileService
      .edit(this.profileForm.value)
      .subscribe((res) => console.log(res));
    this.isEditEnabled = false;
  }

  cancel(): void {
    this.profileForm.setValue(this.form);
    this.isEditEnabled = false;
  }
}
