import { TestBed } from '@angular/core/testing';

import { RequestStateService } from './request-state-service';

describe('RequestStateService', () => {
  let service: RequestStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
