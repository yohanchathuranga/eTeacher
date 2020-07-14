import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedComplainsComponent } from './deleted-complains.component';

describe('DeletedComplainsComponent', () => {
  let component: DeletedComplainsComponent;
  let fixture: ComponentFixture<DeletedComplainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedComplainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
