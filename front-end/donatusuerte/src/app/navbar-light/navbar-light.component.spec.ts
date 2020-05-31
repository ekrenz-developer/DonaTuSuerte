import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLightComponent } from './navbar-light.component';

describe('NavbarLightComponent', () => {
  let component: NavbarLightComponent;
  let fixture: ComponentFixture<NavbarLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
