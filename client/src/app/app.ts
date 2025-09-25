import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";
import { ThemeService } from '../core/services/theme.service';
import { ToastContainer } from '../shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
  private themeService = inject(ThemeService); // Initialize theme service
}
