import { Component, inject, signal } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { TextInput } from "../../../shared/text-input/text-input";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
  });

  isSubmitting = signal(false);
  errorMessage = signal('');

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: error => {
        this.errorMessage.set(error.error || 'Invalid username or password');
        this.isSubmitting.set(false);
      }
    })
  }
}
