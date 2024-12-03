import { TestBed } from '@angular/core/testing';
import { BranchofficeService } from './branchoffice.service';

describe('BranchofficeService', () => {
  let service: BranchofficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchofficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});