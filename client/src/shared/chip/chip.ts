import { Component, input, output } from '@angular/core';

export type ChipVariant = 'default' | 'success' | 'info' | 'warning' | 'error' | 'neutral' | 'ghost';
export type ChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.html',
  styleUrl: './chip.css',
  standalone: true
})
export class Chip {
  text = input.required<string>();
  variant = input<ChipVariant>('default');
  size = input<ChipSize>('md');
  removable = input(false);
  disabled = input(false);
  onRemove = output<void>();
}
