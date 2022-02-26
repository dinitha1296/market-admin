import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Market Admin'`, () => {
    expect(app.title).toEqual('Market Admin');
  });

  it('should initially have #isMenuSelected as false', () => {
    expect(app.isMenuSelected).toBeFalse();
  });

  it('should render top navigation', () => {
    const appElement: HTMLElement = fixture.nativeElement;
    const topNavigationElement: Element | null = appElement.querySelector('app-top-navigation');
    expect(topNavigationElement).toBeDefined();
  });

  it('should render side navigation', () => {
    const appElement: HTMLElement = fixture.nativeElement;
    const sideNavigationElement: Element | null = appElement.querySelector('app-side-navigation');
    expect(sideNavigationElement).toBeDefined();
  });

  it('should render router outlet', () => {
    const appElement: HTMLElement = fixture.nativeElement;
    const routerOutletElement: Element | null = appElement.querySelector('router-outlet');
    expect(routerOutletElement).toBeDefined();
  });

  it('should change #isMenuSlected on top-navigation\'s isMenuSelectedChange() event', () => {
    let topNavigation: DebugElement = fixture.debugElement.query(By.css('app-top-navigation'));
    topNavigation.triggerEventHandler('isMenuSelectedChange', true);
    expect(app.isMenuSelected).toBeTrue();
    topNavigation.triggerEventHandler('isMenuSelectedChange', false);
    expect(app.isMenuSelected).toBeFalse();
  });
});
