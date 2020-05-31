import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-dashboard-org',
  templateUrl: './dashboard-org.component.html',
  styleUrls: ['./dashboard-org.component.css']
})
export class DashboardOrgComponent implements OnInit {


  user : any
  showOrganizations = true;
  showStores = false;

  organizationSelected: any;

  constructor( private router : Router , private login : LoginService , private orgService : OrganizationService) { 
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
    console.warn ('get organization ' + id)

    this.orgService.getOrganization( id ).then ( data => {
      this.organizationSelected = data;
      this.showOrganizations = false;
      this.showStores = true;
      console.log ( data )
  })}
}
