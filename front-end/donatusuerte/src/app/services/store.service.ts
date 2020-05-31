import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor( private request : RequestService) { }
}
