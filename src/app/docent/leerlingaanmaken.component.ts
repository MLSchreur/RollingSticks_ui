import { Component, NgModule } from '@angular/core';
import { Leerling } from '../leerling/leerling';
import { Docent } from '../docent/docent'; import { LeerlingaanmakenService } from './leerlingaanmaken.service';

@Component({
  selector: 'leerlingaanmaken',
  templateUrl: './leerlingaanmaken.component.html',
  providers: [LeerlingaanmakenService]
})

export class LeerlingAanmakenComponent {

  leerlingAanmaken: Leerling = new Leerling();
  leerlingId: Number;

  constructor(private leerlingaanmakenService: LeerlingaanmakenService) { }

  postLeerling() {
    console.log(this.leerlingAanmaken);
    this.leerlingaanmakenService.postLeerling(this.leerlingAanmaken).subscribe(leerlingId => {
      console.log("Leerling aangemaakt, succes! - " + leerlingId);
      this.leerlingId = +leerlingId;
    });
  }
}