import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  @Output() menuToggleChange: EventEmitter<void> = new EventEmitter<void>();

  darkTheme!: Observable<boolean>;

  constructor(
    private _themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.darkTheme = this._themeService.getDarkThemeState();
  }

  toggleSideMenu(): void {
    this.menuToggleChange.emit();
  }

  toggleTheme(): void {
    this._themeService.toggleThemeState();
  }

}
