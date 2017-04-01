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

  allMuziekstuk: Muziekstuk[];
  muziekstuk: Muziekstuk;
  muziekstukInvoer: Muziekstuk = new Muziekstuk;
  muziekstukId: number;
  fileXml: File;
  fileImg: File;

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
    // test img
    console.log($event.srcElement.id);
    if ($event.srcElement.id == "xml") {
      console.log("xml file vullen");
      this.fileXml = files[0];
    } else if ($event.srcElement.id == "xml") {
      console.log("img file vullen");
      this.fileImg = files[0];
    } else {
      this.fileImg = files[0];
    }
    console.log("update van files");
    if (this.fileImg != null) {
      console.log("img gevuld...");
    } else {
      console.log("img leeg...");
    }
  }

  postMuziekstuk() {
    console.log(this.muziekstukInvoer);
    let ms = this.muziekstukService;
    let reader1: FileReader = new FileReader();
    let reader2: FileReader = new FileReader();
    if (this.fileXml != null) {     //post werkt alleen als xml is geselecteerd

      // zonder .subscribe werkt het niet!
      // Deze code gaan gebruiken, zodra backend text (id) teruggeeft ipv json
      //this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe();
      this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe(muziekstukId => {

        console.log("Muziekstuk gepost, succes!");
        console.log(muziekstukId);
        this.muziekstukId = +muziekstukId;
        // upload xml
        reader1.onload = function (e) {
          console.log(reader1.result);
          ms.postXml(+muziekstukId, reader1.result).subscribe(nr => {
            console.log("statusXML" + nr);
          });
        }
        reader1.readAsText(this.fileXml);  // xml omzetten naar text

        // test img
        if (this.fileImg != null) {
          console.log("image uploaden... ");
          reader2.onload = function (e) {
            console.log(reader2.result);
            ms.postImg(+muziekstukId, btoa(reader2.result)).subscribe(nr => {
              console.log("statusIMG" + nr);
            });
          }
          reader2.readAsBinaryString(this.fileImg);  // img omzetten naar binary string

          // var reader3 = new FileReader();

          // reader3.onload =this._handleReaderLoaded.bind(this);

          // console.log(reader3.result);
          // ms.postImg(+muziekstukId, reader3.result).subscribe(nr => {
          //   console.log("statusIMG" + nr);
          // });

          // reader3.readAsBinaryString(this.fileImg);

        } 
      });
    } else alert("XML bestand selecteren")
  }
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target3.result;
            this.base64textString= btoa(binaryString);
            console.log("btoa (binaryString");
            console.log(btoa(binaryString));
            console.log("base64textString");
            console.log(this.base64textString);
    }

}
