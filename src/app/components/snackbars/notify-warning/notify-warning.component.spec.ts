import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyWarningComponent } from './notify-warning.component';

describe('NotifyWarningComponent', () => {
  let component: NotifyWarningComponent;
  let fixture: ComponentFixture<NotifyWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyWarningComponent]
    });
    fixture = TestBed.createComponent(NotifyWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
