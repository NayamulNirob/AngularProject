import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleMaterialQtyComponent } from './style-material-qty.component';

describe('StyleMaterialQtyComponent', () => {
  let component: StyleMaterialQtyComponent;
  let fixture: ComponentFixture<StyleMaterialQtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleMaterialQtyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StyleMaterialQtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
