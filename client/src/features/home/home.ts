import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { ThemeService } from '../../core/services/theme.service';
import { ToastService, Chip, ActionButton, ThemedCard } from '../../shared';

@Component({
  selector: 'app-home',
  imports: [Chip, ActionButton, ThemedCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private authService = inject(AuthService);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private toastService = inject(ToastService);

  protected user = this.authService.currentUser;
  protected greeting = this.themeService.greeting;
  protected currentTheme = this.themeService.currentTheme;
  protected currentTime = this.themeService.getCurrentTime.bind(this.themeService);

  navigateToDiaries(): void {
    this.router.navigateByUrl('/diaries');
  }

  navigateToMemos(): void {
    this.router.navigateByUrl('/memos');
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  navigateToPublic(): void {
    this.router.navigateByUrl('/public');
  }

  // Demonstrate toast service
  showWelcomeToast(): void {
    this.toastService.success(`Welcome back, ${this.user()?.displayName}! Ready to write today?`, {
      duration: 6000,
      action: {
        text: 'Start Writing',
        handler: () => this.navigateToDiaries()
      }
    });
  }
}
