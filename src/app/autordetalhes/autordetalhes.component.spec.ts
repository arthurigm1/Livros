import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutordetalhesComponent } from './autordetalhes.component';

describe('AutordetalhesComponent', () => {
  let component: AutordetalhesComponent;
  let fixture: ComponentFixture<AutordetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutordetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutordetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
