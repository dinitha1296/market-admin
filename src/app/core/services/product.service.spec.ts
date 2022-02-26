import {HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'

import { TestBed } from '@angular/core/testing';

import { Product } from '../models/product.model';
import { ProductService } from './product.service';

const testProducts: Product[] = [
  {
    productId: 1, 
    productName: 'A', 
    productDescription: 'A', 
    productUnitPrice: 100,
    productIsAvailable: true,
    productImageURL: "",
    productMinQuntity: 1,
    productMaxQuantity: 10,
    productQuantityIncrement: 1,
    productPopularityScore: 0.5,
    productUnit: ""
  },
  {
    productId: 2, 
    productName: 'B', 
    productDescription: 'B', 
    productUnitPrice: 100,
    productIsAvailable: true,
    productImageURL: "",
    productMinQuntity: 1,
    productMaxQuantity: 10,
    productQuantityIncrement: 1,
    productPopularityScore: 0.5,
    productUnit: ""
  }
];

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  // beforeEach(() => {
  //   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  //   productService = new ProductService(httpClientSpy);
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('#getProducts should return all products (HttpClient called once)', (done: DoneFn) => {
    const expectedProducts: Product[] = testProducts;

    productService.getProducts().subscribe({
      next: products => {
        expect(products).toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });

    const req = httpTestingController.expectOne('api/products');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedProducts);

  });

  it('#getProductById should return product by id (HttpClient called once)', (done: DoneFn) => {
    const expectedProduct: Product = testProducts[0];

    productService.getProductById(1).subscribe({
      next: product => {
        expect(product).toEqual(expectedProduct);
        done();
      },
      error: done.fail
    });

    const req: TestRequest = httpTestingController.expectOne('api/products/1');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedProduct);

  });

  it('#getProductsByQuery should return product by query (HttpClient called once)', (done: DoneFn) => {
    const expectedProducts: Product[] = [testProducts[0]];

    productService.getProductsByQuery("a").subscribe({
      next: product => {
        expect(product).toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });

    const req: TestRequest = httpTestingController.expectOne('api/products?query=a');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedProducts);

  });

  it('#getProductsByQuery should return undefined on error', (done: DoneFn) => {
    productService.getProductsByQuery("a").subscribe({
      next: product => {
        expect(product).toBeUndefined();
        done();
      },
      error: done.fail
    });

    const errorEvent: ErrorEvent = new ErrorEvent('404');
    httpTestingController.expectOne('api/products?query=a').error(errorEvent);
  });
});
