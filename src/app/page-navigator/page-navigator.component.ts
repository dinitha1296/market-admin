import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.scss']
})
export class PageNavigatorComponent implements OnInit {

  constructor() { }

  @Input() totalPages!: number;

  @Input() currentPage!: number;

  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  onPageChange(pageNumber: number): void {
    // console.log(pageNumber);
    if (pageNumber > this.totalPages || pageNumber < 1) return;
    this.currentPageChange.emit(pageNumber);
  }

  toPreviousPage(): void {
    this.onPageChange(this.currentPage - 1);
  }

  toNextPage(): void {
    this.onPageChange(this.currentPage + 1);
  }

  isSelected(pageNumber: number): boolean {
    return pageNumber === this.currentPage;
  }

  getListClasses(pageNumber: number): string {
    return this.isSelected(pageNumber) ? "page-item disabled" : "page-item"; 
  }

  getBtnClasses(pageNumber: number): string {
    return this.isSelected(pageNumber) ? "page-link bg-secondary text-light" : "page-link"; 
  }
}
