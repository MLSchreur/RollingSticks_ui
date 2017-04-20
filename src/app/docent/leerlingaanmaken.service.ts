import { Injectable }               from '@angular/core';
// net zoals in Postman, HTTP request levert een response op:
import { Http, Response, Headers }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { Leerling }                 from '../leerling/leerling'; 
import { DocentComponent }          from './docent.component'; 
import { AppGlobalService }         from '../app.global.service';