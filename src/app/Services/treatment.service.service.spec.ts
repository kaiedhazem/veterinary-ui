import { TestBed } from '@angular/core/testing';

import { Treatment.ServiceService } from './treatment.service.service';

describe('Treatment.ServiceService', () => {
  let service: Treatment.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Treatment.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
