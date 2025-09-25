import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiaryService } from '../../../core/services/diary-service';
import { EntryService } from '../../../core/services/entry-service';
import { Diary, DiaryUpdate } from '../../../types/diary';
import { Entry, CreateEntry } from '../../../types/entry';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'alphabetical';

@Component({
  selector: 'app-diary-detail',
  imports: [FormsModule],
  templateUrl: './diary-detail.html',
  styleUrl: './diary-detail.css'
})
export class DiaryDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private diaryService = inject(DiaryService);
  private entryService = inject(EntryService);

  // State signals
  protected diary = signal<Diary | null>(null);
  protected entries = signal<Entry[]>([]);
  protected loading = signal(false);
  protected error = signal<string | null>(null);

  // UI state
  protected viewMode = signal<ViewMode>('grid');
  protected searchTerm = signal('');
  protected selectedDate = signal<string | null>(null);
  protected sortBy = signal<SortOption>('newest');
  protected showNewEntryForm = signal(false);
  protected showEditDiaryForm = signal(false);
  protected showShareDialog = signal(false);

  // Form data
  protected newEntryContent = signal('');
  protected editDiaryTitle = signal('');

  // Computed properties
  protected filteredEntries = computed(() => {
    let filtered = this.entries();

    // Filter by search term
    const searchTerm = this.searchTerm().toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.content.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by selected date
    const selectedDate = this.selectedDate();
    if (selectedDate) {
      const targetDate = new Date(selectedDate).toDateString();
      filtered = filtered.filter(entry =>
        new Date(entry.createdAt).toDateString() === targetDate
      );
    }

    // Sort entries
    const sortBy = this.sortBy();
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'alphabetical':
          return a.content.toLowerCase().localeCompare(b.content.toLowerCase());
        default:
          return 0;
      }
    });

    return filtered;
  });

  protected entryStats = computed(() => {
    const entries = this.entries();
    const filtered = this.filteredEntries();

    return {
      total: entries.length,
      filtered: filtered.length,
      today: entries.filter(entry =>
        new Date(entry.createdAt).toDateString() === new Date().toDateString()
      ).length,
      thisWeek: entries.filter(entry => {
        const entryDate = new Date(entry.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
      }).length
    };
  });

  ngOnInit(): void {
    const diaryId = Number(this.route.snapshot.paramMap.get('id'));
    if (diaryId) {
      this.loadDiary(diaryId);
      this.loadEntries(diaryId);
    }
  }

  private loadDiary(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.diaryService.getDiary(id).subscribe({
      next: (diary) => {
        this.diary.set(diary);
        this.editDiaryTitle.set(diary.title);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load diary');
        this.loading.set(false);
        console.error('Error loading diary:', error);
      }
    });
  }

  private loadEntries(diaryId: number): void {
    this.entryService.getEntries(diaryId).subscribe({
      next: (entries) => {
        this.entries.set(entries);
      },
      error: (error) => {
        console.error('Error loading entries:', error);
      }
    });
  }

  protected toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'grid' ? 'list' : 'grid');
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
    this.selectedDate.set(null);
  }

  protected openNewEntryForm(): void {
    this.showNewEntryForm.set(true);
    this.newEntryContent.set('');
  }

  protected closeNewEntryForm(): void {
    this.showNewEntryForm.set(false);
    this.newEntryContent.set('');
  }

  protected createEntry(): void {
    const content = this.newEntryContent().trim();
    if (!content || !this.diary()) return;

    const newEntry: CreateEntry = {
      content: content
    };

    this.entryService.createEntry(this.diary()!.id, newEntry).subscribe({
      next: (entry) => {
        this.entries.update(entries => [entry, ...entries]);
        this.closeNewEntryForm();
      },
      error: (error) => {
        console.error('Error creating entry:', error);
      }
    });
  }

  protected openEditDiaryForm(): void {
    this.showEditDiaryForm.set(true);
  }

  protected closeEditDiaryForm(): void {
    this.showEditDiaryForm.set(false);
    this.editDiaryTitle.set(this.diary()?.title || '');
  }

  protected updateDiary(): void {
    const title = this.editDiaryTitle().trim();
    if (!title || !this.diary()) return;

    this.diaryService.updateDiary(this.diary()!.id, { title }).subscribe({
      next: () => {
        this.diary.set({ ...this.diary()!, title });
        this.closeEditDiaryForm();
      },
      error: (error) => {
        console.error('Error updating diary:', error);
      }
    });
  }

  protected togglePublicStatus(): void {
    if (!this.diary()) return;

    const isPublic = !this.diary()!.isPublic;
    this.diaryService.updateDiary(this.diary()!.id, { isPublic }).subscribe({
      next: () => {
        this.diary.set({ ...this.diary()!, isPublic });
      },
      error: (error) => {
        console.error('Error updating diary visibility:', error);
      }
    });
  }

  protected openShareDialog(): void {
    this.showShareDialog.set(true);
  }

  protected closeShareDialog(): void {
    this.showShareDialog.set(false);
  }

  protected openEntry(entry: Entry): void {
    this.router.navigateByUrl(`/diary/${this.diary()!.id}/e/${entry.id}`);
  }

  protected formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  protected formatTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  protected getEntryPreview(content: string, length: number = 150): string {
    return content.length > length ? content.substring(0, length) + '...' : content;
  }

  protected goBack(): void {
    this.router.navigateByUrl('/diaries');
  }
}
