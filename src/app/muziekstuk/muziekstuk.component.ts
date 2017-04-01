import { Component } from '@angular/core';

import { Muziekstuk }           from './muziekstuk';
import { MuziekstukService }    from './muziekstuk.service';


@Component({
  selector:           'muziekstuk',
  templateUrl:        './muziekstuk.component.html',
  providers:          [MuziekstukService]
})

export class MuziekstukComponent {
  title = 'Upload';

  allMuziekstuk:      Muziekstuk[];
  muziekstuk:         Muziekstuk;
  muziekstukInvoer:   Muziekstuk = new Muziekstuk;
  muziekstukId:       number;
  fileXml:            File;
  fileImg:            File;

  private base64textString:String="";

  constructor(private muziekstukService: MuziekstukService) { }

  getMuziekstuk() {
    this.muziekstukService.getMuziekstuk().subscribe(allMuziekstuk => {
      console.log("Muziekstuk alles, succes!");
      console.log(allMuziekstuk);
      this.allMuziekstuk = allMuziekstuk;
    });
  }

  getMuziekstukById(id: number) {
    console.log(this.muziekstukId);
    console.log(id);
    this.muziekstukService.getMuziekstukById(id).subscribe(muziekstuk => {
      console.log("Muziekstuk per stuk, succes!");
      console.log(muziekstuk);
      this.muziekstuk = muziekstuk;
    });
  }

  getMuziekstukXMLById(id: number) {
    console.log(this.muziekstukId);
    console.log(id);
    this.muziekstukService.getMuziekstukXMLById(id).subscribe(xml => {
      console.log("Muziekstuk per stuk - XML, succes!");
      console.log(xml);
      this.muziekstuk.xml = xml;
    });
  }

  getMuziekstukImgById(id: number) {
    console.log(this.muziekstukId);
    console.log(id);
    this.muziekstukService.getMuziekstukImgById(id).subscribe(img => {
      console.log("Muziekstuk per stuk - IMG, succes!");
      console.log(img);
      this.muziekstuk.pictogram = img;
    });
  }

  updateFile($event) {
    let files = $event.srcElement.files;
    console.log("updateFile- id: "+ $event.srcElement.id);
    // code hieronder eventueel omzetten naar een switch. aparte functie voor ieder bestand is wat overbodig.
    if ($event.srcElement.id == "xml") {
      console.log("xml file vullen");
      this.fileXml = files[0];
    } else if ($event.srcElement.id == "img") {
      console.log("img file vullen");
      this.fileImg = files[0];
    } else { // ook nog code voor mp3. voor later
      console.log("Onbekende id voor updateFile: " + $event.srcElement.id);
    }
    // code hieronder kan weg. alleen om te kijken of het vullen gelukt is.
    if (this.fileImg != null) {
      console.log("img gevuld...");
    } else {
      console.log("img leeg...");
    }
    console.log("einde updateFile!");
  }

  postMuziekstuk() {
    console.log(this.muziekstukInvoer);
    let ms                    = this.muziekstukService;
    let readerXML: FileReader = new FileReader();
    let readerIMG: FileReader = new FileReader();
    if (this.fileXml != null) {     //post werkt alleen als xml is geselecteerd

      // zonder .subscribe werkt het niet!
      // Deze code gaan gebruiken, zodra backend text (id) teruggeeft ipv json
      //this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe();
      this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe(muziekstukId => {

        console.log("Muziekstuk gepost, succes! - " + muziekstukId);
        // Waarom staat hier +muziekstukId?
        this.muziekstukId = +muziekstukId;
        // upload xml
        readerXML.onload = function (e) {
          console.log(readerXML.result);
          ms.postXml(+muziekstukId, readerXML.result).subscribe(nr => {
            console.log("statusXML" + nr);
          });
        }
        readerXML.readAsText(this.fileXml);  // xml omzetten naar text
        // test img
        // nog eens goed kijken wat nu waar in staat. verschil tussen inhoud this.fileImg, reader2.result en btoa eromheen
        // zou deze code (en ook die van uploadXML) niet buiten de postMuziekstuk kunnen? Even een keer proberen.
        // of moet deze wellicht binnen die van de xml (alleen uitvoeren wanneer dat is afgelopen??)
        if (this.fileImg != null) {
          console.log("image uploaden... ");
          readerIMG.onload = function (e) {
            console.log(readerIMG.result);
            ms.postImg(+muziekstukId, btoa(readerIMG.result)).subscribe(nr => {
              console.log("statusIMG" + nr);
            });
          }
          readerIMG.readAsBinaryString(this.fileImg);  // img omzetten naar binary string
        } 
      });
    } else alert("XML bestand selecteren")
  }
}
