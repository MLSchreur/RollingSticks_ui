import { Component, OnInit }  from '@angular/core';
import { CompositieService }  from './compositie.service';
import { ViewEncapsulation }  from '@angular/core';

import { Maat }               from './maat';
import { Noot }               from './noot';
import { Muziekstuk }         from '../muziekstuk/muziekstuk';
import { MuziekstukService }  from '../muziekstuk/muziekstuk.service';

@Component({
  selector: 'compositie',
  templateUrl: './compositie.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './compositie.component.css', './compositie.music.css' ],
  providers: [ CompositieService ]
})

export class CompositieComponent implements OnInit {
  maten: Maat[] = [];
  d1: Date = new Date();
  lft = 0;
  tp = 0;
  source;
  message: string;
  titel: string;
  tempo: number;
  beats: string;
  beatType: string;
  mode: string;
  maatSoort: string;


  ngOnInit() {
    this.loadMusic();
  }

  constructor(private compositieService: CompositieService, private muziekstukService: MuziekstukService) {
  }

  loadMusic() {
    let test2 = document.getElementById("test");
    console.log(test2);
    test2.style.top = "-24px";
    console.log("test2.style.top" + test2.style.top);
    
//    this.maten = this.compositieService.getNotes();
    let part = document.getElementById("part");
    part.innerHTML = "";
    for (let i=0 ; i<this.maten.length ; i++) {
      let staff;
      if (i%4 == 0) {
        staff = document.createElement("div");
        staff.setAttribute("id", "staff" + Math.floor(i/4));
        staff.setAttribute("class", "staff");
        part.appendChild(staff);
      } else {
        staff = document.getElementById("staff" + Math.floor(i/4));
      }
      if (i==0) {
        let cursor = document.createElement("div");
        cursor.setAttribute("id", "cursor");
        cursor.setAttribute("class", "bar");
        staff.appendChild(cursor);
      }
      let note;
      let subnote;
      let vorigeNootNaam;
      for (let j=0 ; j<this.maten[i].noten.length ; j++) {
        // nootNaam onbekend -> er is iets mis met de XML, noot wordt overgeslagen.
        if (this.maten[i].noten[j].nootNaam == "onbekend") {
          console.log("Probleem, nootNaam is onbekend.");
          console.log(this.maten[i].noten[j]);
        } else if (this.maten[i].noten[j].chord == false) {           // chord == false -> begin van een nieuw akkoord!
          note = document.createElement("div");
          // Later lengte omzetten in noot.ts naar number. Dan hoeft hier de + niet meer toegevoegd te worden.
          let length = this.getLength(+this.maten[i].noten[j].length);
          note.setAttribute("class", length + " note " + this.maten[i].noten[j].nootNaam);
          // methode getPositieNootNaam bepaalt de plaats op de notenbalk
          let topPositie = this.getPositieNootNaam(this.maten[i].noten[j].nootNaam);
          note.style.top = topPositie + "px";

          staff.appendChild(note);
          
          vorigeNootNaam = this.maten[i].noten[j].nootNaam;           // naam van de noot bewaren voor de volgende noot van het akkoord

        } else {                                                      // chord == true -> vervolg van het akkoord, dus als subnoot toevoegen.
          subnote = document.createElement("div");
          // Later lengte omzetten in noot.ts naar number. Dan hoeft hier de + niet meer toegevoegd te worden.
          let length = this.getLength(+this.maten[i].noten[j].length);
          subnote.setAttribute("class", length + " note " + this.maten[i].noten[j].nootNaam);
          // Positie van de volgende noot in het akkoord is de positie van de nootNaam minus de positie van de vorige noot.
          // Hiermee bepalen we het verschil in positie tussen de 2 noten, zodat de nieuwe noot op de juiste plek komt te staan.
          let topPositie = (this.getPositieNootNaam(this.maten[i].noten[j].nootNaam) - this.getPositieNootNaam(vorigeNootNaam));
          subnote.style.top = topPositie + "px";
          
          note.appendChild(subnote);

          vorigeNootNaam = this.maten[i].noten[j].nootNaam;           // naam van de noot bewaren voor de volgende noot van het akkoord
        }
      }
      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      staff.appendChild(bar);
    }
  }

  getPositieNootNaam(nootNaam: string) {
    switch(nootNaam) {
      case "c6": return -20;
      case "b5": return -16;
      case "a5": return -12;
      case "g5": return  -8;
      case "f5": return  -4;
      case "e5": return   0;
      case "d5": return   4;
      case "c5": return   8;
      case "b4": return  12;
      case "a4": return  16;
      case "g4": return  20;
      case "f4": return  24;
      case "e4": return  28;
      case "d4": return  32;
    }
  }

  getLength(length: number) {
    switch(length) {
      case 1:   return "l1";
      case 2:   return "l2";
      case 4:   return "l4";
      case 8:   return "l8";
      case 16:  return "l16";
      case 32:  return "l32";
      case 64:  return "l64";
      default:  console.log("lengte onbekend: " + length); return "";
    }
  }

  playMusic() {
    this.d1 = new Date();
    console.log("Play Music");
    this.source = this.compositieService.source.subscribe(data => {
      //console.log(data);
      if (data.height != "") {
        document.getElementById("playingNote").textContent = data.length + " " + data.height;
      }
      this.printTime();
      this.lft += 8;
      if (this.lft > 384) {
        this.lft = 0;
        this.tp += 80;
        if (this.tp > 160) {
          this.tp = 0;
        }
      }
      document.getElementById("cursor").style.left = this.lft + "px";
      document.getElementById("cursor").style.top = this.tp + "px";
    });
  }

  pauseMusic() {
    this.source.unsubscribe();
  }

  printTime() {
    let d = new Date();
    let diff = (d.getMinutes()-this.d1.getMinutes())*60 + (d.getSeconds() - this.d1.getSeconds());
    diff = diff*1000 + (d.getMilliseconds() - this.d1.getMilliseconds());
    document.getElementById("time").textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " ---- Time elapsed (ms): " + diff;
  }

  // tonen van algemene compositie gegevens
  showCompositie(muziekstuk: Muziekstuk) {
    console.log(muziekstuk);
    console.log(muziekstuk.id);
    this.compositieService.parseXml(muziekstuk.id).subscribe(compositie => {
      console.log("Compositie, succes!");
      console.log(compositie);
      this.message = "";
      if (typeof compositie === 'string') {
        console.log("het is een string");
        if (compositie == "1") {
          this.message = "Muziekstuk met opgegeven id bestaat niet";
        } else if (compositie == "2") {
          this.message = "Muziekstuk bevat geen XML bestand";
        } else if (compositie == "3") {
          this.message = "Fout opgetreden in de XML Parser. Waarschijnlijk ongeldige XML";
        }
      }
      this.titel = compositie.title;
      this.tempo = compositie.tempo;
      this.beats = compositie.beats.toString();
      this.beatType = compositie.beatType.toString();
      this.maatSoort = this.beats+"/"+this.beatType;
      this.mode = compositie.mode;
      this.maten = compositie.maten;
    });
    this.muziekstukService.getMuziekstukImgById(muziekstuk.id).subscribe(img => {
      muziekstuk.pictogram = img;
      document.getElementById("imgFromServer").setAttribute("src", img);
    });

    this.showMusic(muziekstuk);
  }

  showMusic(muziekstuk: Muziekstuk) {
      
  }

}