import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryService } from '../../../core/services/diary-service';
import { AuthService } from '../../../core/services/auth-service';
import { Diary } from '../../../types/diary';
import { ToastService, ActionButton, Chip, ThemedCard, LoadingSpinner, EmptyState } from '../../../shared';

type DiaryFilter = 'my' | 'shared' | 'public';

@Component({
  selector: 'app-diary-list',
  imports: [ActionButton, Chip, ThemedCard, LoadingSpinner, EmptyState],
  templateUrl: './diary-list.html',
  styleUrl: './diary-list.css'
})
export class DiaryList implements OnInit {
  private diaryService = inject(DiaryService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  protected allUserDiaries = signal<Diary[]>([]);
  protected allPublicDiaries = signal<Diary[]>([]);
  protected activeFilter = signal<DiaryFilter>('my');
  protected loading = signal(false);
  protected error = signal<string | null>(null);

  // Computed filtered diaries based on active filter
  protected filteredDiaries = computed(() => {
    const userDiaries = this.allUserDiaries();
    const publicDiaries = this.allPublicDiaries();
    const filter = this.activeFilter();
    const currentUser = this.authService.currentUser();

    switch (filter) {
      case 'my':
        return userDiaries;
      case 'shared':
        // Placeholder for shared diaries - will need backend support
        return [];
      case 'public':
        return publicDiaries;
      default:
        return userDiaries;
    }
  });

  // Computed counts for each section
  protected counts = computed(() => {
    const userDiaries = this.allUserDiaries();
    const publicDiaries = this.allPublicDiaries();
    return {
      my: userDiaries.length,
      shared: 0, // Placeholder
      public: publicDiaries.length
    };
  });

  ngOnInit(): void {
    this.loadUserDiaries();
    this.loadPublicDiaries();
  }

  protected loadDiaries() {
    this.loadUserDiaries();
    this.loadPublicDiaries();
  }

  private loadUserDiaries(): void {
    this.loading.set(true);
    this.error.set(null);

    this.diaryService.getDiaries().subscribe({
      next: (diaries) => {
        this.allUserDiaries.set(diaries);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load diaries. Please try again.');
        this.loading.set(false);
        this.toastService.error('Failed to load your diaries. Please check your connection.');
        console.error('Error loading diaries:', error);
      }
    });
  }

  private loadPublicDiaries(): void {
    this.loading.set(true);
    this.error.set(null);

    this.diaryService.getPublicDiaries().subscribe({
      next: (diaries) => {
        this.allPublicDiaries.set(diaries);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load public diaries. Please try again.');
        this.loading.set(false);
        this.toastService.error('Failed to load public diaries. Please check your connection.');
        console.error('Error loading public diaries:', error);
      }
    });
  }

  protected setFilter(filter: DiaryFilter): void {
    this.activeFilter.set(filter);
  }

  protected openDiary(diary: Diary): void {
    this.toastService.success(`Opening "${diary.title}"...`);
    if (diary.isPublic) {
      this.router.navigateByUrl(`/diary/public/${diary.id}`);
    } else {
      this.router.navigateByUrl(`/diary/${diary.id}`);
    }
  }

  protected createNewDiary(): void {
    // TODO: Implement create diary modal or navigate to create page
    this.toastService.info('Diary creation feature coming soon!', {
      duration: 3000,
      action: {
        text: 'Learn More',
        handler: () => console.log('Navigate to documentation')
      }
    });
  }

  protected formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  protected getEntryCount(diary: Diary): number {
    return diary.entries?.length || 0;
  }

  protected getAuthorName(diary: Diary): string {
    return diary.displayName || diary.userName || 'Unknown Author';
  }

  protected getAuthorInitial(diary: Diary): string {
    return this.getAuthorName(diary).charAt(0).toUpperCase();
  }
}
