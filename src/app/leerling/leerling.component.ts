import { Component, OnInit }    from '@angular/core';
import { NotenbalkComponent }   from '../notenbalk/notenbalk.component';

import { LeerlingService }      from './leerling.service';
import { Leerling }             from './leerling';
import { MuziekstukService }    from '../muziekstuk/muziekstuk.service';
import { Muziekstuk }           from '../muziekstuk/muziekstuk';
import { AppGlobalService }     from '../app.global.service';
import { CompositieService }    from '../compositie/compositie.service';
import { Compositie }           from '../compositie/compositie';


@Component({
  selector: 'leerling',
  templateUrl: './leerling.component.html',
  providers: [CompositieService, LeerlingService, MuziekstukService]
})
export class LeerlingComponent implements OnInit {
  title = 'leerling';
  leerlingen        : Leerling[] = [];
  leerlingSelected  : Leerling;
  allMuziekstuk     : Muziekstuk[];
  tempTxt           : String;
  tempCompositieTxt : string;
  compositie        : Compositie;
  
  constructor(private compositieService: CompositieService, private leerlingService: LeerlingService, private muziekstukService: MuziekstukService, private appGlobalService: AppGlobalService) {
  }

  ngOnInit() {
    this.leerlingService.getLeerlingen().subscribe(data => {
      this.leerlingen = data;
      console.log(this.leerlingen);
    });
    this.muziekstukService.getMuziekstuk().subscribe(allMuziekstuk => {
      console.log("Muziekstuk alles, succes!");
      console.log(allMuziekstuk);
      this.allMuziekstuk = allMuziekstuk;
    });
  }

  updateLeerling($event) {
    this.leerlingService.getLeerlingById($event.target.value).subscribe(data => this.leerlingSelected = data);
  }

  showCompositie(muziekstuk: Muziekstuk){
    console.log(muziekstuk)
    console.log(muziekstuk.id)
    this.tempTxt = "ID: " + muziekstuk.id + "*** Artiest: " + muziekstuk.artiest + "*** Titel: " + muziekstuk.artiest;
    this.compositieService.parseXml(muziekstuk.id).subscribe(compositie => {
      console.log("Compositie, succes!");
      console.log(compositie);
      if (compositie == "2") 
      console.log("het is een 2");
    });
  }
}

