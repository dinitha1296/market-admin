import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.sass']
})
export class SideNavigationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input() isMenuSelected!: boolean;
  route!: String;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url: String[] = this.router.url.split("/");
        this.route = (url && url.length > 0) ? url[1] : "";
      }
    })
  }

}
