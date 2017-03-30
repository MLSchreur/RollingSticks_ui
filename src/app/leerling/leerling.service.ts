import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Leerling }                 from './leerling';

@Injectable()
export class LeerlingService {
  constructor(private http: Http) {
    this.defineBaseUrl();
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });  
//  private baseUrl = "http://rollingsticks.test.carpago.nl/api/leerling";  
  private baseUrl = "http://localhost:8082/api/leerling";   //voor lokaal testen: 

  getLeerlingById(id: number): Observable<Leerling> {
    return this.http.get(this.baseUrl+"/" + id).map(res => res.json());
  }

  getLeerlingen(): Observable<Leerling[]> {
    return this.http.get(this.baseUrl).map(res => res.json());
  }

  private defineBaseUrl() {
    let hostName: string = window.location.hostname;
    console.log(hostName);
    if (hostName.substring(0,5) == "local") {
      this.baseUrl = "http://localhost:8082/api/leerling";
    } else {
      this.baseUrl = "http://rollingsticks.test.carpago.nl/api/leerling";
    }
    console.log("Base url: " + this.baseUrl);
  }
  
}
