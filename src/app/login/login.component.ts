import { Component } from '@angular/core';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  title = 'Login';
  input_gebrNaam = 'gebruikersnaam';
  input_wachtWoord = 'wachtwoord';
}
