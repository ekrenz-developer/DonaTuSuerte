import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor( private request : RequestService) { }

  addStore( body , orgId )
  {
    let uri = "/organizations/" + orgId  + "/stores" ; 
    this.request.post ( uri , body ).then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Sucursal creada',
          text : 'Ahora puedes crear sorteos para dicha sucursal',
          showConfirmButton: false,
          timer: 2000
        }).then ( data => {
          document.location.reload()
        })
      })
  }
  
  deleteStore( storeId , orgId )
  {
    let uri = '/organizations/'+ orgId +'/stores/' + storeId;

    return this.request.delete ( uri  ).then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Sucursal eliminada con éxito',
          text : 'Se reflejará en tu lista de sucursales',
          showConfirmButton: false,
          timer: 1500
        }).then ( data => {
          window.location.reload()
        })
       })
  }


  updateStore ( store )
  {
    let uri = '/stores/' + store._id;
    let body =  {
      "name": store.name,
      "address": {
        "street": store.address.street,
        "city": store.address.city,
        "state": store.address.state,
        "postalCode": store.address.postalCode,
        "country": store.address.country,
        "lat": store.address.lat,
        "lon": store.address.lon
      }
    }

    return this.request.put ( uri , body ).then ( data => {
      Swal.fire({
        icon: 'success',
        title: 'Sucursal Actualiazada con éxito',
        showConfirmButton: false,
        timer: 3000
      }).then( data => {window.location.reload()})
    })
  }

}
