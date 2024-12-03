/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CatTypeMenuProductService } from './cat-type-menu-product.service';

describe('Service: CatTypeMenuProduct', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatTypeMenuProductService]
    });
  });

  it('should ...', inject([CatTypeMenuProductService], (service: CatTypeMenuProductService) => {
    expect(service).toBeTruthy();
  }));
});
