import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.css']
})
export class DashboardContentComponent implements OnInit {

  user : any;


  constructor(private login : LoginService)
    {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.updateComponent()
  }

  updateComponent() {
    this.login.getUser().then(data => {
      let response: any = data;

      let strUser = JSON.stringify ( this.user );
      let strnewUser = JSON.stringify ( response.data );

      if ( strUser != strnewUser )
      {
        this.user = response.data;
        window.location.reload();
      }
    })
  }

  ngOnInit(): void {
  }

}
