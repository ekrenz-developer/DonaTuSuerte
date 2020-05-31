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
    let uri = '/stores/' + storeId + '/draws'
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


  updateDraw ( body )
  {
    let uri = '/draws/' + body._id

    this.request.put ( uri , body).then( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Sorteo actualizado correctamente',
          showConfirmButton: false,
          timer: 3000
        }).then( data => { window.location.reload() })
      })
  }

  deleteDraw( storeId , drawId )
  {
    let uri = '/stores/'+ storeId +'/draws/' + drawId;

    return this.request.delete ( uri  ).then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Sorteo eliminado con éxito',
          text : 'Se reflejará en tu lista de sorteos',
          showConfirmButton: false,
          timer: 1500
        }).then ( data => {
          window.location.reload()
        })
       })
  }
}
