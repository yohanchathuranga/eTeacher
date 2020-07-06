import { TestBed } from '@angular/core/testing';

import { FourmServiceService } from './fourm-service.service';

describe('FourmServiceService', () => {
  let service: FourmServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FourmServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
