import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Leerling }                 from '../Leerling/Leerling';

@Injectable()
export class LeerlingService {
  constructor(private http: Http) {}

  private headers = new Headers({ 'Content-Type': 'application/json' });  
//  private baseUrl = "http://rollingsticks.test.carpago.nl/api/leerling";  
  private baseUrl = "http://localhost:8082/api/leerling";   //voor lokaal testen: 

  getLeerlingById(id: number): Observable<Leerling> {
    return this.http.get(this.baseUrl+"/" + id).map(res => res.json());
  }

  getLeerlingen(): Observable<Leerling[]> {
    return this.http.get(this.baseUrl).map(res => res.json());
  }
}
