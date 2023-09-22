import { TestBed } from '@angular/core/testing';

import { AddKeyInterceptor } from './add-key-interceptor.interceptor';

describe('AddHeaderInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddKeyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddKeyInterceptor = TestBed.inject(AddKeyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
