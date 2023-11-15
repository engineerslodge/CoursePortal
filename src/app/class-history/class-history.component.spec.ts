import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassHistoryComponent } from './class-history.component';

describe('ClassHistoryComponent', () => {
  let component: ClassHistoryComponent;
  let fixture: ComponentFixture<ClassHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassHistoryComponent]
    });
    fixture = TestBed.createComponent(ClassHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
