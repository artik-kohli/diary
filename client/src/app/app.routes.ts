import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { Login } from '../features/auth/login/login';
import { Register } from '../features/auth/register/register';
import { DiaryList } from '../features/diary/diary-list/diary-list';
import { DiaryDetail } from '../features/diary/diary-detail/diary-detail';
import { EntryDetail } from '../features/entry/entry-detail/entry-detail';
import { MemoList } from '../features/memo/memo-list/memo-list';
import { MemoDetail } from '../features/memo/memo-detail/memo-detail';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    // Public routes
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    // Protected routes
    {
        path: '',
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: Home },
            { path: 'diaries', component: DiaryList },
            { path: 'diary/:id', component: DiaryDetail },
            { path: 'diary/:diaryId/e/:entryId', component: EntryDetail },
            { path: 'memos', component: MemoList },
            { path: 'memo/:id', component: MemoDetail },
            { path: '**', redirectTo: '/home' }
        ]
    }
    
];
