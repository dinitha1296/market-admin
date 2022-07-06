import { Component, Input, OnInit } from '@angular/core';

import { routes } from '../../shared/const';
import { Route } from '../../shared/model';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  @Input() sidenavOpened: boolean = false;

  routes: Route[] = routes;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
