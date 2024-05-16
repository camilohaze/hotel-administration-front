import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyErrorComponent } from './notify-error.component';

describe('NotifyErrorComponent', () => {
  let component: NotifyErrorComponent;
  let fixture: ComponentFixture<NotifyErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyErrorComponent]
    });
    fixture = TestBed.createComponent(NotifyErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
