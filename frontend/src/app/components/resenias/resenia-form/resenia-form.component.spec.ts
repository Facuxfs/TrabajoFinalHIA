import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseniaFormComponent } from './resenia-form.component';

describe('ReseniaFormComponent', () => {
  let component: ReseniaFormComponent;
  let fixture: ComponentFixture<ReseniaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReseniaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReseniaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
