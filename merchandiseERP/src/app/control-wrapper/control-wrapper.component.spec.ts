import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlWrapperComponent } from './control-wrapper.component';

describe('ControlWrapperComponent', () => {
  let component: ControlWrapperComponent;
  let fixture: ComponentFixture<ControlWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ControlWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
