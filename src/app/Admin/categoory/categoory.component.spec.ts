import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategooryComponent } from './categoory.component';

describe('CategooryComponent', () => {
  let component: CategooryComponent;
  let fixture: ComponentFixture<CategooryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategooryComponent]
    });
    fixture = TestBed.createComponent(CategooryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
