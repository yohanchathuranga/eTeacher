import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingdetailuserComponent } from './bookingdetailuser.component';

describe('BookingdetailuserComponent', () => {
  let component: BookingdetailuserComponent;
  let fixture: ComponentFixture<BookingdetailuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingdetailuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingdetailuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
