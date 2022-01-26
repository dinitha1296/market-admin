import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'market-admin';
  counter: number = 1;

  onIncrement() {
    this.counter += 1;
  }
}
