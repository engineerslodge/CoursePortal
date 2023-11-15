import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStatusComponent } from './pay-status.component';

describe('PayStatusComponent', () => {
  let component: PayStatusComponent;
  let fixture: ComponentFixture<PayStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayStatusComponent]
    });
    fixture = TestBed.createComponent(PayStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
