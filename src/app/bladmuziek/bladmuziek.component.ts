import { Component } from '@angular/core';

import { Bladmuziek }            from './bladmuziek';
import { BladmuziekService }     from './bladmuziek.service';


@Component({
  selector: 'my-bladmuziek',
  templateUrl: './bladmuziek.component.html',
  providers:[ BladmuziekService ]
})

export class BladmuziekComponent {
  title = 'bladmuziek works!';
  allBladmuziek:  Bladmuziek[];
  bladmuziek:     Bladmuziek;
  bladmuziekId:   number;

  constructor(private bladmuziekService: BladmuziekService) {
  }

  getBladmuziek() {
    this.bladmuziekService.getBladmuziek().subscribe(allBladmuziek => {
      console.log("Bladmuziek alles, succes!");
      console.log(allBladmuziek);
      this.allBladmuziek = allBladmuziek;
    });
  }

  getBladmuziekById(id: number) {
    console.log(this.bladmuziekId);
    console.log(id);
    this.bladmuziekService.getBladmuziekById(id).subscribe(bladmuziek => {
      console.log("Bladmuziek per stuk, succes!");
      console.log(bladmuziek);
      this.bladmuziek = bladmuziek;
    });
  }
}
