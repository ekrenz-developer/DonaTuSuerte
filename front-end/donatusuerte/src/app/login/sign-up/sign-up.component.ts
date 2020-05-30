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

  formData = new FormData();

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

  selectRole(roleSelected) {
    this.user.role = roleSelected;
    this.showSignUpForm = true;
    this.showRoles = false;
  }

  onFileSelected(event) {

    this.formData.append('photo', event.target.files[0])
  }

  signUp() {
    Object.keys(this.user).forEach((key) => { this.formData.append(key, this.user[key]) });
    Object.keys(this.user).forEach((key) => { console.log(key + ": " + this.formData.get(key)) });
    this.request.signUp(this.formData);
  }

  changeUser() {
    this.showRoles = true;
    this.showSignUpForm = false;
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
