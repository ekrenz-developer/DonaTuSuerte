import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { RequestService } from './request.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private request: RequestService, private router: Router, private http: HttpClient) { }

  currentUser;

  signUp(body: any) {
    let uri = "/users/sign-up";

    this.request.post(uri, body)
      .then(data => {
        let response: any = data;
        this.currentUser = response;
         console.log ( data ) 
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
          title: err,
          showConfirmButton: false,
          timer: 5000
        })
      })
  }


  signIn(user, pass) {

    let body = {
      "email": user,
      "password": pass
    }

    this.request.post('/users/sign-in', body)
      .then(data => {
        
        let response: any = data;
        console.log(response.data.user)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.user._id)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        Swal.fire({
          icon: 'success',
          title: 'Inicio correctamente como: ' + response.data.user.firstName + " " + response.data.user.lastName,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate ( ['/dashboard-organization'])
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Fallo en inicio de sesion',
          text: 'Usuario o contraseña incorrecta',
        })
      })
  }

  getRolesDesc() {
    return this.http.get("./assets/properties/roles.json").toPromise().then(data => { return data; })
  }

  getRoles()
  {
    let uri = '/roles';
    return this.request.get ( uri ).then( data => { return data} )
  }

}
