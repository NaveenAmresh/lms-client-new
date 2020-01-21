import { TestBed } from '@angular/core/testing';

import { PostIssueService } from './post-issue.service';

describe('PostIssueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostIssueService = TestBed.get(PostIssueService);
    expect(service).toBeTruthy();
  });
});
