import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorEstadisticaComponent } from './gestor-estadistica.component';

describe('GestorEstadisticaComponent', () => {
  let component: GestorEstadisticaComponent;
  let fixture: ComponentFixture<GestorEstadisticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestorEstadisticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorEstadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
