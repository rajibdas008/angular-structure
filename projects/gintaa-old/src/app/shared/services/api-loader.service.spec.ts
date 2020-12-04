import { TestBed } from '@angular/core/testing';

import { ApiLoaderService } from './api-loader.service';

describe('LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiLoaderService = TestBed.get(ApiLoaderService);
    expect(service).toBeTruthy();
  });
});
