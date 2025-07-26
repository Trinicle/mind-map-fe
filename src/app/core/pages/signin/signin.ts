import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../auth/auth';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../auth/auth-model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private readonly authService = inject(Auth);
  protected readonly isLoading = signal(false);

  protected readonly form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const { email, password } = this.form.value;
    if (!email || !password) {
      return;
    }
    const request: LoginRequest = { email, password };
    this.isLoading.set(true);
    this.authService.login(request).subscribe({
      complete: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
