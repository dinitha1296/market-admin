import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigationComponent } from './top-navigation.component';

describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #menuToggleChange emitter on #toggleSideMenu()', () => {
    spyOn(component.menuToggleChange, 'emit');
    component.toggleSideMenu();
    expect(component.menuToggleChange.emit).toHaveBeenCalled();
  })
});
