import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleCategoriesComponent } from './style-categories.component';

describe('StyleCategoriesComponent', () => {
  let component: StyleCategoriesComponent;
  let fixture: ComponentFixture<StyleCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StyleCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
