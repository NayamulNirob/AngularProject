import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborCostComponent } from './labor-cost.component';

describe('LaborCostComponent', () => {
  let component: LaborCostComponent;
  let fixture: ComponentFixture<LaborCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaborCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaborCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
