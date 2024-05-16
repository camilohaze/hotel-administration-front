import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyInfoComponent } from './notify-info.component';

describe('NotifyInfoComponent', () => {
  let component: NotifyInfoComponent;
  let fixture: ComponentFixture<NotifyInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyInfoComponent]
    });
    fixture = TestBed.createComponent(NotifyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});