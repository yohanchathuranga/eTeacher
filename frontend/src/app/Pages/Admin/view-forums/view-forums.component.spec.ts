import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewForumsComponent } from './view-forums.component';

describe('ViewForumsComponent', () => {
  let component: ViewForumsComponent;
  let fixture: ComponentFixture<ViewForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
