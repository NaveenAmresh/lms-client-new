import { TestBed } from '@angular/core/testing';

import { ListIssueService } from './list-issue.service';

describe('ListIssueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListIssueService = TestBed.get(ListIssueService);
    expect(service).toBeTruthy();
  });
});
