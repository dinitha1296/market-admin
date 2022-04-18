import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

import { ProductComponent } from './product.component';

import { Page } from '../core/utilities/page';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        { provide: ProductService, useClass: ProductServiceStub }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = fixture.debugElement.injector.get(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have #products as undefined before initiation', () => {
    expect(productService.productList).toBeUndefined();
  });
  
  it('should have called #productService.getProducts() after initiation', () => {
    spyOn(productService, "getProducts").and.callFake(()=> of(new PageMockImpl<Product>()));  
    fixture.detectChanges();  // Initiallisation. Will call ngOnInit
    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should call #productService.getProducts() on #onSearchBtnClick()', () => {
    
    // To call ngOnInit before attaching spy since it also calls #getProductByQuery
    fixture.detectChanges();
    
    // Attaching spy after ng onInit so verification will only
    // return true if #onSearchBtnClick() calls #productService.getProducts()
    // and won't detect the service call made by ngOnInit()
    spyOn(productService, "getProducts").and.callFake(()=> of(new PageMockImpl<Product>()));
    component.onSearchBtnClick();
    fixture.detectChanges();
    expect(productService.getProducts).toHaveBeenCalled();
  });
});
 
class ProductServiceStub {

  getProducts(query: string): Observable<Page<Product>> {
    const page: Page<Product> = new PageMockImpl<Product>();
    page.content = testProducts;
    page.totalElements = testProducts.length;
    page.totalPages = 1;
    page.first = true;
    page.last = true;
    page.size = testProducts.length;
    page.number = 0;
    page.numberOfElements = testProducts.length;
    page.empty = false;
    return of(page);
  }
}

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

class PageMockImpl<T> implements Page<T> {
  content: T[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  first: boolean = false;
  last: boolean = true;
  size: number = 0;
  number: number = 0;
  numberOfElements: number = 0;
  empty: boolean = true;
}