import { TestBed } from '@angular/core/testing';

import { ShopmartFormServiceService } from './shopmart-form-service.service';

describe('ShopmartFormServiceService', () => {
  let service: ShopmartFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopmartFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
