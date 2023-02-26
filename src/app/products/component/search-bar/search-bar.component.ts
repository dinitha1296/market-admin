import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() searchControl!: FormControl;

  @Output() searchSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (this.searchControl.value === '') return;
    this.searchSubmit.emit();
  }

  onClear(): void {
    this.searchControl.setValue('');
  }
}
