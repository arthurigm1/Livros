import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacaouserComponent } from './verificacaouser.component';

describe('VerificacaouserComponent', () => {
  let component: VerificacaouserComponent;
  let fixture: ComponentFixture<VerificacaouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificacaouserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacaouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
