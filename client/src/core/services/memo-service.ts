import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateMemo, Memo, UpdateMemo } from '../../types/memo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  getMemos() {
    return this.http.get<Memo[]>(this.baseUrl + 'memo');
  }

  getMemo(id: number) {
    return this.http.get<Memo>(this.baseUrl + `memo/${id}`);
  }

  createMemo(memo: CreateMemo) {
    return this.http.post
  }

  updateMemo(id: number, content: UpdateMemo) {
    return this.http.put(this.baseUrl + `memo/${id}`, content);
  }

  deleteMemo(id: number) {
    return this.http.delete(this.baseUrl + `memo/${id}`);
  }
}
