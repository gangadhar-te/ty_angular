import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:Router,
    private auth:AuthService
  ){}

  canActivate(route:ActivatedRouteSnapshot){
   const roles = route.data.roles as Array<string>;
   console.log(roles);

   const userDetails = this.auth.getUserDetails();
   if(userDetails && roles.includes(userDetails.role))
   {
     return true;
   }
   else {
     this.router.navigateByUrl(`/login`);
     return false;
   }
   
  }


  }
  

