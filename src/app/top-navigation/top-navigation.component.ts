import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.sass']
})
export class TopNavigationComponent implements OnInit {

  constructor() { }

  @Input() isMenuSelected!: boolean;
  @Output() isMenuSelectedChange = new EventEmitter<boolean>();
  isNotificationSelected: boolean = false;
  isLogoutSelected: boolean = false;
  isSettingsSelected: boolean = false;

  ngOnInit(): void {
  }

  onMenuClick(): void {
    this.isMenuSelectedChange.emit(!this.isMenuSelected); 
  }

  onNotificationClick(): void {
    this.isNotificationSelected = !this.isNotificationSelected;
  }

  onLogoutClick(): void {
    this.isLogoutSelected = !this.isLogoutSelected;
  }

  onSettingsClick(): void {
    this.isSettingsSelected = !this.isSettingsSelected;
  }
}
