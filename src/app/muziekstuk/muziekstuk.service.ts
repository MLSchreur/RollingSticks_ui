import { Injectable }               from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Muziekstuk }               from '../muziekstuk/muziekstuk';
import { AppGlobalService }         from '../app.global.service';

@Injectable()
export class MuziekstukService {

  // Op deze manier (http van class Http) wordt een private field aangemaakt.
  constructor(private http: Http, private appGlobalService: AppGlobalService) {}

  private baseUrl: string     = this.appGlobalService.baseUrl + "/muziekstuk"; 
  private headers             = new Headers({ 'Content-Type': 'application/json' });  
  private headersXml          = new Headers({ 'Content-Type': 'text/xml' });  
  private headersImg          = new Headers({ 'Content-Type': 'text/plain' });  

  postMuziekstuk(muziekstuk: Muziekstuk) {
    console.log("muziekstuk.service - postMuziekstuk");
    return this.http.post(this.baseUrl, JSON.stringify(muziekstuk), { headers: this.headers }).map(res => res.text());
  }  

  putXml(id: number, xml: string){
    return this.http.put(this.baseUrl + "/" + id + "/xml", xml, { headers: this.headersXml }).map(res => {
      console.log(res.status);
      return "putXML" + res.status;
    });
  }
  
  putImg(id: number, img: string){
    return this.http.put(this.baseUrl + "/" + id + "/img", img, { headers: this.headersImg }).map(res => {
      console.log(res.status);
      return "putIMG" + res.status;
    });
  }
  
  // Ik beloof (observable, vroeger promise) dat ik een muziekstuk ga opsturen, maar zeg niet wanneer.
  // Oftewel asynchroon.
  // Wat je terugkrijgt is res, maar alleen het .json gedeelte wordt wat meegedaan. Terug naar aanroepende functie gaat dan alleen het json gedeelte
  getMuziekstukById(id: number): Observable<Muziekstuk> {
    return this.http.get(this.baseUrl+"/" + id).map(res => res.json());
  }

  getMuziekstukXMLById(id: number): Observable<string> {
    return this.http.get(this.baseUrl+"/" + id + "/xml").map(res => res.text());
  }

  getMuziekstukImgById(id: number): Observable<string> {
    return this.http.get(this.baseUrl+"/" + id + "/img").map(res => res.text());
  }

  getMuziekstuk(): Observable<Muziekstuk[]> {
    return this.http.get(this.baseUrl).map(res => res.json());
  }
}
