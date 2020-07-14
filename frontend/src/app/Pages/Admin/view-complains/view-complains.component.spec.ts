import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComplainsComponent } from './view-complains.component';

describe('ViewComplainsComponent', () => {
  let component: ViewComplainsComponent;
  let fixture: ComponentFixture<ViewComplainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComplainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
