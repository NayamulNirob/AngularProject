import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementAttachmentComponent } from './measurement-attachment.component';

describe('MeasurementAttachmentComponent', () => {
  let component: MeasurementAttachmentComponent;
  let fixture: ComponentFixture<MeasurementAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeasurementAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasurementAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
