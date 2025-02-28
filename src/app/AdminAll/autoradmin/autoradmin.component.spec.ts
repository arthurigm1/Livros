import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoradminComponent } from './autoradmin.component';

describe('AutoradminComponent', () => {
  let component: AutoradminComponent;
  let fixture: ComponentFixture<AutoradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoradminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
