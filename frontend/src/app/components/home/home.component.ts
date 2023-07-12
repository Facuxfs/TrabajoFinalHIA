import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('staticBackdrop') staticBackdrop!: ElementRef;
  constructor(public loginService: LoginService,private router: Router) {
  }

  ngOnInit(): void {
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

}
