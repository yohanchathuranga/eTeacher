import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedForumsComponent } from './deleted-forums.component';

describe('DeletedForumsComponent', () => {
  let component: DeletedForumsComponent;
  let fixture: ComponentFixture<DeletedForumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedForumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
