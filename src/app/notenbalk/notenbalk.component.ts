import { Component } from '@angular/core';
//import { Notenbalk } from './notenbalk';
//import { NotenbalkService } from './notenbalk.service';

@Component({
    selector: 'my-notenbalk',
    templateUrl: './notenbalk.component.html', 
    styleUrls: ['./color.css', 
                './music.css'
    ]

})
export class NotenbalkComponent {
    title = 'notenbalk works!';
    noten = '<div class="quarter note f4"></div>';
    //   export function myFunction2() {
    // alert();
    //     //	loadCSS("color.css");alert();
    //     var checkBoxen = document.forms[0];
    //     for (var i = 0; i < checkBoxen.length; i++) {
    //         if (checkBoxen[i].checked) {
    //             var newNote = checkBoxen[i].value;
    //         }

    //     }
    //     var deNotenbalk = document.getElementById("notenkeuze");
    //     var huidigeInhoud = deNotenbalk.innerHTML;
    //     deNotenbalk.innerHTML = huidigeInhoud + '<div class="' + newNote + '"></div>';

    // }
    deFunctie(newNote) {
//         let deNotenbalk = document.getElementById("notenkeuze");
//         //console.log(deNotenbalk);
//         let huidigeInhoud = deNotenbalk.innerHTML;
//         console.log(huidigeInhoud);
//         console.log(newNote);
// //        deNotenbalk.innerHTML = huidigeInhoud + '<div class="' + newNote + '"></div>';
//         deNotenbalk.innerHTML = huidigeInhoud + '<div _ngcontent-osd-10 class="quarter note g4"></div>';
//         huidigeInhoud = deNotenbalk.innerHTML;
//         console.log(huidigeInhoud);

//         // alternatief via querySelector
//         let myContainer = <HTMLElement> document.querySelector("#notenkeuze");
// //        myContainer.innerHTML += '<h1>Test</h1>';
//         myContainer.innerHTML += '<div class="quarter note g4"></div>';
//         // let myContainerHTML = myContainer.innerHTML;
//         // myContainerHTML += '<div _ngcontent-osd-10 class="quarter note g4"></div>';

        let bovenBalk = document.getElementById("voorbeeldbalk");
        let nootVanBoven = bovenBalk.removeChild(bovenBalk.firstChild);
        console.log(nootVanBoven);
        let deNotenbalk = document.getElementById("notenkeuze");
        deNotenbalk.appendChild(nootVanBoven);
    }
}
//export function myFunction2{
 //   console.log("asdfsadf);

//}
