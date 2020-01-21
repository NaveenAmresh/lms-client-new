import { TestBed } from '@angular/core/testing';

import { PostBookService } from './post-book.service';

describe('PostBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostBookService = TestBed.get(PostBookService);
    expect(service).toBeTruthy();
  });
});
