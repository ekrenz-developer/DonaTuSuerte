import { Injectable } from '@angular/core';
import { CanActivate,  Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor ( private router : Router){}

  canActivate()
  {
    if ( this.router.getCurrentNavigation().extractedUrl.root.children.primary.segments[0].path == 'sign-in' )
    {
      if ( localStorage.getItem ('id') != null && localStorage.getItem ('id') != "" ){
        this.router.navigate ( ['/dashboard']  );
        return false;
      }else{
        return true;
      }
    }
    else if ( localStorage.getItem ('id') != null && localStorage.getItem ('id') != "" )
    {
      return true
    }else{
      this.router.navigate ( ['/sign-in']  );
      return false;
    }
  }
}
