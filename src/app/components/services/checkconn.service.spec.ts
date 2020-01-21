import { TestBed } from '@angular/core/testing';

import { CheckconnService } from './checkconn.service';

describe('CheckconnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckconnService = TestBed.get(CheckconnService);
    expect(service).toBeTruthy();
  });
});
