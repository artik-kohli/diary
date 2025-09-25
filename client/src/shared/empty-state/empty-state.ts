import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: './empty-state.html',
    styleUrl: './empty-state.css',
    standalone: true
})
export class EmptyState {
    title = input.required<string>();
    description = input.required<string>();
    actionText = input<string>();
    onAction = output<void>();
}