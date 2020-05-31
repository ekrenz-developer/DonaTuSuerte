import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { OrganizationService } from '../../services/organization.service';
import Swal from 'sweetalert2';
import { StoreService } from '../../services/store.service';
import { DrawService } from 'src/app/services/draw.service';

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
    private storeService : StoreService,
    private drawService : DrawService) 
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

  organization = 
  {
    "cuit"  : Number,
    "name"  : ""
  }

  registerOrganization()
  {
    this.orgService.createOrganization( this.organization );
  }

  loadStores(id) {
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
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.orgService.deleteOrganization(this.organizationSelected._id)}
    })
  }

  updateOrganization(){
    this.orgService.updateOrganization( this.organizationSelected );
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
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.storeService.deleteStore ( this.storeSelected._id , this.organizationSelected._id )
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
    this.storeService.updateStore( this.storeSelected )
  }

  formData = new FormData();

  newDraw = 
  {
    "description" : "",
    "prize" : null,
    "photo" : ""
  }

  addDraw()
  {
    Object.keys(this.newDraw).forEach((key) => { this.formData.append(key, this.newDraw[key]) });
    Object.keys(this.newDraw).forEach((key) => { console.log(key + ": " + this.formData.get(key)) });

    this.drawService.createDraw ( this.formData , this.storeSelected._id );

  }

  
  onFileSelected(event)
  {
    this.formData.append('photo', event.target.files[0])
    console.log ( event.target.files[0])
  }

}
