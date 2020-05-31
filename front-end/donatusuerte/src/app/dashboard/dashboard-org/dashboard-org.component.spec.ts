import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOrgComponent } from './dashboard-org.component';

describe('DashboardOrgComponent', () => {
  let component: DashboardOrgComponent;
  let fixture: ComponentFixture<DashboardOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
