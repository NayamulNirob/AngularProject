import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentMaterialComponent } from './adjustment-material.component';

describe('AdjustmentMaterialComponent', () => {
  let component: AdjustmentMaterialComponent;
  let fixture: ComponentFixture<AdjustmentMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdjustmentMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdjustmentMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
