import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user :any;

  constructor(  private orgService : OrganizationService )
  {
    this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
  }

  organization = 
  {
    "cuit"  : Number,
    "name"  : ""
  }

  ngOnInit() {
  }


  registerOrganization()
  {
    console.warn ( "request : create organization")
    this.orgService.createOrganization( this.organization ).then ( data => {
      let response: any = data;
      localStorage.setItem ('organization' , JSON.stringify ( response.data ) );
      console.log ( response.data )
      Swal.fire ( 'Organizacion registrada' , 'Ahora puedes crear sucursales y sorteos' , "success")
    } ) ;
  }

}
