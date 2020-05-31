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

  constructor(  )
  {
    this.user = JSON.parse( localStorage.getItem ( 'user' ) ); 
  }

  ngOnInit() {
  }
}
