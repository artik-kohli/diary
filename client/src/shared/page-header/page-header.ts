import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.html',
    styleUrl: './page-header.css',
    standalone: true
})
export class PageHeader {
    title = input.required<string>();
    subtitle = input<string>();
    showBackButton = input(false);
    showBorder = input(true);
    showAction = input(false);
    onBack = output<void>();
}