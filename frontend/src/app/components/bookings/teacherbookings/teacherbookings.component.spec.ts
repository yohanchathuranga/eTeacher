import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherbookingsComponent } from './teacherbookings.component';

describe('TeacherbookingsComponent', () => {
  let component: TeacherbookingsComponent;
  let fixture: ComponentFixture<TeacherbookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
