import { NgIf } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'hpx-progress-spinner',
  standalone: true,
  imports: [ MatProgressSpinnerModule, NgIf ],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() value?: number;
  @Input() diameter?: number = 100;
  @Input() strokeWidth?: number = 10;
  @Input() message: string = 'Loading...'
  @Input() isOverlayNeeded: boolean = false;

  @HostBinding('class.is-overlay') get isOverlayClass(): boolean {
    return this.isOverlayNeeded;
  }
}
