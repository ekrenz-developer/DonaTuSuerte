import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  roles = [];
  showRoles = false;
  showSignUpForm = false;


  constructor(private request: LoginService) {
    request.getRoles().then(data => {
      let response: any = data;
      this.roles = response.data;
      request.getRolesDesc().then(data => {
        this.roles.forEach(role => {
          role.description = data[role._id]
        })
      })
      this.showRoles = true;
    })
  }

  ngOnInit(): void {
  }


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
      "lat": "",
      "lon": ""
    },
    "phone": "",
    "conditions": false,
    "score": 0,
    "role": ""
  }


}
