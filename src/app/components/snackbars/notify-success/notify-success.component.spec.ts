import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySuccessComponent } from './notify-success.component';

describe('NotifySuccessComponent', () => {
  let component: NotifySuccessComponent;
  let fixture: ComponentFixture<NotifySuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifySuccessComponent]
    });
    fixture = TestBed.createComponent(NotifySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
