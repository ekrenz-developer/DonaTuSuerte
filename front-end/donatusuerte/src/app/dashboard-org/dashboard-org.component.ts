import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dashboard-org',
  templateUrl: './dashboard-org.component.html',
  styleUrls: ['./dashboard-org.component.css']
})
export class DashboardOrgComponent implements OnInit {


  user : any
  showOrganizations = true;

  constructor( private router : Router , private login : LoginService) { 
    this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
    this.updateComponent()
  }

  updateComponent(){
    this.login.getUser().then(data => {
      let response:any = data;
      this.user = response.data;

    })
  }

  ngOnInit(): void {
  }

  loadStores( id )
  {
    console.warn ('todo: loadStores()' + id)
  }

}
