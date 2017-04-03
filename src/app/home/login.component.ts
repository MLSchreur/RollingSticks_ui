import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

@Component({
  selector:                   'login',
  templateUrl:                './login.component.html',
  styleUrls:                   ['./login.component.css'] 
})
export class LoginComponent {
  input_gebrNaam =            'gebruikersnaam';
  input_wachtWoord =          'wachtwoord';

  loginDocent() {
    //  this.router.navigate(['docent']);
  }

  loginLeerling(){
    // this.router.navigate(['leerling']);
  }
}


