import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  id: any;
  tipo: any;
  token!: any;
administrador!:Admin;

  constructor(private activateRoute: ActivatedRoute,private router:Router ,private adminService:AdminService, private toastr:ToastrService) { 
    this.administrador = new Admin();
  }

   
  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo");
    this.cargarAdministrador(this.id);
    this.token = sessionStorage.getItem("token")
    console.log(this.administrador);
  }

  cargarAdministrador(id: string) {
    this.administrador = new Admin();
    this.adminService.getAdmin(id).subscribe(
      result => {
        Object.assign(this.administrador, result[0]);
      },
      error => {
      }
    )
  }
  
  modificarAdministrador(){
    this.adminService.putAdministrador(this.administrador).subscribe(
      (result: any) => {
        if (result.status == 1){
          this.toastr.success('Administrador modificado');
          this.router.navigate(["admin"])
        }
  },
      error => {
        alert(error.msg);
      }
    )
  }

  regresar(){
    this.router.navigate(['admin']);
  }


}
