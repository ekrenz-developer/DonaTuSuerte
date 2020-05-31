import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

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

    return this.request.delete ( uri  ).then ( data => {return data })
  }
}
