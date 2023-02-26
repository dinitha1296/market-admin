import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _darkModeObservable: Observable<boolean> = this._darkModeSubject.asObservable();

  constructor() {
    this._darkModeObservable.subscribe(isDarkTheme => {
      if (isDarkTheme) {
        document.body.classList.add('dark-theme')
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }

  getDarkThemeState(): Observable<boolean> {
    return this._darkModeObservable;
  }

  toggleThemeState(): void {
    this._darkModeSubject.next(!this._darkModeSubject.value);
  }
}
