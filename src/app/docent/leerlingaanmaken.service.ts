import { Injectable }               from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Leerling }                 from '../leerling/leerling'; 
import { DocentComponent }          from './docent.component'; 
import { AppGlobalService }         from '../app.global.service';

@Injectable()
export class LeerlingaanmakenService {

    constructor(private http: Http, private appGlobalService: AppGlobalService){}

    private baseUrl: string     = this.appGlobalService.baseUrl + "/leerling"; 
    private headers             = new Headers({ 'Content-Type': 'application/json' });  
    //private headersXml          = new Headers({ 'Content-Type': 'text/xml' });          //waarschijnlijk niet nodig  
    //private headersImg          = new Headers({ 'Content-Type': 'text/plain' });        //waarschijnlijk niet nodig

    postLeerling(leerling: Leerling) {
    console.log("leerlingaanmaken.service - postLeerling");
    return this.http.post(this.baseUrl, JSON.stringify(leerling), { headers: this.headers }).map(res => res.text());
  }

}