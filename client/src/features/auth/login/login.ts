import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { TextInput, ActionButton, ToastService } from '../../../shared';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TextInput, ActionButton],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
  });

  isSubmitting = signal(false);
  errorMessage = signal('');

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.warning('Please fill in all required fields correctly.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toastService.success(`Welcome back, ${response.displayName}!`);
        this.router.navigateByUrl('/');
      },
      error: error => {
        const errorMsg = error.error || 'Invalid username or password';
        this.errorMessage.set(errorMsg);
        this.toastService.error(errorMsg);
        this.isSubmitting.set(false);
      }
    })
  }
}
