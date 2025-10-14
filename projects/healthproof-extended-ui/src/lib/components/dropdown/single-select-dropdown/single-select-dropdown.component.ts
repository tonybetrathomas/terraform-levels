import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-single-select-dropdown',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './single-select-dropdown.component.html',
  styleUrl: './single-select-dropdown.component.scss',
  host: {
    'class': 'lib-single-select-scope'
  }
})
export class SingleSelectDropdownComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() defaultOptionNeeded: boolean = false;
  @Input() defaultOptionText: string = '-- None --';
  @Input() isDisabled: boolean = false;
  @Input() options: any[] = [];
  @Input() size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'xsmall';
  
  @Output() onSelectionChange = new EventEmitter<any>();

  @HostBinding('class') get hostClass(): string {
    return `dropdown-size-${this.size}`;
  }

  onSelectionChanged(event: MatSelectChange): void {
    this.onSelectionChange.emit(event.value);
  }
}
