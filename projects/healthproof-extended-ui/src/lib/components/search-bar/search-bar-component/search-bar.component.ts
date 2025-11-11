import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnChanges {
  // --- Configurable inputs (generic) ---
  @Input() query: string = '';
  @Input() placeholder: string = 'Search';
  @Input() autoSearchEnabled: boolean = true;

  /** Minimum length before filtering/searching */
  @Input() minSearchLength: number = 3;

  /** If true, comparisons are case sensitive; default false */
  @Input() caseSensitive: boolean = false;

  /**
   * Options can be array of strings or objects.
   * If objects, use `displayKey` to show a property (e.g. 'name'),
   * and `valueKey` to uniquely identify (e.g. 'id').
   * Alternatively provide `displayWith` function for custom formatting.
   */
  @Input() options: any[] = [];
  @Input() displayKey?: string;
  @Input() valueKey?: string;
  @Input() displayWith?: (item: any) => string;

  @Input() invalidMemberMsg: string | null = null;
  @Input() showInvalidBorder: boolean = false;

  // --- Outputs (generic) ---
  @Output() optionSelected = new EventEmitter<any>(); // emits the chosen option (object or string)
  @Output() searchRequested = new EventEmitter<any>(); // emits the search payload (string or object)
  @Output() cleared = new EventEmitter<void>();

  // --- View / behavior state ---
  @ViewChild('searchWrapper') searchWrapper?: ElementRef;
  inputFocused: boolean = false;
  hovered: string | null = null;
  filteredOptions: any[] = [];
  toggleClearBtn: boolean = false;
  optionsSelectedFromList: boolean = false;

  // Document click handler to close dropdown
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.searchWrapper && !this.searchWrapper.nativeElement.contains(event.target)) {
      this.filteredOptions = [];
      this.inputFocused = false;
    }
  }

  // Helper: obtain display string for an option
  private getDisplay(item: any): string {
    if (this.displayWith) return this.displayWith(item);
    if (this.displayKey && item && typeof item === 'object') return String(item[this.displayKey] ?? '');
    return String(item ?? '');
  }

  // Helper: obtain unique value for an option (for trackBy or value emission)
  private getValue(item: any): any {
    if (this.valueKey && item && typeof item === 'object') return item[this.valueKey];
    return item;
  }

  // Called when the input changes (bound to ngModel or input event)
  onInputChange(value: string) {
    this.query = value;
    this.toggleClearBtn = !!value.length;

    if (value.length === 0) {
      this.filteredOptions = [];
      this.cleared.emit();
      return;
    }

    if (value.length >= this.minSearchLength) {
      const query = this.caseSensitive ? value : value.toLowerCase();
      this.filteredOptions = this.options.filter((opt) => {
        const display = this.getDisplay(opt);
        const cmp = this.caseSensitive ? display : display.toLowerCase();
        return cmp.includes(query);
      });

      if (this.autoSearchEnabled && value.length === this.minSearchLength) {
        this.onSearchClick();
      }
    } else {
      this.filteredOptions = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.optionsSelectedFromList) {
      // prevent resetting options immediately after selection
      this.filteredOptions = [];
      this.optionsSelectedFromList = false;
      return;
    }

    if (changes['options'] && this.query.length >= this.minSearchLength) {
      const q = this.caseSensitive ? this.query : this.query.toLowerCase();
      this.filteredOptions = this.options.filter((opt) => {
        const display = this.getDisplay(opt);
        const cmp = this.caseSensitive ? display : display.toLowerCase();
        return cmp.includes(q);
      });
    }
  }

  // When an option is chosen from the list
  onOptionSelected(option: any) {
    this.query = this.getDisplay(option);
    this.optionSelected.emit(option);
    this.searchRequested.emit(option); // emit full option; consumers may use getValue if needed
    this.optionsSelectedFromList = true;
    this.filteredOptions = [];
  }

  // Triggered by explicit search button / enter key
  onSearchClick() {
    if (!this.query?.toString().trim()) return;
    this.filteredOptions = [];
    // Emit the raw query string (trimmed) as default search payload
    this.searchRequested.emit(this.query.toString().trim());
  }

  // trackBy to help list rendering (if objects provided)
  trackByFn(index: number, item: any): string | number {
    const val = this.getValue(item);
    if (typeof val === 'string' || typeof val === 'number') return val;
    // fallback: use display + index to avoid collisions
    return `${this.getDisplay(item)}-${index}`;
  }

  // Clear input and emit cleared
  clearSearch() {
    this.query = '';
    this.filteredOptions = [];
    this.toggleClearBtn = false;
    this.cleared.emit();
  }
}
