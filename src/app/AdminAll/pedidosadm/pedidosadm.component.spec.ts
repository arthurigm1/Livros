import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosadmComponent } from './pedidosadm.component';

describe('PedidosadmComponent', () => {
  let component: PedidosadmComponent;
  let fixture: ComponentFixture<PedidosadmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosadmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosadmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
