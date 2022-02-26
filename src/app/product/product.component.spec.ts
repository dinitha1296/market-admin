import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

import { ProductComponent } from './product.component';

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
  
  it('should have called #productService.getProductsByQuery() after initiation', () => {
    spyOn(productService, "getProductsByQuery").and.callFake(()=> of([]));  
    fixture.detectChanges();  // Initiallisation. Will call ngOnInit
    expect(productService.getProductsByQuery).toHaveBeenCalled();
  });

  it('should call #productService.getProductsByQuery() on #onSearchBtnClick()', () => {
    
    // To call ngOnInit before attaching spy since it also calls #getProductByQuery
    fixture.detectChanges();
    
    // Attaching spy after ng onInit so verification will only
    // return true if #onSearchBtnClick() calls #productService.getProductsByQuery()
    // and won't detect the service call made by ngOnInit()
    spyOn(productService, "getProductsByQuery").and.callFake(()=> of([]));
    component.onSearchBtnClick();
    fixture.detectChanges();
    expect(productService.getProductsByQuery).toHaveBeenCalled();
  });
});
 
class ProductServiceStub {

  getProductsByQuery(query: string): Observable<Product[]> {
    return of(testProducts);
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