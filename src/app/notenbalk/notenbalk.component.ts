import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'my-notenbalk',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './notenbalk.component.html', 
    styleUrls: ['./color.css', 
                './music.css'
    ]

})
export class NotenbalkComponent {
    title = 'notenbalk works!';

    opbouwNotenbalk(newNote) {
        let deNotenbalk = document.getElementById("notenkeuze");
        // console.log(deNotenbalk);
        // console.log(deNotenbalk.innerHTML);
        // console.log(newNote);
       deNotenbalk.innerHTML += '<div class="' + newNote + '"></div>';
    }
}