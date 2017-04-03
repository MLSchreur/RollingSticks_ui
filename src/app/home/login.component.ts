import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector:                   'login',
  templateUrl:                './login.component.html',
  // styleUrls:                 ['./styles.css'] 
})
export class LoginComponent {
  Router: Router;
  input_gebrNaam =            'gebruikersnaam';
  input_wachtWoord =          'wachtwoord';


  loginDocent (docent: string) {
  this.Router.navigate(['docent']);
}

  loginLeerling(leerling: string) {
  this.Router.navigate(['leerling']);
  }

}

