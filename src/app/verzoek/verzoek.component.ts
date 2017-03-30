import { Component }        from '@angular/core';

import { Verzoek }          from './verzoek';
import { VerzoekService }   from './verzoek.service';

@Component({
    selector    : 'my-verzoek',
    templateUrl : './verzoek.component.html',
    styleUrls   : ['./verzoek.component.css'],
    providers   : [ VerzoekService ]

})

export class VerzoekComponent{
    title           = 'Verzoeken'; 
    verzoekStatus   = ['aangevraagd','opgepakt','gereed', 'voltooid'];
    selectedStatus  = 'aangevraagd';

    verzoeken:      Verzoek[];
    verzoek:        Verzoek;
    verzoekInvoer:  Verzoek = new Verzoek;
    verzoekPut:     Verzoek = new Verzoek;
    verzoekId:      number;

    constructor(private verzoekService: VerzoekService){
        this.verzoekInvoer.status = "Aangevraagd";
        this.getVerzoeken();      
    }

    //weergeven van lijst met alle verzoeken
    getVerzoeken() {
        this.verzoekService.getVerzoeken().subscribe(verzoeken => {
            this.verzoeken = verzoeken;
        });
    }

    // functie voor het posten van nieuwe verzoeken
    postVerzoek() {
        this.verzoekService.postVerzoek(this.verzoekInvoer).subscribe(verzoekInvoer => {
            this.verzoek = verzoekInvoer;
            this.verzoekInvoer = verzoekInvoer.id;
            location.reload();
        });
    }

    // functie voor het verwijderen van nieuwe verzoeken
    deleteVerzoek(id: number) {
        this.verzoekService.deleteVerzoek(id).subscribe(verzoek => {
            this.reloadPage();
        });
    }

    // functie voor het herladen van de pagina
    reloadPage(){
        location.reload();
    }

    // in editmodus vullen van de invoervelden met bestaande objectgegevens
    fillMuziekInvoer(verzoek: Verzoek){
        this.verzoekPut.id = verzoek.id;
        this.verzoekPut.aanvrager = verzoek.aanvrager;
        this.verzoekPut.httpMethod = verzoek.httpMethod;
        this.verzoekPut.url = verzoek.url;
        this.verzoekPut.meegeven = verzoek.meegeven;
        this.verzoekPut.terug = verzoek.terug;
        this.verzoekPut.omschrijving = verzoek.omschrijving;

        //verander class van alle elementen die niet in editmodus zitten
        let changeClass = document.getElementsByName("pencil");
        for (let i = 0; i < changeClass.length; i++) {
            changeClass[i].setAttribute("disabled", "true");
            changeClass[i].setAttribute("class","grey-fill");
        }
        
    }

    // wijzigen van bestaand verzoek
    putVerzoek() {
        this.verzoekService.putVerzoek(this.verzoekPut).subscribe(verzoekPut => {
            this.verzoek = verzoekPut;
            this.verzoekPut = verzoekPut;
            this.editModusOff();
            location.reload();
        });
    }

    //verander class van elementen die niet in editmodus zijn
    editModusOff() {
        let changeClass = document.getElementsByName("pencil");
        for (let i = 0; i < changeClass.length; i++) {         
            changeClass[i].removeAttribute("disabled");
            changeClass[i].setAttribute("class","bleu-fill");
        }
    }

    //functie voor het veranderen van de status
    changeStatus(status) {
        this.selectedStatus = status;
        this.verzoekPut.status = this.selectedStatus;
    }

}