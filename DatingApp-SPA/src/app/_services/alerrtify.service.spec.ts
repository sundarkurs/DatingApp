/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlerrtifyService } from './alerrtify.service';

describe('Service: Alerrtify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlerrtifyService]
    });
  });

  it('should ...', inject([AlerrtifyService], (service: AlerrtifyService) => {
    expect(service).toBeTruthy();
  }));
});
