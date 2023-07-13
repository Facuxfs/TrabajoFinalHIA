import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Login } from 'src/app/models/login.model';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('staticBackdrop') staticBackdrop!: ElementRef;

  log: Login = new Login();
  userUrl!: string;
  gestUrl!: string;
  adminUrl!: string;
  msgError!: string;
  falloLogin: boolean = false;
  showPassword: boolean = false;

  constructor(private loginS: LoginService, private router: Router, private route: ActivatedRoute, private appCom: AppComponent, private renderer: Renderer2) {
    this.appCom.logeado = false;
  }

  ngOnInit(): void {
    this.userUrl = this.route.snapshot.queryParams['returnUrl'] || '/usuario';
    this.gestUrl = this.route.snapshot.queryParams['returnUrl'] || '/gestor';
    this.adminUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  cerr() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //Cerrando el modal usando bootstrap
        console.log("comavio")
        $("#staticBackdrop").modal('hide');
      }
    })
  }

  login() {
    this.loginS.login(this.log.username, this.log.password)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == 1) {
            //GUARDAMOS EL USER EN COOKIES EN EL CLIENTE
            sessionStorage.setItem("user", res.userName);
            sessionStorage.setItem("userId", res.userId);
            sessionStorage.setItem("tipo", res.tipo);
            sessionStorage.setItem("token", res.token);
            if (res.tipo === 'user')
              this.router.navigateByUrl(this.userUrl);
            if (res.tipo === 'gest')
              this.router.navigateByUrl(this.gestUrl);
            if (res.tipo === 'admin')
              this.router.navigateByUrl(this.adminUrl);
          } else {
            this.falloLogin = true;
            this.msgError = "Datos incorrectos";
          }
        },
        err => {
          alert("Error de conexion");
          console.log("error en conexion");
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
