import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrolistafilterComponent } from './livrolistafilter.component';

describe('LivrolistafilterComponent', () => {
  let component: LivrolistafilterComponent;
  let fixture: ComponentFixture<LivrolistafilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivrolistafilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivrolistafilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
