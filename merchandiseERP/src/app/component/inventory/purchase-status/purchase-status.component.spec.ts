import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseStatusComponent } from './purchase-status.component';

describe('PurchaseStatusComponent', () => {
  let component: PurchaseStatusComponent;
  let fixture: ComponentFixture<PurchaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
