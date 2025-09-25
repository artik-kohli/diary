import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth-service';
import { ThemeService, type TimeOfDay } from '../../core/services/theme.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected authService = inject(AuthService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  protected currentTheme = this.themeService.currentTheme;
  protected allThemes = this.themeService.getAllThemes();
  protected availableThemes = ['morning', 'afternoon', 'evening', 'night'] as TimeOfDay[];

  // Dropdown state management
  protected isDropdownOpen = signal(false);
  private hoverTimeout: number | null = null;
  private readonly HOVER_DELAY = 300; // milliseconds

  handleSelectTheme(timeOfDay: TimeOfDay) {
    // We can't force time-based themes, but we can show current theme info
    // In a future update, we could add manual theme override functionality
  }

  toggleDropdown() {
    this.isDropdownOpen.update(isOpen => !isOpen);
  }

  closeDropdown() {
    this.clearHoverTimeout();
    this.isDropdownOpen.set(false);
  }

  onMouseEnter() {
    this.clearHoverTimeout();
    this.isDropdownOpen.set(true);
  }

  onMouseLeave() {
    this.clearHoverTimeout();
    this.hoverTimeout = window.setTimeout(() => {
      this.isDropdownOpen.set(false);
    }, this.HOVER_DELAY);
  }

  private clearHoverTimeout() {
    if (this.hoverTimeout !== null) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  navigateTo(path: string) {
    this.router.navigateByUrl(path);
  }

  navigateToAndClose(path: string) {
    this.closeDropdown();
    this.navigateTo(path);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  logoutAndClose() {
    this.closeDropdown();
    this.logout();
  }
}
