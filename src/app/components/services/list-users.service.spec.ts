import { TestBed } from '@angular/core/testing';

import { ListUsersService } from './list-users.service';

describe('ListUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListUsersService = TestBed.get(ListUsersService);
    expect(service).toBeTruthy();
  });
});
