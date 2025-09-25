import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    dismissible?: boolean;
    action?: {
        text: string;
        handler: () => void;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts = signal<Toast[]>([]);

    // Expose as readonly signal
    readonly activeToasts = this.toasts.asReadonly();

    show(message: string, type: Toast['type'] = 'info', options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) {
        const toast: Toast = {
            id: this.generateId(),
            message,
            type,
            duration: options?.duration ?? 5000,
            dismissible: options?.dismissible ?? true,
            action: options?.action
        };

        this.toasts.update(toasts => [...toasts, toast]);

        // Auto-dismiss if duration is set
        if (toast.duration && toast.duration > 0) {
            setTimeout(() => {
                this.dismiss(toast.id);
            }, toast.duration);
        }

        return toast.id;
    }

    success(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) {
        return this.show(message, 'success', options);
    }

    error(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) {
        return this.show(message, 'error', { ...options, duration: options?.duration ?? 8000 });
    }

    warning(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) {
        return this.show(message, 'warning', options);
    }

    info(message: string, options?: Partial<Omit<Toast, 'id' | 'message' | 'type'>>) {
        return this.show(message, 'info', options);
    }

    dismiss(id: string) {
        this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
    }

    dismissAll() {
        this.toasts.set([]);
    }

    private generateId(): string {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
