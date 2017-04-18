import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'my-notenbalk',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './notenbalk.component.html', 
    styleUrls: [ './music.css']
})

export class NotenbalkComponent {
    noten = [
        "bar end", 
        "bar", 
        "bar double", 
        "quarter note f4", 
        "half note e4", 
        "quarter note g4", 
        "quarter note a5", 
        "half note b5", 
        "quarter note down c5", 
        "double bar", 
        "quarter note c5", 
        "half note a5", 
        "quarter note e5", 
        "quarter note c5", 
        "quarter note e5", 
        "quarter note f5", 
        "quarter note g4", 
        "half note d5", 
        "half note down a5"
    ];

    opbouwNotenbalk(newNote) {
        let deNotenbalk = document.getElementById("notenkeuze");
        // console.log(deNotenbalk);
        // console.log(deNotenbalk.innerHTML);
        // console.log(newNote);
       deNotenbalk.innerHTML += '<div class="' + newNote + '"></div>';
    }
}