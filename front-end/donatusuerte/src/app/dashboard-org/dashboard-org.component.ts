import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { OrganizationService } from '../services/organization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-org',
  templateUrl: './dashboard-org.component.html',
  styleUrls: ['./dashboard-org.component.css']
})
export class DashboardOrgComponent implements OnInit {



  showOrganizations = true;
  showStores = false;
  showDraws = false;

  user: any
  organizationSelected: any;
  storeSelected: any;

  constructor(private router: Router, private login: LoginService, private orgService: OrganizationService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.updateComponent()
  }

  updateComponent() {
    this.login.getUser().then(data => {
      let response: any = data;
      this.user = response.data;

    })
  }

  ngOnInit(): void {
  }

  loadStores(id) {
    console.warn('get organization ' + id)

    this.orgService.getOrganization(id).then(data => {
      this.organizationSelected = data;
      this.showOrganizations = false;
      this.showStores = true;
      console.log(data)
    })
  }

  loadDraws(id) {
    this.organizationSelected.stores.forEach(store => {
      if (store._id == id) {
        this.storeSelected = store;
      }
    });

    this.showDraws = true;
    this.showStores = false;
  }


  deleteOrganization()
  {
    Swal.fire({
      title: '¿Seguro que quiere proceder?',
      text: "Se eliminará las sucursales y todos los sorteos incluidos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.orgService.deleteOrganization ( this.organizationSelected._id )
        .then ( data => {
          Swal.fire(
            'Organizacion eliminada con éxito',
            'Se reflejará en tu lista de organizaciones',
            'success'
          )
        })
        
      }
    })
  }

  
}
