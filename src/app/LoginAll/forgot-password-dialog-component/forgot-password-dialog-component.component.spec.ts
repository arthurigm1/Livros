import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordDialogComponentComponent } from './forgot-password-dialog-component.component';

describe('ForgotPasswordDialogComponentComponent', () => {
  let component: ForgotPasswordDialogComponentComponent;
  let fixture: ComponentFixture<ForgotPasswordDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
