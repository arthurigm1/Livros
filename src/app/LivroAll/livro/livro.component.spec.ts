import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosComponent } from './livro.component';

describe('LivroComponent', () => {
  let component: LivrosComponent;
  let fixture: ComponentFixture<LivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
