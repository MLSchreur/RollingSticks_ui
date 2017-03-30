import { Injectable }               from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Verzoek }                  from './verzoek';

@Injectable()
export class VerzoekService {
    private url: string = "http://rollingsticks.test.carpago.nl/api/verzoek";

  // Op deze manier (http van class Http) wordt een private field aangemaakt.
    constructor(private http: Http) {

    }

    private headers = new Headers({ 'Content-Type': 'application/json' });  

    // posten van een nieuw verzoek
    postVerzoek(verzoek: Verzoek) {
        return this.http.post(this.url, JSON.stringify(verzoek), { headers: this.headers }).map(res => res.json());
    }  

    // verzoek ophalen by id
    getVerzoekById(id: number): Observable<Verzoek> {
        return this.http.get(this.url + "/" + id).map(res => res.json());
    }

    // alle verzoeken ophalen
    getVerzoeken(): Observable<Verzoek[]> {
        return this.http.get(this.url).map(res => res.json());
    }  

    // verzoek verwijderen by Id
    deleteVerzoek(id: number): Observable<Verzoek>{
        return this.http.delete(this.url + "/" + id).map(res => res.json());
    }

    // verzoek wijzigen by Id
    putVerzoek(verzoek: Verzoek) {
        return this.http.put(this.url, JSON.stringify(verzoek), { headers: this.headers }).map(res => res.json());
    }

}