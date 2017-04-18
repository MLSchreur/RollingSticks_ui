import { Component }         from '@angular/core';
import { Router }            from '@angular/router';
import { AppGlobalService }  from '../app.global.service';

@Component({
  selector:                   'login',
  templateUrl:                './login.component.html',
  styleUrls:                 ['./login.component.css'] 
})
export class LoginComponent {
  input_gebrNaam =            'gebruikersnaam';
  input_wachtWoord =          'wachtwoord';

  constructor(private router: Router, private appGlobalService: AppGlobalService) {
    console.log("STATUS : " + this.appGlobalService.getLoginStatus());
    this.appGlobalService.setLoginStatus(0);
  }

  loginDocent (docent: string) {
    this.appGlobalService.setLoginStatus(2);
    this.router.navigate(['docent']);
  }

  loginLeerling(leerling: string) {
    this.appGlobalService.setLoginStatus(1);
    this.router.navigate(['leerling']);
  }

}

