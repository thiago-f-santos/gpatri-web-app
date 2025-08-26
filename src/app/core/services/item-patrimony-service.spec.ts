import { TestBed } from '@angular/core/testing';

import { ItemPatrimonyService } from './item-patrimony-service';

describe('ItemPatrimonyService', () => {
  let service: ItemPatrimonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemPatrimonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
