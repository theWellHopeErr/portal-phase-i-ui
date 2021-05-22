import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { SnackService } from '../snack.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  @Input() color: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackService: SnackService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate([`/${this.authService.currentUserValue.role}`]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [this.router.url.split('/')[1]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this.f.username.value.toUpperCase(),
        this.f.password.value,
        this.f.role.value
      )
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([`/${this.f.role.value}/dashboard`]);
          this.snackService.openSnackBar(`You're logged in!!`);
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error.message;
          this.loading = false;
        },
      });
  }
}
