import { Injectable }               from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Bladmuziek }               from '../bladmuziek/bladmuziek';

@Injectable()
export class BladmuziekService {

  // Op deze manier (http van class Http) wordt een private field aangemaakt.
  constructor(private http: Http) {

  }

  private headers = new Headers({ 'Content-Type': 'application/json' });  

  postBladmuziek(bladmuziek: Bladmuziek) {
    console.log("bladmuziek.service - postBladmuziek");
    return this.http.post("http://localhost:8082/api/bladmziek", JSON.stringify(bladmuziek), { headers: this.headers }).map(res => {
      console.log("New bladmuziek id = " + res.text());
    });
  }  
  
  // Ik beloof (observable, vroeger promise) dat ik een bladmuziek ga opsturen, maar zeg niet wanneer.
  // Oftewel asynchroon.
  // Wat je terugkrijgt is res, maar alleen het .json gedeelte wordt wat meegedaan. Terug naar aanroepende functie gaat dan alleen het json gedeelte
  getBladmuziekById(id: number): Observable<Bladmuziek> {
    return this.http.get("http://localhost:8082/api/bladmuziek/" + id).map(res => res.json());
  }

  getBladmuziek(): Observable<Bladmuziek[]> {
    return this.http.get("http://localhost:8082/api/bladmuziek").map(res => res.json());
  }  
  
}