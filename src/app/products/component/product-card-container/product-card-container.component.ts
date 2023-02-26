import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-product-card-container',
  templateUrl: './product-card-container.component.html',
  styleUrls: ['./product-card-container.component.scss']
})
export class ProductCardContainerComponent implements OnInit {

  @Input() products!: Product[];

  constructor() { }

  ngOnInit(): void {
  }
}
