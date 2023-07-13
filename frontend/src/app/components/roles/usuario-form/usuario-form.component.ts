import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {
  form!: FormGroup;
  //emailCtrl=new FormControl('',[Validators.required]);///validacion sincrona ''; validacion asincrona []
  emailExist: boolean = false;
  usuario: Usuario;
  fechaNacimiento!: Date;
  fechaActual: Date = new Date();
  opcion: any;
  id: any;
  accion: string = "";
  showPassword: boolean = false;

  constructor(private userService: UsuarioService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.usuario = new Usuario();
    
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
      this.userService.getusuario(this.id).subscribe(
        (res: any) => {
          Object.assign(this.usuario, res);
        },
        err => {
          console.log(err);
        }
      )
    }
    else {
      this.accion = "new";
    }
  }

  private buildForm() {
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

  async save(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      await Object.assign(this.usuario, this.form.value);

      this.usuario.edad = await this.calculoEdad(this.form.value.fechaNacimiento);
      await this.guardarUsuario();
      console.log(this.usuario);

    } else {
      this.form.markAllAsTouched();
    }
  }

  calculoEdad(fechaNa: string): number {
    this.fechaNacimiento = new Date(fechaNa);
    const diferencia = this.fechaActual.getTime() - this.fechaNacimiento.getTime()

    return Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
  }

  guardarUsuario() {
    if (this.opcion == 0) {
      this.userService.guardarUsuario(this.usuario)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.router.navigate(['/login']);
          },
          err => {
            console.log(err);
          }
        )
    } else {
      this.userService.actualizarUsuario(this.usuario)
        .subscribe(
          (res: any) => {

            console.log(res);
          },
          err => {
            console.log(err)
          }
        )
    }
  }

  /**
  cancelar() {
    if (this.botonCancelar == true) {
      this.router.navigate(['/usuario/datos']);
    } else {
      this.router.navigate(['/home']);
    }
  }
  */

  // Validador personalizado para verificar la longitud del DNI
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

  //Validador Personalisado para chekear el Email 
  /*chekearEmail():ValidatorFn{
    return async (control: AbstractControl) => {
      const value = control.value;
      const res = await this.userService.findEmail(value).toPromise();
      console.log(res)
      return res ==true ? { emailExists: true } : null;
    };
  }*/

  findEmail(email: string) {
    this.userService.findEmail(email)
      .subscribe(
        (res: any) => {
          this.emailExist = res as boolean;
        },
        err => {
          console.log(err);
        }
      )
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
}
