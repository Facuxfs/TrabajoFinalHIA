import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/roles/login/login.component';
import { UsuarioComponent } from './components/roles/usuario/usuario.component';
import { GestorComponent } from './components/roles/gestor/gestor.component';
import { AdminComponent } from './components/roles/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { ReseniaComponent } from './components/resenias/resenia/resenia.component';
import { ReseniaFormComponent } from './components/resenias/resenia-form/resenia-form.component';
import { GestorFormComponent } from './components/roles/gestor-form/gestor-form.component';
import { LocalidadUserComponent } from './components/localidad-user/localidad-user.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { UsuarioFormComponent } from './components/roles/usuario-form/usuario-form.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { ServicioFormComponent } from './components/servicio-form/servicio-form.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { UsuarioDatosComponent } from './components/roles/usuario-datos/usuario-datos.component';
import { ReseniaUsuarioComponent } from './components/resenias/resenia-usuario/resenia-usuario.component';
import { ReseniaServicioComponent } from './components/resenias/resenia-servicio/resenia-servicio.component';
import { GestorDatosComponent } from './components/roles/gestor-datos/gestor-datos.component';
import { AdminFormComponent } from './components/roles/admin-form/admin-form.component';
import { GestorEstadisticaComponent } from './components/roles/gestor-estadistica/gestor-estadistica.component';
import { AuthGuard } from './security/auth.guard';
import { UsuarioEstadisticaComponent } from './components/roles/usuario-estadistica/usuario-estadistica.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
   //viajeros
  { path: 'usuario', component: UsuarioComponent},
  { path: 'usuario/datos', component: UsuarioDatosComponent},
  { path: 'usuario/resenia', component: ReseniaUsuarioComponent },
  { path: 'usuario-form/:id', component: UsuarioFormComponent },
  { path: 'usuario-estadistica', component: UsuarioEstadisticaComponent },
  { path: "gestor", component: GestorComponent },
  { path: 'gestor/gestor-datos', component: GestorDatosComponent },
  { path: 'gestor/servicio/:id', component: ServicioFormComponent },
  { path: "gestor-form/:id", component: GestorFormComponent },
  { path: 'gestor/estadistica', component: GestorEstadisticaComponent },
   //admin
  { path: "admin", component: AdminComponent },
  { path: "admin-form/:id", component: AdminFormComponent },
  
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'ciudad', component: CiudadesComponent },

  { path: 'resenia', component: ReseniaComponent },
  { path: 'reseniaSer/:servicio', component: ReseniaServicioComponent },
  { path: 'reseniaForm/:id/:servicio', component: ReseniaFormComponent },
  { path: 'reseniaForm/:id', component: ReseniaFormComponent },
  //{ path: "", redirectTo: "resenia", pathMatch: "full" },
  { path: 'localidad-user/:nombre/:id', component: LocalidadUserComponent },
  //{ path: "", redirectTo: "resenia", pathMatch: "full" }

  { path: 'servicio', component: ServicioComponent },
  { path: 'servicio-form', component: ServicioFormComponent },
  { path: 'reserva', component: ReservaComponent },//no funcional
  { path: 'reservaForm/:id/:idServicio', component: ReservaFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
