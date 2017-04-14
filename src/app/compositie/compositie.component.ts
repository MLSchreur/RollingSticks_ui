import { Component, OnInit }  from '@angular/core';
import { CompositieService }  from './compositie.service';
import { ViewEncapsulation }  from '@angular/core';

import { Maat }               from './maat';
import { Noot }               from './noot';


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

  ngOnInit() {
    this.loadMusic();
  }

  constructor(private compositieService: CompositieService) {
  }

  loadMusic() {
    this.maten = this.compositieService.getNotes();
    let part = document.getElementById("part");
    part.innerHTML = "";
    let staff;
    for (let i=0 ; i<this.maten.length ; i++) {
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
        cursor.setAttribute("id", "cursorStart");
        cursor.setAttribute("class", "bar");
        staff.appendChild(cursor);        
        cursor = document.createElement("div");
        cursor.setAttribute("id", "cursor");
        cursor.setAttribute("class", "bar");
        staff.appendChild(cursor);
        cursor = document.createElement("div");
        cursor.setAttribute("id", "cursorEnd");
        cursor.setAttribute("class", "bar");
        staff.appendChild(cursor);      
      }
      for (let j=0 ; j<this.maten[i].noten.length ; j++) {
        let note = document.createElement("div");
        note.setAttribute("class", this.maten[i].noten[j].length + " note " + this.maten[i].noten[j].height);
        staff.appendChild(note);
      }
      let bar = document.createElement("div");
      bar.setAttribute("class", "bar");
      staff.appendChild(bar);
    }
    this.getElementPositionLeft(document.getElementById("cursor"));
    this.getElementPositionTop(document.getElementById("cursorStart"));
    this.getElementPositionTop(document.getElementById("cursorEnd"));
  }

  getElementPositionLeft(el: Element): number {
    let offsetX: number = el.getBoundingClientRect().left - document.body.getBoundingClientRect().left;
    console.log(el.id + ": left=" + offsetX);
    return offsetX;
  }
  getElementPositionTop(el): number {
    let offsetY: number = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
    console.log(el.id + " top=" + offsetY);
    return offsetY;
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

  markStart() {
    document.getElementById("part").addEventListener("click", this.setStart);
  }

  setStart($event) {
    let clickX = $event.screenX;
    let clickY = $event.screenY;
    let part = document.getElementById("part");
    document.getElementById("part").removeEventListener("click", this.setStart);
    let posX = part.getBoundingClientRect().left - document.body.getBoundingClientRect().left + 50;
    let posY = part.getBoundingClientRect().top  - document.body.getBoundingClientRect().top + 100;
    console.log("clickX=" + clickX + " posX=" + posX + " clickY=" + clickY + " posY=" + posY);

    let cursorStart = document.getElementById("cursorStart");
    cursorStart.style.left = (clickX - posX) + "px";
    if ((clickY - posY) < 80) {
      cursorStart.style.top = "0px";
    } else if ((clickY - posY) < 160) {
      cursorStart.style.top = "80px";
    } else {
      cursorStart.style.top = "160px";
    }
  }

  markEnd() {
    document.getElementById("part").addEventListener("click", this.setEnd);
  }

  setEnd($event) {
    let clickX = $event.screenX;
    let clickY = $event.screenY;
    let part = document.getElementById("part");
    document.getElementById("part").removeEventListener("click", this.setStart);
    let posX = part.getBoundingClientRect().left - document.body.getBoundingClientRect().left + 50;
    let posY = part.getBoundingClientRect().top  - document.body.getBoundingClientRect().top + 100;
    console.log("clickX=" + clickX + " posX=" + posX + " clickY=" + clickY + " posY=" + posY);

    let cursorEnd = document.getElementById("cursorEnd");
    cursorEnd.style.left = (clickX - posX) + "px";
    if ((clickY - posY) < 80) {
      cursorEnd.style.top = "0px";
    } else if ((clickY - posY) < 160) {
      cursorEnd.style.top = "80px";
    } else {
      cursorEnd.style.top = "160px";
    }
  }  
}