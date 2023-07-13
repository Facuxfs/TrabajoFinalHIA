import { Component, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestor } from 'src/app/models/gestor';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-gestor-form',
  templateUrl: './gestor-form.component.html',
  styleUrls: ['./gestor-form.component.css']
})

export class GestorFormComponent implements OnInit {

  gestor!: Gestor;
  accion: string = "";
  showPassword: boolean = false;
  form!: FormGroup;

  opcion: any;
  id: any;

  constructor(private gestorService: GestorService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.gestor = new Gestor();

    this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.opcion = params['id'];
      }
    );

    if (this.opcion == 1) {
      this.accion = "update";

      this.id = sessionStorage.getItem('userId');

      this.cargarGestor();      
    }
    else {
      this.accion = "new";
    }
  }

  /**
   * Carga los datos de un Gestor
   * @param idGestor 
   */
  cargarGestor() {
    this.gestorService.getGestor(this.id).subscribe(
      result => {
        Object.assign(this.gestor, result);
      },
      error => {
        console.log(error)
      }
    );
  }

  /**
   * Modifica los datos de un Gestor
   */
  modificarGestor() {
    this.gestorService.putGestor(this.gestor).subscribe(
      (result: any) => {
        if (result.status == 1) {
          this.router.navigate(["gestor/gestor-datos"])
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * Guarda un Gestor en la BDD
   * @param gestorForm 
   */
  guardarGestor(): void {
    if (this.opcion == 0) {
      this.gestorService.postGestor(this.gestor).subscribe(
        (res: any) => {
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this.gestorService.putGestor(this.gestor).subscribe(
        (res: any) => {
          if (res.status == 1) {
            console.log(this.gestor);

            this.router.navigate(["gestor/gestor-datos"])
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  /**
   * Ocultar o visualizar la password
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;

    const passwordInput = document.getElementById('idPassword');

    if (this.showPassword) {
      this.renderer.setAttribute(passwordInput, 'type', 'text');
    } else {
      this.renderer.setAttribute(passwordInput, 'type', 'password');
    }
  }

  /**
   * Valida el formulario
   */
  private buildForm(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@(?:gmail|hotmail)\.[a-zA-Z]{2,}$/)]],
      dni: ['', [Validators.required, this.dniLengthValidator()]],
      fechaNacimiento: ['', [Validators.required]],
    });
  }

  /**
   * Validar longitud del DNI
   * @returns 
   */
  dniLengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      const length = value ? value.toString().length : 0;

      if (length !== 8) {
        return { dniLength: true };
      }

      return null;
    };
  }

  /**
   * Carga los datos del formulario en un nuevo Gestor
   * @param event 
   */
  async save(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      await Object.assign(this.gestor, this.form.value);

      this.gestor.calcularEdad();

      await this.guardarGestor();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
