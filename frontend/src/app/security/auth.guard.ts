import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthService } from "../services/authService.service";
import { Observable, take, tap } from "rxjs";

@Injectable({providedIn:"root"})
export class AuthGuard implements CanActivate{
   
    constructor(private authService:AuthService,private router:Router){

    }

    canActivate():Observable<boolean>{
        
       return this.authService.isAuthenticated$()
        .pipe(
            take(1),
           tap((isLoginIn)=> !isLoginIn ? this.router.navigate(['/login']):true)
        )
    }
}