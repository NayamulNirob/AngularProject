import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleAttachmentComponent } from './style-attachment.component';

describe('StyleAttachmentComponent', () => {
  let component: StyleAttachmentComponent;
  let fixture: ComponentFixture<StyleAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StyleAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StyleAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
