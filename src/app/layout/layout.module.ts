import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TopNavigationComponent } from './component/top-navigation/top-navigation.component';
import { SideNavigationComponent } from './component/side-navigation/side-navigation.component';

@NgModule({
  declarations: [
    TopNavigationComponent,
    SideNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
  ],
  exports: [
    TopNavigationComponent,
    SideNavigationComponent
  ]
})
export class LayoutModule { }
