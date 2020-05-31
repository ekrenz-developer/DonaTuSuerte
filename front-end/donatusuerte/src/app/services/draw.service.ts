import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor( private request : RequestService ) { }


  getDraws()
  {
    console.log ( "asd")
    return this.request.get ( '/draws' ).then( data => {
      let response: any = data;
       return response.data;
    })
  }
  
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

  
  enterDraw ( value , drawId)
  {
    let uri = '/draws/' + drawId + '/enter'
    let body = {
      "countRaffles": parseInt(value)
    }
    console.log ( body )
    return this.request.post (uri,body).then (data => {return data})
  }


  executeDraw ( drawId )
  {
    let uri = 'draws/' + drawId +  '/run'
    this.request.post ( uri  , null).then ( data => 
      {
        Swal.fire({
          icon: 'success',
          title: 'Sorteo realizado con exíto',
          text : '',
          showConfirmButton: false,
          timer: 1500
        }).then ( data => {
          window.location.reload()
        })
      })
  }
}
