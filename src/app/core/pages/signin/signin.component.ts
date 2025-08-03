import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { SigninRequest } from '../../auth/auth-model';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private readonly authService = inject(AuthService);
  readonly isLoading = signal(false);

  readonly form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const { email, password } = this.form.value;
    if (!email || !password) {
      return;
    }
    const request: SigninRequest = { email, password };
    this.isLoading.set(true);
    this.authService.signin(request).subscribe({
      complete: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
