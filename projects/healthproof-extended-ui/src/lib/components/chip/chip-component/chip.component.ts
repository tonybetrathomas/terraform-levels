import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() label: string = '';
  @Input() active: boolean = false;
  @Output() chipClick = new EventEmitter<void>();

  onClick(): void {
    this.chipClick.emit();
  }
}
