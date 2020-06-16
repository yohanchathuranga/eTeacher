import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTypeComponent } from './forum-type.component';

describe('ForumTypeComponent', () => {
  let component: ForumTypeComponent;
  let fixture: ComponentFixture<ForumTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
