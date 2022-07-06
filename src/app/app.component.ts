import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Market Admin';
  isMenuSelected: boolean = false;

  toggleSidenav(): void {
    this.isMenuSelected = !this.isMenuSelected;
  }
}
