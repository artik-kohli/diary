import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateEntry, Entry, UpdateEntry } from '../../types/entry';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  getEntries(diaryId: number) {
    return this.http.get<Entry[]>(this.baseUrl + `entry/${diaryId}`);
  }

  getPublicEntries(diaryId: number) {
    return this.http.get<Entry[]>(this.baseUrl + `entry/public/${diaryId}`);
  }

  getEntry(id: number) {
    throw new Error('Method not implemented.');
    // implement this!
    // return this.http.get<Entry>(this.baseUrl + ``)
  }

  createEntry(diaryId: number, entry: CreateEntry) {
    return this.http.post<Entry>(this.baseUrl + `entry/${diaryId}`, entry);
  }

  updateEntry(id: number, content: UpdateEntry) {
    return this.http.put(this.baseUrl + `entry/${id}`, content)
  }

  deleteEntry(id: number) {
    return this.http.delete(this.baseUrl + `entry/${id}`);
  }
}
