import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DiaryService } from '../../../core/services/diary-service';
import { AuthService } from '../../../core/services/auth-service';
import { Diary } from '../../../types/diary';

type DiaryFilter = 'my' | 'shared' | 'public';

@Component({
  selector: 'app-diary-list',
  imports: [],
  templateUrl: './diary-list.html',
  styleUrl: './diary-list.css'
})
export class DiaryList implements OnInit {
  private diaryService = inject(DiaryService);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected allDiaries = signal<Diary[]>([]);
  protected activeFilter = signal<DiaryFilter>('my');
  protected loading = signal(false);
  protected error = signal<string | null>(null);

  // Computed filtered diaries based on active filter
  protected filteredDiaries = computed(() => {
    const diaries = this.allDiaries();
    const filter = this.activeFilter();
    const currentUser = this.authService.currentUser();

    switch (filter) {
      case 'my':
        // For now, assume all fetched diaries are user's own diaries
        // This logic can be enhanced when user ownership info is added to Diary model
        return diaries.filter(diary => !diary.isPublic);
      case 'shared':
        // Placeholder for shared diaries - will need backend support
        return [];
      case 'public':
        return diaries.filter(diary => diary.isPublic);
      default:
        return diaries;
    }
  });

  // Computed counts for each section
  protected counts = computed(() => {
    const diaries = this.allDiaries();
    return {
      my: diaries.filter(diary => !diary.isPublic).length,
      shared: 0, // Placeholder
      public: diaries.filter(diary => diary.isPublic).length
    };
  });

  ngOnInit(): void {
    this.loadDiaries();
  }

  protected loadDiaries(): void {
    this.loading.set(true);
    this.error.set(null);

    this.diaryService.getDiaries().subscribe({
      next: (diaries) => {
        this.allDiaries.set(diaries);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load diaries. Please try again.');
        this.loading.set(false);
        console.error('Error loading diaries:', error);
      }
    });
  }

  protected setFilter(filter: DiaryFilter): void {
    this.activeFilter.set(filter);
  }

  protected openDiary(diary: Diary): void {
    this.router.navigateByUrl(`/diary/${diary.id}`);
  }

  protected createNewDiary(): void {
    // TODO: Implement create diary modal or navigate to create page
    console.log('Create new diary');
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
}
