import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarpedidoComponent } from './finalizarpedido.component';

describe('FinalizarpedidoComponent', () => {
  let component: FinalizarpedidoComponent;
  let fixture: ComponentFixture<FinalizarpedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarpedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarpedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
