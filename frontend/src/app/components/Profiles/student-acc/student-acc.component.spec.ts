import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccComponent } from './student-acc.component';

describe('StudentAccComponent', () => {
  let component: StudentAccComponent;
  let fixture: ComponentFixture<StudentAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
