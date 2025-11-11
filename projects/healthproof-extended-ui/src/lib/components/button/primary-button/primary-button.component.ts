import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'hpx-primary-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryButtonComponent {
  @Input() label: string = '';
  @Input() leftIcon: string = '';
  @Input() rightIcon: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'small' | 'medium' | 'large' = 'large';
  @Input() isDisabled: boolean = false;

  @Input() buttonColor: string = '';
  @Input() textColor: string = '';
  @Input() hoverColor: string = '';
  @Input() hoverTextColor: string = '';
  @Input() focusColor: string = '';
  @Input() focusTextColor: string = '';
  @Input() disabledColor: string = '';
  @Input() disabledTextColor: string = '';

  @Output() clicked = new EventEmitter<void>();

  @HostBinding('style.--btn-bg') get cssBtnBg() { return this.buttonColor || null; }
  @HostBinding('style.--btn-color') get cssBtnColor() { return this.textColor || null; }
  @HostBinding('style.--btn-hover-bg') get cssBtnHoverBg() { return this.hoverColor || null; }
  @HostBinding('style.--btn-hover-color') get cssBtnHoverColor() { return this.hoverTextColor || null; }
  @HostBinding('style.--btn-focus-bg') get cssBtnFocusBg() { return this.focusColor || null; }
  @HostBinding('style.--btn-focus-color') get cssBtnFocusColor() { return this.focusTextColor || null; }
  @HostBinding('style.--btn-disabled-bg') get cssBtnDisabledBg() { return this.disabledColor || null; }
  @HostBinding('style.--btn-disabled-color') get cssBtnDisabledColor() { return this.disabledTextColor || null; }

  onBtnClick(): void {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
  }
}
