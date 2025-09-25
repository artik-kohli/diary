import { Component, input, output } from '@angular/core';

export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
    selector: 'app-themed-card',
    templateUrl: './themed-card.html',
    styleUrl: './themed-card.css',
    standalone: true
})
export class ThemedCard {
    size = input<CardSize>('md');
    hoverable = input(true);
    onClick = output<void>();
}