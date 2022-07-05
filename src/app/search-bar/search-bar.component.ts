import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {

  searchQuery!: string;

  inputInFocus!: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchQuery = params.search || "";
    })
  }

  clearSearch(): void {
    this.searchQuery = "";
  }

  searchIsNotEmpty(): boolean {
    return !!this.searchQuery;
  }

  onSearch(): void {
    if (!this.searchQuery) return;
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
  }

  onFocusChange(isOnFocus: boolean): void {
    this.inputInFocus = isOnFocus;
  }
}
