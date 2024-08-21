import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomMaterialComponent } from './bom-material.component';

describe('BomMaterialComponent', () => {
  let component: BomMaterialComponent;
  let fixture: ComponentFixture<BomMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BomMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BomMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
