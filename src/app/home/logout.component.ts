import { Component }         from  '@angular/core';
import { OnInit }            from  '@angular/core';
import { Router }            from  '@angular/router';
import { Observable }        from 'rxjs/Rx';
import { AppGlobalService }  from '../app.global.service';

@Component({
  selector:                   'logout',
  templateUrl:                './logout.component.html',
  styles: [`
    div {
      background: transparent;
      text-align: center;
      color: white;
    }
    h1 {
      margin-top: 100px;
      font-size: 4vw;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-variant: normal;
    }
    p {
      margin-top: 50px;
      font-size: 2vw;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  `]
})
export class LogoutComponent implements OnInit {
  counter: number = 5;

  source = Observable.interval(1000).map(() => {
    this.counter--;
    if (this.counter < 1) {
      //window.location.href = this.appGlobalService.location.origin;
      window.open(this.appGlobalService.location.origin, "_self")
    } else {
      document.getElementById("countDown").textContent = "Terug naar login pagina in " + this.counter + " seconden!";
    }
  });

  constructor(private router: Router, private appGlobalService: AppGlobalService) {
    this.appGlobalService.setLoginStatus(0);
    this.source.subscribe();
  }

  ngOnInit() {
    document.getElementById("countDown").textContent = "Terug naar login pagina in " + this.counter + " seconden!";
  }
}