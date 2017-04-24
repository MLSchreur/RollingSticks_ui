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
  maten:              Maat[]    = [];
  d1:                 Date      = new Date();
  lft                           = 0;
  tp                            = 0;
  aantalNotenbalken:  number;

  source;
  message:            string;
  titel:              string;
  tempo:              number;
  beats:              string;
  beatType:           string;
  mode:               string;
  maatSoort:          string;

  private stdHoogteBox:     number = 80;
  private stdAfwijkingTop:  number = 56;

  ngOnInit() {
    this.loadMusic();
  }

  constructor(private compositieService: CompositieService, private muziekstukService: MuziekstukService) {
  }

  loadMusic() {
    // vreemd dat deze regel code niet mag. snap hier niets van.
    //this.aantalMaten = this.maten[this.maten.length -1].nummer;
    let part = document.getElementById("part");
    part.innerHTML = "";
    for (let i=0 ; i<this.maten.length ; i++) {
      let staff;
      if (i%4 == 0) {
        staff = document.createElement("div");
        staff.setAttribute("id", "staff" + Math.floor(i/4));
        staff.setAttribute("class", "staff");
        part.appendChild(staff);

        let cursor = document.createElement("div");
        if (i==0) {
          cursor.setAttribute("id", "cursor");
          this.aantalNotenbalken = 0;
        } else {
          cursor.setAttribute("id", "leegBegin");
        }
        cursor.setAttribute("class", "bar");
        staff.appendChild(cursor);
        this.aantalNotenbalken++;

      } else {
        staff = document.getElementById("staff" + Math.floor(i/4));
      }

      let note;             // begin van het akkoord (chord == false) [meerdere noten op hetzelfde moment]
      let subnote;          // vervolg van het akkoord (chord == true)
      let vorigeNootNaam;   // vorigeNootNaam nodig om relatief de positie van de volgende noot in hetzelfde akkoord te bepalen.
      for (let j=0 ; j<this.maten[i].noten.length ; j++) {
        // nootNaam onbekend/null -> er is iets mis met de XML, noot wordt overgeslagen.
        if (this.maten[i].noten[j].nootNaam == "onbekend" || this.maten[i].noten[j].nootNaam == null) {
          console.log("Probleem, nootNaam is " + this.maten[i].noten[j].nootNaam + ". - " + this.maten[i].noten[j].instrument);
          console.log(this.maten[i].noten[j]);
        } else {
          // chord == false -> begin van een nieuw akkoord! 
          if (this.maten[i].noten[j].chord == false) {
            // Bepalen van de juiste attributen voor het opbouwen van de noot
            note = this.bepaalAttribuutNoot(this.maten[i].noten[j]);

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
            staff.appendChild(note);
            

          } else {                                                      // chord == true -> vervolg van het akkoord, dus als subnoot toevoegen.
            // Bepalen van de juiste attributen voor het opbouwen van de noot
            subnote = this.bepaalAttribuutNoot(this.maten[i].noten[j]);

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


// methode voor het omzetten van instrument naar het juiste symbool (1e gedeelte div)
  bepaalAttribuutNoot(noot: Noot) {
    let symbool1 = document.createElement("div");
    let symbool2 = document.createElement("div");
    let symbool3 = document.createElement("div");

    symbool1.appendChild(symbool2);
    symbool2.appendChild(symbool3);

    // Later lengte omzetten in noot.ts naar number. Dan hoeft hier de + niet meer toegevoegd te worden.
    let length = this.getLength(+noot.length);

    switch(noot.instrument) {

      // Kruisje met horizontaal streepje
      case "Crash Cymbal":
      case "Crash Cymbal 2":          // console.log("kruisje met horizontaal streepje");"
        symbool1.setAttribute("class", length + " note cross " + noot.nootNaam);
        symbool2.setAttribute("class", "crossing");
        symbool3.setAttribute("class", "stripe");
        return symbool1;

      // Kruisje
      case "Hi-Hat%g Closed":
      case "Ride Cymbal":
      case "Hi-Hat%g Foot":           // console.log("kruisje");
        symbool2.setAttribute("class", length + " note cross " + noot.nootNaam);
        symbool3.setAttribute("class", "crossing");
        return symbool2;

      // Bolletje tussen haakjes
      case "Snare%g Ghost Stroke":  // console.log("bolletje tussen haakjes");
        symbool1.setAttribute("class", length + " note closed ghostNote " + noot.nootNaam);
        symbool2.setAttribute("class", "ghostCircle");
        symbool3.setAttribute("class", "ghost");
        return symbool1;

      // Bolletje met met cirkel er omheen
      case "Snare%g Rim":           // console.log("bolletje met cirkel er omheen");
        symbool2.setAttribute("class", length + " note closed ghostNote " + noot.nootNaam);
        symbool3.setAttribute("class", "rimCircle");
        return symbool2;

      // Klassieke kwartnoot (dicht bolletje - closed)
      case "High Tom":
      case "Low Tom":
      case "Snare Drum":
      case "Floor Tom 1":
      case "Bass Drum":             // console.log("dicht bolletje");
        symbool3.setAttribute("class", length + " note closed " + noot.nootNaam);
        return symbool3;

      // Klassieke hele noot (donut)
      case "Hi-Hat%g Open":         // console.log("donut (whole)");
        symbool3.setAttribute("class", length + " note donut " + noot.nootNaam);
        return symbool3;

      default:                      console.log("Probleem, onbekend muziekinstrument: " + noot.instrument); return symbool3;
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
      case 1:
      case 2:
      case 4:
      case 8:
      case 16:
      case 32:
      case 64:  return "l" + length;
      default:  console.log("Probleem: lengte onbekend: " + length); return "";
    }
  }

  playMusic() {
    let maxtp = this.aantalNotenbalken * 80;
    this.d1 = new Date();
    console.log("Play Music");
    this.source = this.compositieService.source.subscribe(data => {
      this.lft += 8;
      // maat = 128 pixels breed, 4 maten -> 512 pixels
      // bar  = 10 pixels breed,  4 bars  ->  40 pixels
      //                           Totaal -> 552 pixels
      if (this.lft > 552) {
        this.lft = 0;
        this.tp += 80;
        if (this.tp >= maxtp) {
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