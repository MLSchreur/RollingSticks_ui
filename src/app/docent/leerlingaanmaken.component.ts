import { Component }                from '@angular/core';
import { Leerling }                 from '../leerling/leerling';
import { Docent }                   from '../docent/docent';
import { LeerlingaanmakenService }  from './leerlingaanmaken.service';

@Component({
  selector:                     'leerlingaanmaken',
  templateUrl:                  './leerlingaanmaken.component.html',
  providers:                    [LeerlingaanmakenService]
})

export class LeerlingAanmakenComponent {

  leerlingAanmaken  : Leerling = new Leerling();
  docentAanmaken    : Docent = new Docent();
  leerlingId        : Number;

  constructor(private leerlingaanmakenService: LeerlingaanmakenService) { }

  checkGebruiker(){
    let checkLeerling = document.getElementById("radio-leerling");
    let checkDocent = document.getElementById("radio-docent");
    console.log("Radio checkbox leerling is: " + checkLeerling.getAttributeNode("checked").value);
    console.log("Radio checkbox leerling is: " + checkDocent.getAttributeNode("checked").value);
    // if (check.getAttributeNode("checked").value != "checked"){
    //   this.leerlingAanmaken = this.docentAanmaken;
    // }
  }

  // postGebruiker(){
  //   this.checkGebruiker();
  //   console.log(this.leerlingAanmaken);
  //   this.leerlingaanmakenService.postLeerling(this.leerlingAanmaken).subscribe(leerlingId => {
  //       console.log("Leerling aangemaakt, succes! - " + leerlingId);
  //       this.leerlingId = +leerlingId;
  //   });
  // }

  postLeerling(){
    console.log(this.leerlingAanmaken);
    this.leerlingaanmakenService.postLeerling(this.leerlingAanmaken).subscribe(leerlingId => {
        console.log("Leerling aangemaakt, succes! - " + leerlingId);
        this.leerlingId = +leerlingId;
    });
  }
}