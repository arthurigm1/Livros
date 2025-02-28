import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditoraadminComponent } from './editoraadmin.component';

describe('EditoraadminComponent', () => {
  let component: EditoraadminComponent;
  let fixture: ComponentFixture<EditoraadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditoraadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditoraadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
