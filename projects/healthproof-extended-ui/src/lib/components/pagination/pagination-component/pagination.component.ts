import { Component, EventEmitter, Input, Output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_CURRENT_PAGE = 0;

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSelectModule, MatButtonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  /* Data inputs */
  @Input() totalItems = 0;
  @Input() initialPageSize = DEFAULT_PAGE_SIZE;
  @Input() pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
  @Input() maxVisiblePages = 5;

  @Output() paginationChanged = new EventEmitter<{ pageNo: number; pageSize: number }>();

  pageSize = signal(this.initialPageSize);
  currentPage = signal(DEFAULT_CURRENT_PAGE); 


  // derived
  readonly totalPages = computed(() => {
    const size = this.pageSize();
    if (!size || size <= 0) return 0;
    return Math.max(0, Math.ceil(this.totalItems / size));
  });

  // displayed pages helper (returns zero-based page numbers, -1 for ellipsis)
  getDisplayedPages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const maxVisible = this.maxVisiblePages;

    if (total === 0) return [];

    if (total <= maxVisible + 4) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const lastPage = total - 1;
    const pages: number[] = [];

    if (current <= 2) {
      pages.push(0, 1, 2, 3, 4, -1, lastPage);
    } else if (current >= total - 3) {
      pages.push(0, -1, total - 5, total - 4, total - 3, total - 2, lastPage);
    } else {
      pages.push(0, -1, current - 1, current, current + 1, -1, lastPage);
    }

    return pages;
  }

  get pageRangeText(): string {
    if (this.totalItems === 0) return '0-0 of 0 Results';
    const start = this.currentPage() * this.pageSize() + 1;
    const end = Math.min((this.currentPage() + 1) * this.pageSize(), this.totalItems);
    return `${start}-${end} of ${this.totalItems} Results`;
  }

  goToPageOneBased(pageOneBased: number): void {
    const zeroBased = pageOneBased - 1;
    if (zeroBased >= 0 && zeroBased < this.totalPages()) {
      this.currentPage.set(zeroBased);
      this.emitPagination();
    }
  }

  prev(): void {
    const previous = this.currentPage() - 1;
    if (previous >= 0) {
      this.currentPage.set(previous);
      this.emitPagination();
    }
  }

  next(): void {
    const nextIndex = this.currentPage() + 1;
    if (nextIndex < this.totalPages()) {
      this.currentPage.set(nextIndex);
      this.emitPagination();
    }
  }

  onPageSizeChange(value: number): void {
    this.pageSize.set(value);
    if (this.currentPage() >= this.totalPages()) {
      this.currentPage.set(0);
    }
    this.emitPagination();
  }

  private emitPagination() {
    this.paginationChanged.emit({ pageNo: this.currentPage() + 1, pageSize: this.pageSize() });
  }
}
