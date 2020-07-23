import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingUserPageComponent } from './testing-user-page.component';

describe('TestingUserPageComponent', () => {
  let component: TestingUserPageComponent;
  let fixture: ComponentFixture<TestingUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
