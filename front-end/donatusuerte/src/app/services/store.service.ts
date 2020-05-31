import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor( private request : RequestService) { }

  addStore( body , orgId )
  {
    let uri = "/organizations/" + orgId  + "/stores" ; 
     return this.request.post ( uri , body ).then ( data => { return data })
  }
  
}
