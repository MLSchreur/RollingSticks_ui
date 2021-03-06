import { Component, OnInit }  from '@angular/core';
import { NotenbalkComponent } from '../notenbalk/notenbalk.component';

import { LeerlingService }    from './leerling.service';
import { Leerling }           from './leerling';
import { MuziekstukService }  from '../muziekstuk/muziekstuk.service';
import { Muziekstuk }         from '../muziekstuk/muziekstuk';
import { AppGlobalService }   from '../app.global.service';


@Component({
  selector: 'leerling',
  templateUrl: './leerling.component.html',
  providers: [LeerlingService, MuziekstukService]
})

export class LeerlingComponent implements OnInit {
  
  title = 'leerling';

  leerlingen        : Leerling[] = [];
  leerlingSelected  : Leerling;
  allMuziekstuk     : Muziekstuk[];
  tempTxt           : String;
  


  constructor(
    private leerlingService: LeerlingService,
    private muziekstukService: MuziekstukService,
    private appGlobalService: AppGlobalService) {
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
}

