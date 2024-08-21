import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TnaComponent } from './tna.component';

describe('TnaComponent', () => {
  let component: TnaComponent;
  let fixture: ComponentFixture<TnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TnaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
