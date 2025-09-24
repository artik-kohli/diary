import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateDiary, Diary, UpdateDiary } from '../../types/diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl

  getDiaries() {
    return this.http.get<Diary[]>(this.baseUrl + 'diary');
  }

  getDiary(id: number) {
    return this.http.get<Diary>(this.baseUrl + `diary/${id}`);
  }

  createDiary(diary: CreateDiary) {
    return this.http.post<Diary>(this.baseUrl + 'diary', diary);
  }

  updateDiary(id: number, diary: UpdateDiary) {
    return this.http.put<Diary>(this.baseUrl + `diary/${id}`, diary);
  }

  deleteDiary(id: number) {
    return this.http.delete(this.baseUrl + `diary/${id}`);
  }

}
