import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, TitleCasePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  protected authService = inject(AuthService);
  private router = inject(Router);
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'dark');
  protected themes = themes;

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectTheme(theme: string) {
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
