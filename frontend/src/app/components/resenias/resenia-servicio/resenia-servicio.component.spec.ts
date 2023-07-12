import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaServicioComponent } from './resenia-servicio.component';

describe('ReseniaServicioComponent', () => {
  let component: ReseniaServicioComponent;
  let fixture: ComponentFixture<ReseniaServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseniaServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
