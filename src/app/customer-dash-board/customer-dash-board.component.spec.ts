import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDashBoardComponent } from './customer-dash-board.component';

describe('CustomerDashBoardComponent', () => {
  let component: CustomerDashBoardComponent;
  let fixture: ComponentFixture<CustomerDashBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDashBoardComponent]
    });
    fixture = TestBed.createComponent(CustomerDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
