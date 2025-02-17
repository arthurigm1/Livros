import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosdetalhesComponent } from './livrosdetalhes.component';

describe('LivrosdetalhesComponent', () => {
  let component: LivrosdetalhesComponent;
  let fixture: ComponentFixture<LivrosdetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosdetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrosdetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
