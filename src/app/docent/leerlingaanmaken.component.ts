import { Component, NgModule } from '@angular/core';
import { Leerling } from '../leerling/leerling';
import { Docent } from '../docent/docent';
import { LeerlingaanmakenService } from './leerlingaanmaken.service';
import { DocentaanmakenService } from './docentaanmaken.service';

@Component({
  selector: 'leerlingaanmaken',
  templateUrl: './leerlingaanmaken.component.html',
  providers: [LeerlingaanmakenService, DocentaanmakenService]
})

export class LeerlingAanmakenComponent {

  leerlingAanmaken: Leerling = new Leerling();
  docentAanmaken: Docent = new Docent();
  leerlingId: Number;
  docentId: Number;


  constructor(private leerlingaanmakenService: LeerlingaanmakenService, private docentaanmakenService: DocentaanmakenService) { }



  // postGebruiker(){
  //   this.checkGebruiker();
  //   console.log(this.leerlingAanmaken);
  //   this.leerlingaanmakenService.postLeerling(this.leerlingAanmaken).subscribe(leerlingId => {
  //       console.log("Leerling aangemaakt, succes! - " + leerlingId);
  //       this.leerlingId = +leerlingId;
  //   });
  // }

  postLeerling() {
    if ((<HTMLInputElement>document.getElementById("radio-leerling")).checked) {
      console.log(this.leerlingAanmaken);
      this.leerlingaanmakenService.postLeerling(this.leerlingAanmaken).subscribe(leerlingId => {
        console.log("Leerling aangemaakt, succes! - " + leerlingId);
        this.leerlingId = +leerlingId;
      });
    } else {
      console.log("Het is een docent");
      console.log(this.docentAanmaken);
      this.docentaanmakenService.postDocent(this.docentAanmaken).subscribe(docentId => {
        console.log("Docent aangemaakt, succes! - " + docentId);
        this.docentId = +docentId;
      });
    }
  }

  // wijzigen checkbox nieuwe leerling / nieuwe docent
  changeChecked() {
    let checkLeerling = (<HTMLInputElement>document.getElementById("radio-leerling"));
    let checkDocent = (<HTMLInputElement>document.getElementById("radio-docent"));
    if (checkDocent.checked == true) {
      checkDocent.checked = true;
      } else {
      checkLeerling.checked = true;
      }
    console.log("checkLeerling = " + checkLeerling.checked);
    console.log("checkDocent = " + checkDocent.checked);
  }
}