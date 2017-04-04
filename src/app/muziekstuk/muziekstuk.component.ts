import { Component } from '@angular/core';

import { Muziekstuk } from './muziekstuk';
import { MuziekstukService } from './muziekstuk.service';


@Component({
  selector: 'muziekstuk',
  templateUrl: './muziekstuk.component.html',
  providers: [MuziekstukService]
})

export class MuziekstukComponent {
  title = 'Upload';

  allMuziekstuk     : Muziekstuk[];
  muziekstuk        : Muziekstuk;
  muziekstukInvoer  : Muziekstuk = new Muziekstuk;
  muziekstukId      : number;
  fileXml           : File;
  fileImg           : File;
  stringImgBase64   : string;
  noXml             : string;

  //private base64textString: String = "";

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
      // console.log(muziekstuk);
      this.muziekstuk = muziekstuk;
    });
  }

  getMuziekstukXMLById(id: number) {
    console.log(this.muziekstukId);
    console.log(id);
    this.muziekstukService.getMuziekstukXMLById(id).subscribe(xml => {
      console.log("Muziekstuk per stuk - XML, succes!");
      // console.log(xml);
      this.muziekstuk.xml = xml;
    });
  }

  getMuziekstukImgById(id: number) {
    console.log(this.muziekstukId);
    console.log(id);
    this.muziekstukService.getMuziekstukImgById(id).subscribe(img => {
      console.log("Muziekstuk per stuk - IMG, succes!");
      // console.log(img);
      this.muziekstuk.pictogram = img;
      // auto vullen image
      document.getElementById("imgFromServer").setAttribute("src", img);
    });
  }

  updateFile($event) {
    let files = $event.srcElement.files;
    // console.log("updateFile- id: " + $event.srcElement.id);
    // console.log(this.stringImgBase64);
    // code hieronder eventueel omzetten naar een switch. aparte functie voor ieder bestand is wat overbodig.
    if ($event.srcElement.id == "xml") {
      console.log("xml file vullen");
      this.fileXml = files[0];
    } else if ($event.srcElement.id == "img") {
      console.log("img file vullen");
      this.fileImg = files[0];
      let readerImg = new FileReader();
      readerImg.onload = (e) => {
        console.log("Omzetten van imgToUpload");
        // console.log(e);
        // console.log(readerImg.result);
        document.getElementById("imgToUpload").setAttribute("src", readerImg.result);
        this.stringImgBase64 = readerImg.result;
      }
      readerImg.readAsDataURL(this.fileImg);
    } else { // ook nog code voor mp3. voor later		 } else { // ook nog code voor mp3. voor later
      console.log("Onbekende id voor updateFile: " + $event.srcElement.id);
    }
  }

  postMuziekstuk() {
    console.log(this.muziekstukInvoer);
    let readerXML: FileReader = new FileReader();
    let readerIMG: FileReader = new FileReader();
    let fileImg: File = this.fileImg;
    if (this.fileXml != null) {     //post werkt alleen als xml is geselecteerd

      // zonder .subscribe werkt het niet!
      // Deze code gaan gebruiken, zodra backend text (id) teruggeeft ipv json
      this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe(muziekstukId => {

        console.log("Muziekstuk gepost, succes! - " + muziekstukId);
        this.muziekstukId = +muziekstukId;
        // upload xml
        readerXML.onload = (e) => {
          // console.log(readerXML.result);
          this.muziekstukService.postXml(this.muziekstukId, readerXML.result).subscribe(nr => {
            console.log("statusXML: " + nr);
            if (fileImg != null) {
              console.log("image uploaden... ");
              this.muziekstukService.postImg(this.muziekstukId, this.stringImgBase64).subscribe(nr => {
                console.log("statusIMG: " + nr);
              });
              readerIMG.readAsDataURL(fileImg);
            }
          });
        }
        readerXML.readAsText(this.fileXml);  // xml omzetten naar text
        // test img
        // zou deze code (en ook die van uploadXML) niet buiten de postMuziekstuk kunnen? Even een keer proberen.
        // of moet deze wellicht binnen die van de xml (alleen uitvoeren wanneer dat is afgelopen??)
      });
    } else this.noXml = 'Upload mislukt; selecteer eerst XML-bestand';
  }
}
