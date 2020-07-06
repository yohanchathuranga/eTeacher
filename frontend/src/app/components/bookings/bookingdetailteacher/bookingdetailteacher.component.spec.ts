import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingdetailteacherComponent } from './bookingdetailteacher.component';

describe('BookingdetailComponent', () => {
  let component: BookingdetailteacherComponent;
  let fixture: ComponentFixture<BookingdetailteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingdetailteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingdetailteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
