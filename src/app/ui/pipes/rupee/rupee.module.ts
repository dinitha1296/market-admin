import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RupeePipe } from './rupee.pipe';

@NgModule({
  declarations: [
    RupeePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RupeePipe
  ]
})
export class RupeeModule { }
