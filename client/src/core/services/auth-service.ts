import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  private baseUrl = environment.apiUrl;

  constructor() {
    // Check for saved user on initialization
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', credentials).pipe(
      tap(user => {
        this.setCurrentUser(user);
      })
    )
  }

  register(credentials: RegisterCreds) {
    return this.http.post<User>(this.baseUrl + 'account/register', credentials).pipe(
      tap(user => {
        this.setCurrentUser(user);
      })
    )
  }

  logout() {
    // Clear user state immediately (JWT is stateless)
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);

    // Fire-and-forget call to server (optional cleanup)
    this.http.post(this.baseUrl + 'account/logout', {}).subscribe();
  }

  getToken() {
    return this.currentUser()?.token || null;
  }

  public setCurrentUser(user: User) {
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
