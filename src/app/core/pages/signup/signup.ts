import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../auth/auth';
import { SignupRequest } from '../../auth/auth-model';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private readonly authService = inject(Auth);
  protected readonly isLoading = signal(false);

  protected readonly form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const { firstName, lastName, email, password } = this.form.value;
    if (!email || !password) {
      return;
    }
    const request: SignupRequest = {
      firstName,
      lastName,
      email,
      password,
    };
    this.isLoading.set(true);
    this.authService.signup(request).subscribe({
      complete: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
