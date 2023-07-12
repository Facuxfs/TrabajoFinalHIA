import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDatosComponent } from './gestor-datos.component';

describe('GestorDatosComponent', () => {
  let component: GestorDatosComponent;
  let fixture: ComponentFixture<GestorDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
