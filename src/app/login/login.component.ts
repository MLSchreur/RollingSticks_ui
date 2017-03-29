import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  input_gebrNaam = 'gebruikersnaam';
  input_wachtWoord = 'wachtwoord';

  loginDocent() {
  }

  loginLeerling() {
  }
}


