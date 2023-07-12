import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDatosComponent } from './usuario-datos.component';

describe('UsuarioDatosComponent', () => {
  let component: UsuarioDatosComponent;
  let fixture: ComponentFixture<UsuarioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
