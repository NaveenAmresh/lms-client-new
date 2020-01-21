import { TestBed } from '@angular/core/testing';

import { ListReminderService } from './list-reminder.service';

describe('ListReminderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListReminderService = TestBed.get(ListReminderService);
    expect(service).toBeTruthy();
  });
});
