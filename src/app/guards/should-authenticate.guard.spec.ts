import { TestBed } from '@angular/core/testing';

import { ShouldAuthenticateGuard } from './should-authenticate.guard';

describe('ShouldAuthenticateGuard', () => {
  let guard: ShouldAuthenticateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShouldAuthenticateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
