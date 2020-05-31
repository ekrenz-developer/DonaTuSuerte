import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { OrganizationService } from '../../services/organization.service';
import Swal from 'sweetalert2';
import { StoreService } from '../../services/store.service';
import { DrawService } from 'src/app/services/draw.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';

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
    private storeService: StoreService,
    private drawService: DrawService) {
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
      "cuit": Number,
      "name": ""
    }

  registerOrganization() {
    this.orgService.createOrganization(this.organization);
  }

  loadStores(id) {
    this.user.organizations.forEach(organization => {
      if (organization._id == id) {
        this.organizationSelected = organization;
      }
    });

    this.showOrganizations = false;
    this.showStores = true;
  }

  loadDraws(id) {
    this.storeService.getStore(id).then(data => {
      let response: any = data;
      this.storeSelected = response.data;
      this.showDraws = true;
      this.showStores = false;
      console.log(this.storeSelected)
    })
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
        this.orgService.deleteOrganization(this.organizationSelected._id)
      }
    })
  }

  updateOrganization() {
    this.orgService.updateOrganization(this.organizationSelected);
  }


  showNewStoreForm = false;
  newStore() {
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

  createNewStore() {
    this.storeService.addStore(this.store, this.organizationSelected._id)
  }

  goBackOrganizations() {
    this.showStores = false;
    this.showOrganizations = true;
  }


  deleteStore() {
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
        this.storeService.deleteStore(this.storeSelected._id, this.organizationSelected._id)
      }
    })
  }

  goBackStores() {
    this.showStores = true;
    this.showDraws = false;
  }


  updateStore() {
    this.storeService.updateStore(this.storeSelected)
  }

  formData = new FormData();

  newDraw =
    {
      "description": "",
      "prize": null,
      "photo": ""
    }

  addDraw() {
    Object.keys(this.newDraw).forEach((key) => { this.formData.append(key, this.newDraw[key]) });
    Object.keys(this.newDraw).forEach((key) => { console.log(key + ": " + this.formData.get(key)) });

    this.drawService.createDraw(this.formData, this.storeSelected._id);

  }






  onFileSelected(event) {
    this.formData.append('photo', event.target.files[0])
    console.log(event.target.files[0])
  }


  drawSelected: any;
  showDraw = false;

  loadDraw(idDraw) {
    this.storeSelected.draws.forEach(draw => {
      if (draw._id = idDraw) {
        this.drawSelected = draw;
        this.showDraws = false;
        this.showDraw = true;
        console.log ( draw )
      }
    });
  }

  goBackDraws()
  {
    this.showDraw = false;
    this.showDraws = true;
  }


  updateDraw()
  {
    let body = 
    {
      "_id": this.drawSelected._id,
      "description": this.drawSelected.description,
      "startDate": this.drawSelected.startDate,
      "endDate": this.drawSelected.endDate,
    }

    this.drawService.updateDraw( body )

  }

  
  deleteDraw() {
    Swal.fire({
      title: '¿Seguro que quiere proceder?',
      text: "Se eliminará el sorteo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.drawService.deleteDraw(this.storeSelected._id, this.drawSelected._id)
      }
    })
  }


  executeDraw()
  {
    Swal.fire({
      title: 'Esta por sortear este premio ! ',
      text: "Se buscará al ganador del premio entre las rifas sorteadas",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SORTEAR ! ',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.drawService.executeDraw( this.drawSelected._id )
      }
    })
  }

}
