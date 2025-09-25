import { Component, input } from '@angular/core';

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.html',
    styleUrl: './loading-spinner.css',
    standalone: true
})
export class LoadingSpinner {
    size = input<LoadingSize>('lg');
}