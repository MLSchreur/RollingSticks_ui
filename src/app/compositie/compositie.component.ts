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

  private stdHoogteBox:     number = 80;
  private stdAfwijkingTop:  number = 56;

  ngOnInit() {
    this.loadMusic();
  }

  constructor(private compositieService: CompositieService, private muziekstukService: MuziekstukService) {
  }

  loadMusic() {
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
          console.log("Probleem, nootNaam is onbekend. - " + this.maten[i].noten[j].instrument);
          console.log(this.maten[i].noten[j]);
        } else if (this.maten[i].noten[j].nootNaam == null) {
          console.log("Probleem, nootNaam is null. - " + this.maten[i].noten[j].instrument);
          console.log(this.maten[i].noten[j]);
        } else {
          // 1e test voor instrument en icoon v/d noot!
          let divSymbool = this.setSymbool(this.maten[i].noten[j].instrument);
          let divSymbool2 = this.setSymbool2(this.maten[i].noten[j].instrument);

          // Later lengte omzetten in noot.ts naar number. Dan hoeft hier de + niet meer toegevoegd te worden.
          let length = this.getLength(+this.maten[i].noten[j].length);

          // chord == false -> begin van een nieuw akkoord! 
          if (this.maten[i].noten[j].chord == false) {
            note = document.createElement("div");
            note.setAttribute("class", length + " note " + " " + divSymbool2 + " " + this.maten[i].noten[j].nootNaam);

            // Aanpassen van hoogte & marge-bottom div box - deze overschrijft de css. css kan in principe daarop geleegd worden.
            // Op basis van de hoogte v/d noot (naamNoot) wordt zowel de hoogte als de marge bepaald.
            // Samen moeten ze gelijk zijn aan de standaard hoogte van de notenbalk (stdHoogteBox)
            let nieuweHoogte = this.getHoogteDivBox(this.maten[i].noten[j].nootNaam);
            let nieuweMargin = this.stdHoogteBox - nieuweHoogte;
            note.style.height = nieuweHoogte + "px";
            note.style.marginBottom = nieuweMargin + "px";

            // Het verschil tussen de de constante stdAfwijkingTop en de hoogte van de Div box levert de top positie van de noot op.
            let topPositie = this.stdAfwijkingTop - nieuweHoogte;
            note.style.top = topPositie + "px";

            // Tonen beam (dwarsstreep)
            if (this.maten[i].noten[j].beam == "begin" || this.maten[i].noten[j].beam == "continue") {
              note.style.borderBottom = "4px solid black";
            }
            // klaar, dus noot toevoegen aan staff(notenbalk)
            note.appendChild(divSymbool);
            staff.appendChild(note);
            

          } else {                                                      // chord == true -> vervolg van het akkoord, dus als subnoot toevoegen.
            subnote = document.createElement("div");
            subnote.setAttribute("class", length + " note " + " " + divSymbool2 + " " + this.maten[i].noten[j].nootNaam);

            // Aanpassen van hoogte & marge-bottom div box - deze overschrijft de css. css kan in principe daarop geleegd worden.
            // Op basis van de hoogte v/d noot (naamNoot) wordt zowel de hoogte als de marge bepaald.
            // Samen moeten ze gelijk zijn aan de standaard hoogte van de notenbalk (stdHoogteBox)
            let nieuweHoogte = this.getHoogteDivBox(this.maten[i].noten[j].nootNaam);
            let nieuweMargin = this.stdHoogteBox - nieuweHoogte;
            subnote.style.height = nieuweHoogte + "px";
            subnote.style.marginBottom = nieuweMargin + "px";

            // Positie van de volgende noot in het akkoord is de positie van de vorige noot minus de positie van de nootNaam (nieuwe noot).
            // Hiermee bepalen we het verschil in positie tussen de 2 noten, zodat de nieuwe noot op de juiste plek komt te staan.
            let topPositie = (this.getHoogteDivBox(vorigeNootNaam) - this.getHoogteDivBox(this.maten[i].noten[j].nootNaam));
            subnote.style.top = topPositie + "px";

            // klaar, dus subnoot van het akkoord toevoegen aan de noot
            subnote.appendChild(divSymbool);
            note.appendChild(subnote);
          }
          vorigeNootNaam = this.maten[i].noten[j].nootNaam;           // naam van de noot bewaren voor de volgende noot van het akkoord
        } 
      }
      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      staff.appendChild(bar);
    }
  }

// methode voor het omzetten van instrument naar het juiste symbool
  setSymbool(instrument: string) {
    console.log("Instrument: "+ instrument);
    let symbool1 = document.createElement("div");
    let symbool2 = document.createElement("div");
    let symbool3 = document.createElement("div");

    symbool1.appendChild(symbool2);
    symbool2.appendChild(symbool3);

    switch(instrument) {
      case "Crash Cymbal":
      case "Crash Cymbal 2":
        console.log("kruisje met horizontaal streepje"); 
        symbool1.setAttribute("class", "cross");
        symbool2.setAttribute("class", "crossing");
        symbool3.setAttribute("class", "stripe");
        return symbool1;
      case "Hi-Hat%g Closed":
      case "Ride Cymbal":
      case "Hi-Hat%g Foot":
        console.log("kruisje");
        symbool2.setAttribute("class", "cross");
        symbool3.setAttribute("class", "crossing");
        return symbool2;
      case "Snare%g Ghost Stroke":
        console.log("bolletje tussen haakjes");
        symbool2.setAttribute("class", "ghostCircle");
        symbool3.setAttribute("class", "ghost");
        return symbool2;
      case "Snare%g Rim":           console.log("bolletje met cirkel er omheen");
        symbool3.setAttribute("class", "rimCircle");
        return symbool3;

      // op oude manier afvangen
      case "High Tom":
      case "Low Tom":
      case "Snare Drum":
      case "Floor Tom 1":
      case "Bass Drum":
      case "Hi-Hat%g Open":         return symbool1;

      default:                      console.log("Probleem, onbekend muziekinstrument: " + instrument); return symbool1;
    }
  }

// methode voor het omzetten van instrument naar het juiste symbool
  setSymbool2(instrument: string) {
    console.log("Instrument: "+ instrument);

    switch(instrument) {
      case "High Tom":
      case "Low Tom":
      case "Snare Drum":
      case "Floor Tom 1":
      case "Bass Drum":
        // console.log("dicht bolletje");
        // symbool3.setAttribute("class", "closed");
        return "closed";
      case "Hi-Hat%g Open":
        console.log("donut (whole)");
        return "donut";
      case "Snare%g Ghost Stroke":
        // basis van de ghostNote (oftewel eerst closed en dan kleiner maken)
        return "closed ghostNote";
      case "Snare%g Rim":
        // basis van de Rim (oftewel eerst closed en dan kleiner maken);
        return "closed ghostNote";

    default:                      return "";
    }
  }

// anders opbouwen, omzetten naar hoogte van div box en dan berekening andere kant op voor positie noot zelf
// later ook horizontaal streepje bepalen met code ipv css
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

// Aan de had van de hoogte van de div box voor de specifieke noot, kan ook de marginBottom bepaald worden.
  getHoogteDivBox(nootNaam: string) {
    switch(nootNaam) {
      case "c6": return 76;
      case "b5": return 72;
      case "a5": return 68;
      case "g5": return 64;
      case "f5": return 60;
      case "e5": return 56;
      case "d5": return 52;
      case "c5": return 48;
      case "b4": return 44;
      case "a4": return 40;
      case "g4": return 36;
      case "f4": return 32;
      case "e4": return 28;
      case "d4": return 24;
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
      // if (data.height != "") {
      //   document.getElementById("playingNote").textContent = data.length + " " + data.height;
      // }
      // this.printTime();
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