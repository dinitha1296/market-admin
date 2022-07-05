import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../core/models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;

  private readonly defaultImageURL: string  = '../../assets/images/image-not-available.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultImageURL;
  }

  productUnitExists(): boolean {
    return !this.product.productUnit || this.product.productUnit !== "null";
  }
}
