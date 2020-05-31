import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor( private request : RequestService ) { }

  createDraw ( body , storeId )
  {
    let uri = '/stores' + storeId + '/draws'
    this.request.post ( uri , body )
    .then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Sorteo creado !!',
          showConfirmButton: false,
          timer: 3000
        }).then( data => { window.location.reload() })
      });
  }
}
