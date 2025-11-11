import {
  ConnectedPosition,
  ConnectedOverlayPositionChange,
  OverlayModule,
} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  Input,
  inject,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef,
  effect,
  HostListener,
  OnChanges,
  SimpleChanges,
  ViewChild,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface ColumnConfig {
  key: string;
  label: string;
  type?: 'text' | 'array' | 'custom';
  width?: string;
  customTemplate?: string;
  showCountChip?: boolean;
  countColumnKey?: string;
  color?: string;
}

@Component({
  selector: 'table',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTooltipModule, OverlayModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() dataSource: any[] = [];
  @Input() columnConfigs: ColumnConfig[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() showOverflowHandling: boolean = true;

  @HostListener('window:scroll', ['$event'])
  isOpen = false;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly ngZone = inject(NgZone);

  private resizeObserver?: ResizeObserver;

  tooltipIndex: number | null = null;
  visibleAttrs: Record<number, Record<string, string[]>> = {};
  hiddenAttrs: Record<number, Record<string, string[]>> = {};

  positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: 8,
      offsetX: 0,
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ] as ConnectedPosition[];

  @ViewChildren('arrayCell') arrayCells!: QueryList<ElementRef<HTMLSpanElement>>;
  @ViewChild('tableContainer') tableContainer!: ElementRef<HTMLElement>;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>; // <── added

  activePosition: 'top' | 'bottom' = 'bottom';

  onPositionChange(event: ConnectedOverlayPositionChange) {
    this.activePosition = event.connectionPair.overlayY === 'bottom' ? 'bottom' : 'top';
  }

  private readonly onScroll = () => {
    this.tooltipIndex = null;
  };

  constructor() {
    effect(() => {
      if (this.dataSource?.length) {
        queueMicrotask(() => this.splitAttributes());
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource?.length) {
      queueMicrotask(() => this.splitAttributes());
    }
  }

  get displayedColumnsComputed(): string[] {
    return this.displayedColumns.length
      ? this.displayedColumns
      : this.columnConfigs.map((c) => c.key);
  }

  ngAfterViewInit() {
    queueMicrotask(() => this.splitAttributes());

    this.arrayCells.changes.subscribe(() => this.splitAttributes());

    this.tableContainer.nativeElement.addEventListener('scroll', this.onScroll);

    this.resizeObserver = new ResizeObserver(() => {
      this.splitAttributes();
    });

    this.resizeObserver.observe(this.tableContainer.nativeElement);
  }

  @HostListener('window:resize')
  onResize() {
    this.splitAttributes();
  }

  private resetScrollPosition(): void {
    this.ngZone.runOutsideAngular(() => {
      const sub = this.ngZone.onStable.subscribe(() => {
        requestAnimationFrame(() => {
          const el = this.scrollContainer?.nativeElement;

          if (el) {
            el.scrollTop = 0;
            el.scrollLeft = 0;
          }
          sub.unsubscribe();
        });
      });
    });
  }

  private splitAttributes() {
    this.visibleAttrs = {};
    this.hiddenAttrs = {};

    for (const [rowIndex, row] of this.dataSource.entries()) {
      for (const column of this.columnConfigs) {
        if (column.type === 'array') {
          this.processArrayColumn(row, rowIndex, column);
        }
      }
    }

    this.cdr.detectChanges();
  }

  private processArrayColumn(row: any, rowIndex: number, column: ColumnConfig) {
    const attrs = row[column.key];

    if (Array.isArray(attrs)) {
      const container = this.arrayCells.get(rowIndex)?.nativeElement.parentElement as HTMLElement;

      if (!container) return;

      const { visible, hidden } = this.calculateVisibleAndHiddenAttrs(attrs, container);

      if (!this.visibleAttrs[rowIndex]) this.visibleAttrs[rowIndex] = {};
      if (!this.hiddenAttrs[rowIndex]) this.hiddenAttrs[rowIndex] = {};

      this.visibleAttrs[rowIndex][column.key] = visible;
      this.hiddenAttrs[rowIndex][column.key] = hidden;
    }
  }

  private calculateVisibleAndHiddenAttrs(
    attrs: string[],
    container: HTMLElement,
  ): { visible: string[]; hidden: string[] } {
    const availableWidth = container.clientWidth;
    const tempSpan = this.createTempSpan(container);
    const reservedWidth = this.getReservedWidth(container);

    const visible: string[] = [];
    let hidden: string[] = [];

    for (const attr of attrs) {
      if (this.fitsInContainer(tempSpan, [...visible, attr], availableWidth, reservedWidth)) {
        visible.push(attr);
        continue;
      }

      const truncated = this.getTruncatedText(
        tempSpan,
        visible,
        attr,
        availableWidth,
        reservedWidth,
      );

      if (truncated) visible.push(truncated);

      hidden = attrs.slice(attrs.indexOf(attr));
      break;
    }

    if (hidden.length > 0 && !visible.at(-1)?.endsWith('...')) {
      visible.push('...');
    }

    tempSpan.remove();

    return { visible, hidden };
  }

  private getReservedWidth(container: HTMLElement): number {
    let reserved = 0;

    const style = getComputedStyle(container);
    const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
    const paddingRight = Number.parseFloat(style.paddingRight) || 0;

    reserved += paddingLeft + paddingRight;

    const chipEl = container.querySelector('.chip--more');

    if (chipEl instanceof HTMLElement) {
      const chipStyle = getComputedStyle(chipEl);
      const chipWidth = chipEl.offsetWidth;
      const chipMarginLeft = Number.parseFloat(chipStyle.marginLeft) || 0;

      reserved += chipWidth + chipMarginLeft + 4;
    } else {
      reserved += 32;
    }

    const scrollbarWidth = container.offsetWidth - container.clientWidth;

    reserved += scrollbarWidth > 0 ? scrollbarWidth : 4;

    return reserved;
  }

  private createTempSpan(container: HTMLElement): HTMLSpanElement {
    const span = document.createElement('span');
    const style = getComputedStyle(container);

    Object.assign(span.style, {
      visibility: 'hidden',
      whiteSpace: 'nowrap',
      position: 'absolute',
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      letterSpacing: style.letterSpacing,
    });

    document.body.appendChild(span);

    return span;
  }

  private fitsInContainer(
    span: HTMLSpanElement,
    items: string[],
    availableWidth: number,
    reservedWidth: number,
  ): boolean {
    span.textContent = items.join(', ');

    return span.offsetWidth <= availableWidth - reservedWidth;
  }

  private getTruncatedText(
    span: HTMLSpanElement,
    visible: string[],
    attr: string,
    availableWidth: number,
    reservedWidth: number,
  ): string | null {
    for (let k = attr.length; k > 0; k--) {
      span.textContent =
        (visible.length ? visible.join(', ') + ', ' : '') + attr.slice(0, k) + '...';

      if (span.offsetWidth <= availableWidth - reservedWidth) {
        return attr.slice(0, k) + '...';
      }
    }

    return null;
  }

  getArrayValue(row: any, columnKey: string): any[] {
    const val = row[columnKey];

    return Array.isArray(val) ? val : [];
  }

  getTextValue(row: any, columnKey: string): string {
    const val = row[columnKey];

    return val === null || val === undefined ? '' : String(val);
  }

  getVisibleItems(rowIndex: number, columnKey: string): string[] {
    return this.visibleAttrs[rowIndex]?.[columnKey] || [];
  }

  getHiddenItems(rowIndex: number, columnKey: string): string[] {
    return this.hiddenAttrs[rowIndex]?.[columnKey] || [];
  }

  getTotalCount(rowIndex: number, columnKey: string): number {
    const val = this.dataSource[rowIndex]?.[columnKey];

    return Array.isArray(val) ? val.length : 0;
  }

  toggleOverlay(index: number) {
    this.tooltipIndex = this.tooltipIndex === index ? null : index;
    this.isOpen = !this.isOpen;
  }

  trackByMemberId(index: number, item: any) {
    return item.memberId ?? index;
  }

  onChipKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleOverlay(index);
      event.preventDefault();
    }
  }

  closeOverlay() {
    this.tooltipIndex = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideOverlay = (event.target as HTMLElement).closest('.chip--more');

    if (!clickedInsideOverlay && this.tooltipIndex !== null) {
      this.closeOverlay();
    }
  }

  ngOnDestroy() {
    this.tableContainer.nativeElement.removeEventListener('scroll', this.onScroll);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  onWindowScroll(event: Event) {
    const overlayEl = document.querySelector('.tooltip');

    if (!overlayEl?.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
