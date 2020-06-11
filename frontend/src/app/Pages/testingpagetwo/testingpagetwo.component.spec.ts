import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingpagetwoComponent } from './testingpagetwo.component';

describe('TestingpagetwoComponent', () => {
  let component: TestingpagetwoComponent;
  let fixture: ComponentFixture<TestingpagetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingpagetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingpagetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
