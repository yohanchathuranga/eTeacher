import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingpagethreeComponent } from './testingpagethree.component';

describe('TestingpagethreeComponent', () => {
  let component: TestingpagethreeComponent;
  let fixture: ComponentFixture<TestingpagethreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingpagethreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingpagethreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
