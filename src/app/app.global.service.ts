import { Injectable }               from '@angular/core';

@Injectable()
export class AppGlobalService {
  public baseUrl : string; 
  private loginStatus: number = 0;  // 0 = not, 1 = leerling, 2 = docent

  constructor() {
    this.defineBaseUrl();
  }

  private defineBaseUrl() {
    let hostName: string = window.location.hostname;
    console.log(hostName);
    switch(hostName.substring(0,6)) {
//      lokaal testen op backend
//      case "localh": this.baseUrl = "http://http://localhost:8082/api"; break;
      case "localh": this.baseUrl = "http://rollingsticks.test.carpago.nl/api"; break;
      case "dev.ui": this.baseUrl = "http://rollingsticks.test.carpago.nl/api"; break;
      case "acc.ui": this.baseUrl = "http://rollingsticks.acc.carpago.nl/api"; break;
    }
    console.log("Base url: " + this.baseUrl);
  }

  public setLoginStatus(status) {
    this.loginStatus = status;
  }
  public getLoginStatus() {
    return this.loginStatus;
  }
}

//  Implementeren van global service, zodat er overal gebruik gemaakt kan worden van dezelfde URL voor het benaderen van de backend;
//
//  Stap 1: [app.global.service.ts] aanmaken met:
//    Injectable & export v/d class
//    Binnen class een constructor aanmaken, waarin de globale baseUrl gemaakt wordt op basis van de hostName.

//  Stap 2: [app.module.ts]
//    import { AppGlobalService }             from './app.global.service';
//    providers: [AppGlobalService]   // bestaande providers uitbreiden met AppGlobalService

//  Stap 3: voor elk component binnen de service:
//    import { AppGlobalService }             from '../app.global.service';
//      Constructor uitbreiden met private variabele van class AppGlobalService
//    constructor(..., private appGlobalService: AppGlobalService)
//      Per service de baseUrl samenstellen op basis van de global en de extra toevoeging.
//    private baseUrl: string   = this.appGlobalService.baseUrl + "/leerling"; 


