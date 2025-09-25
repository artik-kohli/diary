import { Component, inject } from '@angular/core';
import { ToastService, type Toast } from '../../core/services/toast.service';
import { ActionButton } from '../action-button/action-button';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
  imports: [ActionButton],
  standalone: true
})
export class ToastContainer {
  private toastService = inject(ToastService);

  protected toasts = this.toastService.activeToasts;

  protected dismiss(id: string) {
    this.toastService.dismiss(id);
  }

  protected executeAction(toast: Toast) {
    if (toast.action) {
      toast.action.handler();
      this.dismiss(toast.id);
    }
  }

  protected getToastClasses(type: Toast['type']): string {
    const baseClasses = 'alert transition-all duration-300 ease-in-out';
    const typeClasses = {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info'
    };
    return `${baseClasses} ${typeClasses[type]}`;
  }
}
