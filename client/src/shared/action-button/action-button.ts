import { Component, input, output } from '@angular/core';

export type ActionButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
export type ActionButtonSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.html',
    styleUrl: './action-button.css',
    standalone: true
})
export class ActionButton {
    text = input.required<string>();
    variant = input<ActionButtonVariant>('primary');
    size = input<ActionButtonSize>('md');
    wide = input(false);
    disabled = input(false);
    loading = input(false);
    loadingText = input<string>();
    onClick = output<void>();
}