import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAccComponent } from './teacher-acc.component';

describe('TeacherAccComponent', () => {
  let component: TeacherAccComponent;
  let fixture: ComponentFixture<TeacherAccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
