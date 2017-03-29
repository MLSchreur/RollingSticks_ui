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

  updateFile($event) {
    let files = $event.srcElement.files;
    this.fileXml = files[0];
  }


  postMuziekstuk() {
    console.log(this.muziekstukInvoer);
    let ms = this.muziekstukService;
    let reader: FileReader = new FileReader();
    if (this.fileXml != null) {     //post werkt alleen als xml is geselecteerd

      // zonder .subscribe werkt het niet!
      // Deze code gaan gebruiken, zodra backend text (id) teruggeeft ipv json
      //this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe();
      this.muziekstukService.postMuziekstuk(this.muziekstukInvoer).subscribe(muziekstukId => {

        console.log("Muziekstuk gepost, succes!");
        console.log(muziekstukId);
        this.muziekstukId = +muziekstukId;
        // upload xml
        reader.onload = function (e) {
          console.log(reader.result);
          ms.postXml(+muziekstukId, reader.result).subscribe(nr => {
            console.log("status" + nr);
          });
        }
        reader.readAsText(this.fileXml);  // xml omzetten naar text
      });
    } else alert("XML bestand selecteren")
  }
}