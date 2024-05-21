import { TestBed } from '@angular/core/testing';

import { TaskCommunicationService } from './task-communication.service';

describe('TaskCommunicationService', () => {
  let service: TaskCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
