import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected currentTime = signal(new Date());

  // Computed properties for dynamic content
  protected greeting = computed(() => {
    const hour = this.currentTime().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 21) return 'Good evening';
    return 'Good night';
  });

  protected timeOfDay = computed(() => {
    const hour = this.currentTime().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  });

  protected backgroundGradient = computed(() => {
    const timeOfDay = this.timeOfDay();
    switch (timeOfDay) {
      case 'morning':
        return 'from-orange-200 via-yellow-100 to-blue-200';
      case 'afternoon':
        return 'from-blue-300 via-blue-100 to-yellow-200';
      case 'evening':
        return 'from-orange-300 via-pink-200 to-purple-300';
      default: // night
        return 'from-indigo-900 via-purple-900 to-blue-900';
    }
  });

  protected user = this.authService.currentUser;

  ngOnInit(): void {
    // Update time every minute
    setInterval(() => {
      this.currentTime.set(new Date());
    }, 60000);
  }

  navigateToDiaries(): void {
    this.router.navigateByUrl('/diaries');
  }

  navigateToMemos(): void {
    this.router.navigateByUrl('/memos');
  }
}
