import { Component }          from '@angular/core';
import { ActivatedRoute }     from "@angular/router";

@Component({
  selector:                   'leerlingoverzicht',
  templateUrl:                './leerlingoverzicht.component.html',
})
export class LeerlingOverzichtComponent {
  title = 'docentmenu';

constructor(route: ActivatedRoute) {

      route.params.subscribe(params => console.log("side menu id parameter",params['id']));

  }
}

