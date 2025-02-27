import { TestBed } from '@angular/core/testing';

import { UsuarioadminService } from './usuarioadmin.service';

describe('UsuarioadminService', () => {
  let service: UsuarioadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
