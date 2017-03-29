import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'docentmenu',
  templateUrl: './docentmenu.component.html',
})
export class DocentmenuComponent {
  title = 'docentmenu';

constructor(route: ActivatedRoute) {

      route.params.subscribe(params => console.log("side menu id parameter",params['id']));

  }
}

