import { TestBed } from '@angular/core/testing';

import { CatTypeBusinessService } from './cat-type-business.service';

describe('CatTypeBusinessService', () => {
  let service: CatTypeBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatTypeBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
