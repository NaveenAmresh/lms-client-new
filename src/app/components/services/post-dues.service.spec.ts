import { TestBed } from '@angular/core/testing';

import { PostDuesService } from './post-dues.service';

describe('PostDuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostDuesService = TestBed.get(PostDuesService);
    expect(service).toBeTruthy();
  });
});
