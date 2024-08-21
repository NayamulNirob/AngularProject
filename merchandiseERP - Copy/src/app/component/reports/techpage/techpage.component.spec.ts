import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechpageComponent } from './techpage.component';

describe('TechpageComponent', () => {
  let component: TechpageComponent;
  let fixture: ComponentFixture<TechpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
