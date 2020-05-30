import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestService } from './request.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private request: RequestService ,  private router: Router  , private http : HttpClient) { }

  signUp() {

  }

  currentUser;

  signIn( body : any ) {
    let uri = "/users/sign-up";

    this.request.post(uri, body )
      .then(data => {
        let response: any = data;
        this.currentUser = response;
        Swal.fire({
          icon: 'success',
          title: 'Registro Correcto como: ' + response.data.firstName + " " + response.data.lastName,
          showConfirmButton: false,
          timer: 1500
        })

        this.router.navigate(['/sign-in']);

      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 5000
        })
      })
  }


  getRolesDesc ()
  {
    return this.http.get("./assets/properties/roles.json").toPromise().then ( data => { return data; })
  }

  getRoles ()
  {
    return this.http.get("./assets/properties/roles.json").toPromise().then ( data => { return data; })
  }

}
