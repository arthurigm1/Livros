import { TestBed } from '@angular/core/testing';

import { AvaliacaoService } from './livro/avaliacao.service';

describe('AvaliacaoService', () => {
  let service: AvaliacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
