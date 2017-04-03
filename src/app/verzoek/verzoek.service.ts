import { Injectable } from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Verzoek } from './verzoek';
import { AppGlobalService } from '../app.global.service';

@Injectable()
export class VerzoekService {
    // Op deze manier (http van class Http) wordt een private field aangemaakt.
    constructor(private http: Http, private appGlobalService: AppGlobalService) {
    }

    private baseUrl: string = this.appGlobalService.baseUrl + "/verzoek";
    private headers = new Headers({ 'Content-Type': 'application/json' });

    // posten van een nieuw verzoek
    postVerzoek(verzoek: Verzoek) {
        return this.http.post(this.baseUrl, JSON.stringify(verzoek), { headers: this.headers }).map(res => res.json());
    }

    // verzoek ophalen by id
    getVerzoekById(id: number): Observable<Verzoek> {
        return this.http.get(this.baseUrl + "/" + id).map(res => res.json());
    }

    // alle verzoeken ophalen
    getVerzoeken(): Observable<Verzoek[]> {
        return this.http.get(this.baseUrl).map(res => res.json());
    }

    // verzoek verwijderen by Id
    deleteVerzoek(id: number): Observable<Verzoek> {
        return this.http.delete(this.baseUrl + "/" + id).map(res => res.json());
    }

    // verzoek wijzigen by Id
    putVerzoek(verzoek: Verzoek) {
        return this.http.put(this.baseUrl, JSON.stringify(verzoek), { headers: this.headers }).map(res => res.json());
    }

}