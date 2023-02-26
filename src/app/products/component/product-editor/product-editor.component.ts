import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';

import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Category, CategoryTree, Product, ValidationMessages } from '../../shared/model';
import { PRODUCT_VALIDATION_MESSAGES } from '../../shared/const';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit, AfterViewInit {
  
  @Input() productId!: number;

  @Output() cancelEvent: EventEmitter<void> = new EventEmitter<void>();

  product: ReplaySubject<Product> = new ReplaySubject<Product>(1);

  categoryTree: ReplaySubject<CategoryTree> = new ReplaySubject<CategoryTree>(1);

  filteredCategories!: Observable<CategoryTree>;

  productCategoryFilterControl: FormControl = new FormControl();

  productFormGroup!: FormGroup;

  validationMessages: ValidationMessages = PRODUCT_VALIDATION_MESSAGES;

  private _defaultImageURL: string = '../../../assets/images/image-not-available.jpg'

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    
    this.productFormGroup = new FormGroup({
      productId: new FormControl({value: 0, disabled: true}, Validators.required),
      productName: new FormControl('', Validators.required),
      productDescription: new FormControl(''),
      productUnitPrice: new FormControl(0, Validators.required),
      productIsAvailable: new FormControl(false, Validators.required),
      productImageURL: new FormControl('', Validators.required),
      productMinQuantity: new FormControl(0, Validators.required),
      productMaxQuantity: new FormControl(0, Validators.required),
      productQuantityIncrement: new FormControl(0, Validators.required),
      productPopularityScore: new FormControl({value: 0, disabled: true}, Validators.required),
      productUnit: new FormControl(''),
      category: new FormControl(0, Validators.required)
    });

    this.product.asObservable()
      .pipe(first())
      .subscribe(product => {
        
        /*
         Creating a proxy object with the type any to excess properties using key string.
        
         Strongly typed objects doesnt allow accessing properties using key string.
        */
        const productProxy: any = product;
        
        Object.keys(product).forEach((key: string) => {
          if (key === 'category') {
            this.productFormGroup.get(key)?.setValue(product[key].categoryId);
          } else {
            this.productFormGroup.get(key)?.setValue(productProxy[key]);
          }
        })
      });

    this.filteredCategories = combineLatest([this.categoryTree, this.productCategoryFilterControl.valueChanges])
      .pipe(
        debounceTime(1000),
        map(([categoryTree, query]) => this._filterCategoryTree(categoryTree, query))
      )

    this._productService.getProductById(this.productId)
      .pipe(first())
      .subscribe(product => this.product.next(product));

    this._categoryService.getCategories()
      .pipe(
        first(),
        map(this._generateCategoryTree)
      )
      .subscribe(categoryTree => this.categoryTree.next(categoryTree));
  }

  ngAfterViewInit(): void {

    /* 
     Setting productCategoryFilterControl to so that filteredCategories emits a value.
    
     Otherwise filteredCategories doesn't emits a value and category selector doesn't 
     have any options until something is typed in the productCategoryFilterControl.
    */
    this.productCategoryFilterControl.setValue('');

    document.querySelector('.product-details-container')?.scroll({top: 0, left: 0, behavior: 'smooth'});
  }

  hasErrors(controlName: string, errorCode: string): boolean {
    const control: AbstractControl | null = this.productFormGroup.get(controlName);
    return control &&
      (control?.dirty || control?.touched) &&
      control?.errors?.[errorCode];
  }

  cancelProductForm(): void {
    this.cancelEvent.emit();
  }

  saveProductForm(): void {
    // TODO: Implement save feature. Remove console.log
    if (this.productFormGroup.invalid) {
      console.log('%cForm not valid', 'color: red');
      console.log('this.productFormGroup.errors', this.productFormGroup.errors);
      console.log('this.productFormGroup.getRawValue()', this.productFormGroup.getRawValue());
      console.log('this.productFormGroup.getError(\'required\')', this.productFormGroup.getError('required'));
      Object.keys(this.productFormGroup.controls)
        .forEach(key => {
          // console.log({ key })
          const validationErrors = this.productFormGroup.get(key)?.errors;
          // console.log(validationErrors);
          validationErrors &&
          Object.keys(validationErrors)
            .forEach(keyError => {
              this.hasErrors(key, keyError);
              console.log({ key, keyError, 'error': validationErrors[keyError]});
            })
        })
      return;
    }
    console.log('save');
    console.log('isValid: ', this.productFormGroup.valid);
    this.cancelProductForm();
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = this._defaultImageURL;
  }

  private _matches(sample: string, query: string): boolean {
    return sample.toLowerCase().includes(query.toLowerCase());
  }

  private _generateCategoryTree(categories: Category[]): CategoryTree {
    const categoryTree: CategoryTree = {};

    categories.forEach(category => {
      if (!categoryTree[category.subDepartment.department.departmentName]) {
        categoryTree[category.subDepartment.department.departmentName] = {};
        categoryTree[category.subDepartment.department.departmentName][category.subDepartment.subDepartmentName] = [category];
      } else {
        if (!categoryTree[category.subDepartment.department.departmentName][category.subDepartment.subDepartmentName]) {
          categoryTree[category.subDepartment.department.departmentName][category.subDepartment.subDepartmentName] = [category]; 
        } else {
          categoryTree[category.subDepartment.department.departmentName][category.subDepartment.subDepartmentName].push(category);
        }
      }
    })
    return categoryTree;
  }

  private _filterCategoryTree(categoryTree: CategoryTree, query: string): CategoryTree {
    const filteredTree: CategoryTree = {};
    Object.keys(categoryTree).forEach(department => {
      filteredTree[department] = {};
      Object.keys(categoryTree[department]).forEach(subDepartment => {
        filteredTree[department][subDepartment] = 
          categoryTree[department][subDepartment].filter(cat => this._matchesCategory(cat, query));
        if (filteredTree[department][subDepartment].length === 0) delete filteredTree[department][subDepartment];
      })
      if (Object.keys(filteredTree[department]).length === 0) delete filteredTree[department];
    })
    return filteredTree;
  }

  private _matchesCategory(category: Category, query: string): boolean {
    return this._matches(category.categoryName, query) ||
      this._matches(category.subDepartment.subDepartmentName , query) ||
      this._matches(category.subDepartment.department.departmentName, query);
  }

}
