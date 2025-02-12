import { TestBed } from '@angular/core/testing';

import { FavoritoService } from './favorito.service';

describe('FavoritoService', () => {
  let service: FavoritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
