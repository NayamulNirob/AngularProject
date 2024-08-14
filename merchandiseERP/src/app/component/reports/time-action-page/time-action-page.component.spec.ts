import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeActionPageComponent } from './time-action-page.component';

describe('TimeActionPageComponent', () => {
  let component: TimeActionPageComponent;
  let fixture: ComponentFixture<TimeActionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeActionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeActionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
