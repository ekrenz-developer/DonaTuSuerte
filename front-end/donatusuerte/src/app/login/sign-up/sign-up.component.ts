import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  roles = [];
  user = {
    "email": "",
    "password": "",
    "photo": "",
    "firstName": "",
    "lastName": "",
    "dateOfBirth": "",
    "country": "",
    "address": {
      "street": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "country": "",
      "lat": "1234",
      "lon": "1234"
    },
    "phone": "",
    "conditions": false,
    "score": 0,
    "role": ""
  }



  showRoles = false;
  showSignUpForm = false;

  formData = new FormData();

  constructor(private request: LoginService) {
     request.getRoles().then(data => {
       let response: any = data;
       this.roles = response.data;
       
       request.getRolesDesc().then(data => {
         this.roles.forEach(role => {
           role.description = data[role.role]
           this.showRoles = true;
         })

         this.roles = this.roles.filter ( rol =>{
          if ( rol.description != undefined ) return rol;
        })
         
       })
       
     })
  }

  ngOnInit(): void {
  }

  selectRole(roleSelected) {
    this.user.role = roleSelected;
    this.showSignUpForm = true;
    this.showRoles = false;
  }

  

  onFileSelected(event) {

    this.formData.append('photo', event.target.files[0])
    console.log ( event.target.files[0])
  }

  signUp() {
    console.log ( this.user )
    Object.keys(this.user).forEach((key) => { this.formData.append(key, this.user[key]) });
    Object.keys(this.user).forEach((key) => { console.log(key + ": " + this.formData.get(key)) });

    if ( this.fieldOk() )
    {
      this.request.signUp( this.formData );
    }
    else{
      this.showError ( )
    }
  }

  showError () {
    Swal.fire ('Campos incompletos' , 'Por favor complete los datos' , 'error' )
  }

  fieldOk ()
  {
    let value; 
    let fielOK = true;


    Object.keys(this.user).forEach((key) => { 
      console.log(key + ": " + this.formData.get(key)) 
      value = this.formData.get( key );
      
      if ( value == null  ||  value == "" ){
        console.log ( value )
        fielOK = false;
      } 
    });

    return fielOK;
  }

  changeUser() {
    this.showRoles = true;
    this.showSignUpForm = false;
  }


 


}
