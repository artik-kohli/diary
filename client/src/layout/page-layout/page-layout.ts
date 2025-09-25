import { Component, input } from '@angular/core';

@Component({
    selector: 'app-page-layout',
    template: `
    <div class="min-h-screen bg-base-100">
      <ng-content select="[slot=header]"></ng-content>
      
      <div class="container mx-auto px-4"
           [class.py-6]="!customPadding()"
           [class.py-8]="!customPadding() && largePadding()">
        <ng-content></ng-content>
      </div>
      
      <ng-content select="[slot=footer]"></ng-content>
    </div>
  `,
    standalone: true
})
export class PageLayout {
    largePadding = input(false);
    customPadding = input(false);
}