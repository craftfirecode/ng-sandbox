import { TestBed } from '@angular/core/testing';

import { HttpResource } from './http-resource';

describe('HttpResource', () => {
  let service: HttpResource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpResource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
