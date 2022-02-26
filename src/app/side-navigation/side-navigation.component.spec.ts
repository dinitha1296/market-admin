import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SideNavigationComponent } from './side-navigation.component';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  let router: Router;
  let routeMatches: (subPath: string, route: string) => boolean;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SideNavigationComponent,
        BlankComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'products', component: BlankComponent},
            { path: 'departments', component: BlankComponent},
            { path: '', component: BlankComponent},
            { path: 'products/order', component: BlankComponent}
          ]
        )
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    routeMatches = component.routeMatches;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change #route according to changing route', fakeAsync(() => {
    router.navigate(['products']);
    tick();
    expect(component.currentRoute).toBe("/products");

    router.navigate(['departments']);
    tick();
    expect(component.currentRoute).toBe("/departments");

    router.navigate(['']);
    tick();
    expect(component.currentRoute).toBe("/");

    router.navigate(['products/order']);
    tick();
    expect(component.currentRoute).toBe("/products/order");
  }));

  it('should return true when called #routeMatches(\'product\', \'/product\')', () => {
    expect(routeMatches('product', '/product')).toBeTrue();
  });

  it('should return true when called #routeMatches(\'\', \'/\')', () => {
    expect(routeMatches('', '/')).toBeTrue();
  });

  it('should return true when called #routeMatches(\'product\', \'/product/1\')', () => {
    expect(routeMatches('product', '/product/1')).toBeTrue();
  });

  it('should return true when called #routeMatches(\'product\', \'/product?q=a\')', () => {
    expect(routeMatches('product', '/product?q=a')).toBeTrue();
  });

  it('should return true when called #routeMatches(\'product\', \'/product#2\')', () => {
    expect(routeMatches('product', '/product#2')).toBeTrue();
  });

  it('should return false when called #routeMatches(\'product\', \'/products\')', () => {
    expect(routeMatches('product', '/products')).toBeFalse();
  });

  it('should return false when called #routeMatches(\'product\', \'/product-category\')', () => {
    expect(routeMatches('product', '/product-categroy')).toBeFalse();
  });
});

@Component({
  template: ``,
  selector: `blank-component`
})
class BlankComponent {

}