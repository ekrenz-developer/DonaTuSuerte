import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor( private request : RequestService) { }

  getOrganization ( orgId ){
    let uri = '/organizations/' + orgId ; 

    return this.request.get( uri ).then ( data => { 
      let response:any = data;
      return response.data; 
    }) 
  }


  deleteOrganization ( orgId )
  {
    let uri = '/organizations/' + orgId;

    return this.request.delete ( uri  ).then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Organizacion eliminada con éxito',
          text : 'Se reflejará en tu lista de organizaciones',
          showConfirmButton: false,
          timer: 1500
        }).then ( data => {
          window.location.reload()
        })
       })
  }

  updateOrganization( organization )
  {
    let uri = '/organizations/' + organization._id;

    let body =  {
      "cuit": organization.cuit ,
      "name": organization.name
    } 

     this.request.put ( uri , body  ).then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Organización Actualiazada con éxito',
          showConfirmButton: false,
          timer: 3000
        }).then (data=>{window.location.reload()})
      })
  }

  createOrganization( body ) 
  {
    return this.request.post (   '/organizations' , body ).then ( data => { 
      let response: any = data;
      localStorage.setItem ('organization' , JSON.stringify ( response.data ) );
      Swal.fire({
        icon: 'success',
        title: 'Organizacion registrada con éxito',
        text : 'Ahora puedes crear sucursales y sorteos',
        showConfirmButton: false,
        timer: 1500
      }).then ( data => {
        window.location.reload()
      }) })
  }

}
