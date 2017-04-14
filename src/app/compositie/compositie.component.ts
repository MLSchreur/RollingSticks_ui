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
  cursorLeft: number = 0;
  cursorTop : number = 0;
  partLeft  : number;
  partTop   : number;
  markerStartLeft: number;
  markerStartTop : number;
  markerEndLeft  : number;
  markerEndTop   : number;
  source;

  constructor(private compositieService: CompositieService) {
  }

  ngOnInit() {
    this.loadMusic();
    this.partLeft = 50 + Math.round(document.getElementById("part").getBoundingClientRect().left);
    this.partTop  = 50 + Math.round(document.getElementById("part").getBoundingClientRect().top);
    console.log("PART: left=" + this.partLeft + " top=" + this.partTop);
    this.setMarkers();
  }

  setMarkers() {
    this.markerStartLeft = Math.round(document.getElementById("cursorStart").getBoundingClientRect().left);
    this.markerStartTop  = Math.round(document.getElementById("cursorStart").getBoundingClientRect().top);
    this.markerEndLeft   = Math.round(document.getElementById("cursorEnd").getBoundingClientRect().left);
    this.markerEndTop    = Math.round(document.getElementById("cursorEnd").getBoundingClientRect().top);
    this.cursorLeft = this.markerStartLeft - this.partLeft;
    this.cursorTop  = this.markerStartTop - this.partTop;
    console.log("MARKER START: left=" + this.markerStartLeft + " top=" + this.markerStartTop);
    console.log("MARKER END  : left=" + this.markerEndLeft   + " top=" + this.markerEndTop);
    console.log("CURSOR      : left=" + this.cursorLeft      + " top=" + this.cursorTop);
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
        cursor.style.left = "384px";
        cursor.style.top  = "160px";
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
  }

  playMusic() {
    this.d1 = new Date();
    console.log("Play Music");
    if (this.compositieService.source == undefined) {
      this.compositieService.setInterval(parseInt(document.getElementById("setTempo").getAttribute("value")));
      this.compositieService.createInterval();
    }
    this.source = this.compositieService.source.subscribe(data => {
      if (data.height != "") {
        document.getElementById("playingNote").textContent = data.length + " " + data.height;
      }
      this.printTime();
      this.cursorLeft += 8;
      if ((this.cursorLeft > 384) || ( (this.cursorLeft > this.markerEndLeft - this.partLeft) && (this.cursorTop == this.markerEndTop - this.partTop)) ) {
        if (this.cursorTop == this.markerEndTop - this.partTop) {
          this.cursorLeft = this.markerStartLeft - this.partLeft;
          this.cursorTop  = this.markerStartTop  - this.partTop;
        }  else {
          this.cursorLeft = 0;
          this.cursorTop += 80;
          if (this.cursorTop > 160) {
            this.cursorTop = this.markerStartTop - this.partTop;
          }
        }
      }
      document.getElementById("cursor").style.left = this.cursorLeft + "px";
      document.getElementById("cursor").style.top = this.cursorTop + "px";
    });
  }

  pauseMusic() {
    if (this.compositieService.source != undefined) {
      this.source.unsubscribe();
    }
  }

  printTime() {
    let d = new Date();
    let diff = (d.getMinutes()-this.d1.getMinutes())*60 + (d.getSeconds() - this.d1.getSeconds());
    diff = diff*1000 + (d.getMilliseconds() - this.d1.getMilliseconds());
    document.getElementById("time").textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " ---- Time elapsed (ms): " + diff;
  }

  markStart() {
    let t = this;
    document.getElementById("part").addEventListener("click", function($event) { 
      document.getElementById("part").removeEventListener("click");

      let cursorStart = document.getElementById("cursorStart");
      let clickX = $event.screenX;
      let clickY = $event.screenY;
      cursorStart.style.left = (clickX - t.partLeft) + "px";
      if ((clickY - t.partTop) < 80) {
        cursorStart.style.top = "0px";
      } else if ((clickY - t.partTop) < 160) {
        cursorStart.style.top = "80px";
      } else {
        cursorStart.style.top = "160px";
      }
      t.setMarkers();
    });
  }

  markEnd() {
    let t = this;
    document.getElementById("part").addEventListener("click", function($event) { 
      document.getElementById("part").removeEventListener("click");

      let cursorEnd = document.getElementById("cursorEnd");
      let clickX = $event.screenX;
      let clickY = $event.screenY;
      cursorEnd.style.left = (clickX - t.partLeft) + "px";
      if ((clickY - t.partTop) < 80) {
        cursorEnd.style.top = "0px";
      } else if ((clickY - t.partTop) < 160) {
        cursorEnd.style.top = "80px";
      } else {
        cursorEnd.style.top = "160px";
      }
      t.setMarkers();
    });
  }

  setTempo(tempo) {
    this.compositieService.setInterval(tempo);
    if (this.compositieService.source != undefined) {    
      this.pauseMusic();
      this.compositieService.createInterval();
      this.playMusic();
    }
  }
}

