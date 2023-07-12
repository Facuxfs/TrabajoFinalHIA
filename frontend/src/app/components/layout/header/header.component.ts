import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  id: any;
  tipo!:string;
  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {    

    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo") as string;
    console.log("es: "+this.tipo);
  }

  logout() {
    this.loginService.logout();
  }


}
