import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Leerling }                 from './leerling';
import { AppGlobalService }         from '../app.global.service';

@Injectable()
export class LeerlingService {
  constructor(private http: Http, private appGlobalService: AppGlobalService) {
  }

  private headers = new Headers({ 'Content-Type': 'application/json' });  
  private baseUrl: string   = this.appGlobalService.baseUrl + "/leerling"; 

  getLeerlingById(id: number): Observable<Leerling> {
    return this.http.get(this.baseUrl+"/" + id).map(res => res.json()).catch((error:any) => {
      return error.json();
    });
  }

  getLeerlingen(): Observable<Leerling[]> {
    return this.http.get(this.baseUrl).map(res => res.json()).catch((error:any) => {
      return error.json();
    });
  }
}
