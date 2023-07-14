import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEstadisticaComponent } from './usuario-estadistica.component';

describe('UsuarioEstadisticaComponent', () => {
  let component: UsuarioEstadisticaComponent;
  let fixture: ComponentFixture<UsuarioEstadisticaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioEstadisticaComponent]
    });
    fixture = TestBed.createComponent(UsuarioEstadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
