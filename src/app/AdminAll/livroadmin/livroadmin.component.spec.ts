import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroadminComponent } from './livroadmin.component';

describe('LivroadminComponent', () => {
  let component: LivroadminComponent;
  let fixture: ComponentFixture<LivroadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
