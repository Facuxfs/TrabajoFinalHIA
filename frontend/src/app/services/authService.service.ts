import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class AuthService{

    private readonly isLoginIn = new BehaviorSubject<boolean>(false);

    isAuthenticated$():Observable<boolean>{
        const token = sessionStorage.getItem("token");
        if (token && token !== ""){
            this.isLoginIn.next(true);
        }
        return this.isLoginIn;
    }
}