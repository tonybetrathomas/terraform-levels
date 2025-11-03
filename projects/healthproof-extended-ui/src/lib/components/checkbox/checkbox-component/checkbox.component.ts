import { Component, Input, Output, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'hpx-checkbox',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() value: any;
  @Input() name!: string | null;

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(val: boolean) {
    if (this._checked !== val) {
      this._checked = val;
      this.onChange(val);
      this.change.emit(val);
    }
  }

  @Input() size: 'small' | 'default' = 'default';

  @Output() change = new EventEmitter<boolean>();

  @HostBinding('class') get hostClass(): string {
    return `hpx-check-box-size-${this.size}`;
  }

  private _checked: boolean = false;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this._checked = !!value; // Ensure it's a boolean
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onMatCheckboxChange(event: any): void { // Using 'any' for simplicity, you could type MatCheckboxChange
    this.checked = event.checked; // Update internal state and trigger two-way binding/change event
    this.onTouched(); // Mark the control as touched
  }

  onMatCheckboxClick(event: Event): void {
    // event.stopPropagation(); // Prevent default if necessary
  }

  onMatCheckboxKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    this.onMatCheckboxClick(event);
  }
}

}
