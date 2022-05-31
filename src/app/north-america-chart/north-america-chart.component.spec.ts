import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthAmericaChartComponent } from './north-america-chart.component';


describe('NorthAmericaChartComponent', () => {
  let component: NorthAmericaChartComponent;
  let fixture: ComponentFixture<NorthAmericaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NorthAmericaChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthAmericaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
