import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompetitorComponent } from './dashboard-competitor.component';

describe('DashboardCompetitorComponent', () => {
  let component: DashboardCompetitorComponent;
  let fixture: ComponentFixture<DashboardCompetitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCompetitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
