import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [FormsModule, MatButtonToggleModule],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent {
  @Input() selectedValue!: string;
  @Output() toggleValueChange = new EventEmitter<string>();

  @Input() firstLabel = 'Option 1';
  @Input() firstValue = 'Success';

  @Input() secondLabel = 'Option 2';
  @Input() secondValue = 'Fallout';

  onToggleChange(value: string) {
    this.selectedValue = value;
    this.toggleValueChange.emit(value);
  }
}
