import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private login: LoginService) { }

  ngOnInit(): void {
  }

  user = {
    "email": "",
    "password": "",
  }

  signIn() {
    this.login.signIn(this.user.email, this.user.password)
  }

}
