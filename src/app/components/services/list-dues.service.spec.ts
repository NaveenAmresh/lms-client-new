import { TestBed } from '@angular/core/testing';

import { ListDuesService } from './list-dues.service';

describe('ListDuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListDuesService = TestBed.get(ListDuesService);
    expect(service).toBeTruthy();
  });
});
