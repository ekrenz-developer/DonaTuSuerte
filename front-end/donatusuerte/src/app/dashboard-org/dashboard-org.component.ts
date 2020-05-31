import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { OrganizationService } from '../services/organization.service';
import Swal from 'sweetalert2';
import { StoreService } from '../services/store.service';

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

  constructor(
    private router: Router, 
    private login: LoginService, 
    private orgService: OrganizationService, 
    private storeService : StoreService) 
    {
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

    // this.orgService.getOrganization(id).then(data => {
    //   this.organizationSelected = data;
    //   this.showOrganizations = false;
    //   this.showStores = true;
    //   console.log(data)
    // })

    this.user.organizations.forEach( organization => {
      if ( organization._id == id )
      {
        this.organizationSelected = organization;
      }
    });

    this.showOrganizations = false;
      this.showStores = true;
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


  deleteOrganization() {
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

        this.orgService.deleteOrganization(this.organizationSelected._id)
          .then(data => {
            Swal.fire(
              'Organizacion eliminada con éxito',
              'Se reflejará en tu lista de organizaciones',
              'success'
            )
          })

      }
    })
  }

  updateOrganization(){
    this.orgService.updateOrganization( this.organizationSelected )
    .then ( data => {
       
      Swal.fire({
        icon: 'success',
        title: 'Organización Actualiazada con éxito',
        showConfirmButton: false,
        timer: 3000
      })
    });
  }


  showNewStoreForm = false;
  newStore(){
    this.showNewStoreForm = true;
  }

 store = 
  {
    "name": "",
    "address": {
      "street": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "country": "",
      "lat": "-34.61020399",
      "lon": "-58.42448026"
    }
  }

  createNewStore ()
  {
    this.storeService.addStore ( this.store , this.organizationSelected._id )
    .then ( data => {
      Swal.fire('Sucursal creada', 'Ahora puedes crear sorteos para dicha sucursal' , 'success')
    })
    this.showNewStoreForm = false;
  }

  goBackOrganizations(){
    this.showStores = false;
    this.showOrganizations = true;
  }


  deleteStore ()
  {
    Swal.fire({
      title: '¿Seguro que quiere proceder?',
      text: "Se eliminarán todos los sorteos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.storeService.deleteStore ( this.storeSelected._id , this.organizationSelected._id )
        .then ( data => {
          Swal.fire(
            'Sucursal eliminada con éxito',
            'Se reflejará en tu lista de sucursales',
            'success'
          )
        })
      }
    })
  }

  goBackStores()
  {
    this.showStores = true;
    this.showDraws = false;
  }


  updateStore()
  {
    this.request.updateStore( this.storeSelected )
    .then ( data => {
       
      Swal.fire({
        icon: 'success',
        title: 'Sucursal Actualiazada con éxito',
        showConfirmButton: false,
        timer: 3000
      })
    });
  }
  

}
