import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Rx';
//import { Observable }               from 'rxjs/Observable'; //Dit was het


import { Maat }  from './maat';
import { Noot }  from './noot';

@Injectable()
export class CompositieService {
  maten: Maat[] = [];
  emptyNote: Noot = new Noot;
  nootNr: number = 0;
  maatNr: number = 0;
  counter: number = 0;

  source = Observable.interval(100).map(() => {
    let returnNote: Noot;
    if (this.counter==0) {
      if (this.nootNr >= this.maten[this.maatNr].noten.length) {
        this.nootNr = 0;
        if (++this.maatNr >= 12) {
          this.maatNr = 0;
        }
      }
      let ln = this.maten[this.maatNr].noten[this.nootNr].length;
      if (ln == "whole") this.counter = 11;
      if (ln == "half") this.counter = 5;
      if (ln == "quarter") this.counter = 2;
      returnNote = this.maten[this.maatNr].noten[this.nootNr++];
    } else {
      this.counter--;
      returnNote = this.emptyNote;
    }
    return returnNote;
  });

  constructor() {
    this.emptyNote.height = "";
    this.emptyNote.length = "";
  }

  generateRandomNotes() {
    for (let i=0; i<12 ; i++) {
      this.maten[i] = new Maat();
      this.maten[i].noten = [];
      let sum = 0;
      let j=0;
      while (sum != 4) {
        this.maten[i].noten[j] = new Noot();
        let rnd = Math.floor(Math.random() * 3) + 1;
        let add = 0;
        if (rnd ==1) add = 4;
        if (rnd ==2) add = 2;
        if (rnd ==3) add = 1;
        if ((sum + add) <= 4) {
          this.maten[i].noten[j].length = this.noteLength(rnd);
          this.maten[i].noten[j].height = this.noteHeight(Math.floor(Math.random() * 11) + 1);
          sum += add;
          j++;
        }
      }
    }
    console.log(this.maten);
  }

  getNotes() {
    this.generateRandomNotes();
    return this.maten;
  }

  noteLength(nr: number) {
    switch (nr) {
      case 1: return "whole";
      case 2: return "half";
      case 3: return "quarter";
      default: return "quarter";
    }
  }

  noteHeight(nr: number) {
    switch (nr) {
      case 1: return "d4";
      case 2: return "e4";
      case 3: return "f4";
      case 4: return "g4";
      case 5: return "a5";
      case 6: return "b5";
      case 7: return "c5";
      case 8: return "d5";
      case 9: return "e5";
      case 10: return "f5";
      case 11: return "g5";
      default: return "b5";
    }
  }
}