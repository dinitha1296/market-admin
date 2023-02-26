import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { ProductService } from 'src/app/core/services/product.service';
import { Product } from '../../shared/model';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.scss']
})
export class ProductViewerComponent implements OnInit, AfterViewInit {

  @Input() productId!: number;

  product: ReplaySubject<Product> = new ReplaySubject<Product>(1);

  private _defaultImageURL: string = '../../../assets/images/image-not-available.jpg';

  constructor(
    private _productService: ProductService
  ) { }

  ngOnInit(): void {
    this._productService.getProductById(this.productId)
      .pipe(first())
      .subscribe(currentProduct => this.product.next(currentProduct));
  }

  ngAfterViewInit(): void {
    // TODO: Fix scrolling to top
    // document.querySelector('app-product-viewer')?.scrollIntoView({behavior: 'smooth'});
    // document.querySelector('.product-viewer')?.scrollIntoView({behavior: 'smooth'});
    document.querySelector('.product-details-container')?.scroll({top: 0, behavior: 'smooth'});
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = this._defaultImageURL;
  }
}
