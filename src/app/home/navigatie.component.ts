import { Component }         from  '@angular/core';
import { Router }            from  '@angular/router';
import { AppGlobalService }  from '../app.global.service';

@Component({
  selector:               'navigatie',
  templateUrl:            './navigatie.component.html',
  styles:                 [`
    .nav-link {
      cursor: pointer;
    }
  `]
})
export class NavigatieComponent {
  title = 'navigatie';

  constructor(private router: Router, private appGlobalService: AppGlobalService) {
  }

  checkHome() {
    switch (this.appGlobalService.getLoginStatus()) {
      case 2: this.router.navigate(['docent']); break;
      case 1: this.router.navigate(['leerling']); break;
      default: this.router.navigate(['']);
    }
  }

  checkDocent() {
    if (this.appGlobalService.getLoginStatus() == 2) {
      this.router.navigate(['docent']);
    }
  }

  checkLeerling() {
    if (this.appGlobalService.getLoginStatus() >= 1) {
      this.router.navigate(['leerling']);
    }
  }

  checkLoguit() {
    if (this.appGlobalService.getLoginStatus() >= 1) {
      this.router.navigate(['loguit']);
    }
  }

  checkVerzoek() {
    if (this.appGlobalService.getLoginStatus() == 2) {
      this.router.navigate(['verzoek']);
    }
    
  }
}


