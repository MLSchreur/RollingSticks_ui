import { Component }        from '@angular/core';
import { Leerling }         from '../leerling/leerling';

@Component({
  selector:                     'leerlingaanmaken',
  templateUrl:                  './leerlingaanmaken.component.html',
})
export class LeerlingAanmakenComponent {

  leerlingAanmaken  : Leerling = new Leerling();
  postLeerling(){

  }


}