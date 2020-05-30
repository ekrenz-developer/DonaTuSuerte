import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  // server connection url 
  private url: String = "";

  // headers to connect server 
  private getHeaders() {
    if (localStorage.getItem('token')) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
    }
    return null;
  }

  constructor(private http: HttpClient) { }

  post(body, uri) {
    let header: HttpHeaders = this.getHeaders()

    if (header != null) {
      return this.http.post(this.url + uri, body, { headers: this.getHeaders() }).toPromise()
        .then(data => { return data; })
        .catch(err => { return err; })
    }
    return this.http.post(this.url + uri, body ).toPromise()
      .then(data => { return data; })
      .catch(err => { return err; })
  }


   get ( uri  )
  {
    let url = this.url + uri;

    return this.http.get( url ,  {headers : this.getHeaders() } ).toPromise().then ( data => { return data; })
  } 

}
