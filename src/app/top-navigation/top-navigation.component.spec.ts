import { DebugElement } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { TopNavigationComponent } from './top-navigation.component';

describe('TopNavigationComponent', () => {
  let component: TopNavigationComponent;
  let fixture: ComponentFixture<TopNavigationComponent>;
  let expectedMenuState: boolean;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ TopNavigationComponent ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    fixture = TestBed.createComponent(TopNavigationComponent);
    component = fixture.componentInstance;

    expectedMenuState = false;
    component.isMenuSelected = expectedMenuState;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialy have #isNotificationSelected as false', () => {
  //   expect(component.isNotificationSelected).toBeFalse();
  // });

  
  it('should change #isNotificationSelected on #onNotificationClick()', () => {
    component.onNotificationClick();
    expect(component.isNotificationSelected).toBeTrue();
    component.onNotificationClick();
    expect(component.isNotificationSelected).toBeFalse();
  });

  // it('should initialy have #isLogoutSelected as false', () => {
  //   expect(component.isLogoutSelected).toBeFalse();
  // });

  it('should change #isLogoutSelected on #onLogoutClick()', () => {
    component.onLogoutClick();
    expect(component.isLogoutSelected).toBeTrue();
    component.onLogoutClick();
    expect(component.isLogoutSelected).toBeFalse();
  });

  // it('should initialy have #isSettingsSelected as false', () => {
  //   expect(component.isSettingsSelected).toBeFalse();
  // });

  it('should change #isSettingsSelected on #onSettingsClick()', () => {
    component.onSettingsClick();
    expect(component.isSettingsSelected).toBeTrue();
    component.onSettingsClick();
    expect(component.isSettingsSelected).toBeFalse();
  });

  // it('should initaly have #isMenuSelected as expected value', () => {
  //   expect(component.isMenuSelected).toBe(expectedMenuState);
  // });

  it('should call #isMenuSelectedChange emitter on #onMenuClick()', () => {
    spyOn(component.isMenuSelectedChange, 'emit');
    component.onMenuClick();
    expect(component.isMenuSelectedChange.emit).toHaveBeenCalledWith(true);
  })

  // it('should call #onMenuClick() when clicked #menu-button', () => {
  //   spyOn(component, "onMenuClick");
  //   let menuButton: DebugElement = fixture.debugElement.query(By.css('#menu-button'));
  //   menuButton.triggerEventHandler('click', null);
  //   expect(component.onMenuClick).toHaveBeenCalled();
  // });

  // it('should call #onNotificationClick() when clicked #notification-button', () => {
  //   spyOn(component, "onNotificationClick");
  //   let notificationButton: DebugElement = fixture.debugElement.query(By.css('#notification-button'));
  //   notificationButton.triggerEventHandler('click', null);
  //   expect(component.onNotificationClick).toHaveBeenCalled();
  // });

  // it('should call #onLogoutClick() when clicked #logout-button', () => {
  //   spyOn(component, "onLogoutClick");
  //   let logoutButton: DebugElement = fixture.debugElement.query(By.css('#logout-button'));
  //   logoutButton.triggerEventHandler('click', null);
  //   expect(component.onLogoutClick).toHaveBeenCalled();
  // });

  // it('should call #onSettingsClick() when clicked #settings-button', () => {
  //   spyOn(component, "onSettingsClick");
  //   let settingsButton: DebugElement = fixture.debugElement.query(By.css('#settings-button'));
  //   settingsButton.triggerEventHandler('click', null);
  //   expect(component.onSettingsClick).toHaveBeenCalled();
  // });

  // it('should display title as "Market Admin"', () => {
  //   let title: DebugElement = fixture.debugElement.query(By.css('#app-title'));
  //   expect(title).toBeTruthy();
  //   expect(title.nativeElement.textContent).toBe("Market Admin");
  // })

  // it('should return to home page when clicked title "Market Admin"', () => {
  //   let homeLink: DebugElement = fixture.debugElement.query(By.css('#app-title a'));
  //   // homeLink.nativeElement.click();
  //   debugger;
  //   // expect(title.nativeElement.click).toBeTruthy();

  // });
});
