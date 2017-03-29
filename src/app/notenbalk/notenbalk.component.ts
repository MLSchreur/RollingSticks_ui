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
    deFunctie() {
        console.log("HIJ DOET ET");
    }
}
//export function myFunction2{
 //   console.log("asdfsadf);

//}
