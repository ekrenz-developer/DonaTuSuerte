import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCheckerComponent } from './sidebar-checker.component';

describe('SidebarCheckerComponent', () => {
  let component: SidebarCheckerComponent;
  let fixture: ComponentFixture<SidebarCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
