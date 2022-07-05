import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() isMenuSelected!: boolean;
  currentRoute!: string;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    })
  }

  routeMatches(subPath: string, route: string): boolean {
    let pattern: RegExp = new RegExp(`^/${subPath}([^a-zA-Z-].*)?$`);
    return pattern.test(route);
  }
}
