import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadUserComponent } from './localidad-user.component';

describe('LocalidadUserComponent', () => {
  let component: LocalidadUserComponent;
  let fixture: ComponentFixture<LocalidadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalidadUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalidadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
