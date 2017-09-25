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

  // wijzigen checkbox nieuwe leerling / nieuwe docent
  changeChecked(){
    let checkLeerling = (<HTMLInputElement>document.getElementById("radio-leerling"));
    let checkDocent = (<HTMLInputElement>document.getElementById("radio-docent"));
    if(checkDocent.checked == true){
      checkDocent.checked = true;
    } else {
     checkLeerling.checked = true;
    }
    console.log("checkLeerling = " + checkLeerling.checked);
    console.log("checkDocent = " + checkDocent.checked);
  }
}