import { Component, OnInit } from '@angular/core';

import { LeerlingService }   from './leerling.service';
import { Leerling }          from './leerling';

@Component({
  selector: 'leerling',
  templateUrl: './leerling.component.html',
  providers: [ LeerlingService ]
})
export class LeerlingComponent implements OnInit {
  title = 'leerling';
  leerlingen: Leerling[] = [];
  leerlingSelected: Leerling;

  constructor(private leerlingService: LeerlingService) {
  }

  ngOnInit() {
    this.leerlingService.getLeerlingen().subscribe(data => {
      this.leerlingen = data;
      console.log(this.leerlingen);
    });
  }
  
  updateLeerling($event) {
    this.leerlingService.getLeerlingById($event.target.value).subscribe(data => this.leerlingSelected = data);
  }

}


