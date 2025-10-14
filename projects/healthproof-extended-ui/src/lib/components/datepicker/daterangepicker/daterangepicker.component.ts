import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'hpx-daterangepicker',
  imports: [MatFormFieldModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './daterangepicker.component.html',
  styleUrl: './daterangepicker.component.scss'
})
export class DaterangepickerComponent {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
}
