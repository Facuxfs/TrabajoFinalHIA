import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { LoginComponent } from './components/roles/login/login.component';
import { LoginService } from './services/login.service';
import { UsuarioComponent } from './components/roles/usuario/usuario.component';
import { GestorComponent } from './components/roles/gestor/gestor.component';
import { AdminComponent } from './components/roles/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ReseniaComponent } from './components/resenias/resenia/resenia.component';
import { ReseniaFormComponent } from './components/resenias/resenia-form/resenia-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GestorFormComponent } from './components/roles/gestor-form/gestor-form.component';
import { LocalidadUserComponent } from './components/localidad-user/localidad-user.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { UsuarioFormComponent } from './components/roles/usuario-form/usuario-form.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReseniaServicioComponent } from './components/resenias/resenia-servicio/resenia-servicio.component';
import { ReseniaUsuarioComponent } from './components/resenias/resenia-usuario/resenia-usuario.component';
import { UsuarioDatosComponent } from './components/roles/usuario-datos/usuario-datos.component';
import { GestorDatosComponent } from './components/roles/gestor-datos/gestor-datos.component';
import { AdminFormComponent } from './components/roles/admin-form/admin-form.component';
import { GestorEstadisticaComponent } from './components/roles/gestor-estadistica/gestor-estadistica.component';
import { ToastrModule } from 'ngx-toastr';
import { UsuarioEstadisticaComponent } from './components/roles/usuario-estadistica/usuario-estadistica.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    UsuarioComponent,
    GestorComponent,
    AdminComponent,
    HomeComponent,
    CiudadesComponent,
    ReseniaComponent,
    ReseniaFormComponent,
    UsuarioFormComponent,
    GestorFormComponent,
    LocalidadUserComponent,
    UsuarioFormComponent,
    ServicioComponent,
    ServicioFormComponent,
    ReservaComponent,
    ReservaFormComponent,
    ReseniaServicioComponent,
    ReseniaUsuarioComponent,
    UsuarioDatosComponent,
    GestorDatosComponent,
    AdminFormComponent,
    GestorEstadisticaComponent,
    UsuarioEstadisticaComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
      
    }
  ],
 
  bootstrap: [AppComponent],
})

export class AppModule { }

