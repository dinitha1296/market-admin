import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;

  private _defaultImageURL: string = '../../../assets/images/image-not-available.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = this._defaultImageURL;
  }

}
