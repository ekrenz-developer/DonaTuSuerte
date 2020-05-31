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
  
  deleteStore( storeId , orgId )
  {
    let uri = '/organizations/'+ orgId +'/stores/' + storeId;

    return this.request.delete ( uri  ).then ( data => { return data })
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

    return this.request.put ( uri , body )
  }

}
