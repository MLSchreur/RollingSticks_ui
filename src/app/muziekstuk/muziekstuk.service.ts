import { Injectable }               from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Muziekstuk }               from '../muziekstuk/muziekstuk';

@Injectable()
export class MuziekstukService {

  // Op deze manier (http van class Http) wordt een private field aangemaakt.
  constructor(private http: Http) {

  }

  private headers = new Headers({ 'Content-Type': 'application/json' });  

  postMuziekstuk(muziekstuk: Muziekstuk) {
    console.log("muziekstuk.service - postMuziekstuk");
    return this.http.post("http://rollingsticks.test.carpago.nl/api/muziekstuk", JSON.stringify(muziekstuk), { headers: this.headers }).map(res => res.json());
//    return this.http.post("http://localhost:8082/api/muziekstuk", JSON.stringify(muziekstuk), { headers: this.headers }).map(res => res.json());
      
    // Deze statements gebruiken, wanneer de backend text terugstuurt (alleen id) ipv het hele JSON object.
    // return this.http.post("http://localhost:8082/api/muziekstuk", JSON.stringify(muziekstuk), { headers: this.headers }).map(res => {
    //   console.log("New muziekstuk id = " + res.text());
    // });
  }  
  
  // Ik beloof (observable, vroeger promise) dat ik een muziekstuk ga opsturen, maar zeg niet wanneer.
  // Oftewel asynchroon.
  // Wat je terugkrijgt is res, maar alleen het .json gedeelte wordt wat meegedaan. Terug naar aanroepende functie gaat dan alleen het json gedeelte
  getMuziekstukById(id: number): Observable<Muziekstuk> {
    return this.http.get("http://rollingsticks.test.carpago.nl/api/muziekstuk/" + id).map(res => res.json());
//    return this.http.get("http://localhost:8082/api/muziekstuk/" + id).map(res => res.json());
  }

  getMuziekstuk(): Observable<Muziekstuk[]> {
    return this.http.get("http://rollingsticks.test.carpago.nl/api/muziekstuk").map(res => res.json());
//    return this.http.get("http://localhost:8082/api/muziekstuk").map(res => res.json());
  }  
  
}
