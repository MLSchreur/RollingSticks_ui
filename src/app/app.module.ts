import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { AppRoutingModule }             from './app-routing.module';
import { AlertModule }                  from 'ng2-bootstrap';

// import './rxjs-extensions';
import { NotenbalkComponent }           from './notenbalk/notenbalk.component';
import { AppComponent }                 from './app.component';
import { BladmuziekComponent }          from './bladmuziek/bladmuziek.component';
import { MuziekstukComponent }          from './muziekstuk/muziekstuk.component';
import { DocentComponent }              from './docent/docent.component';
import { LeerlingComponent }            from './leerling/leerling.component';
import { HomeComponent }                from './home/home.component';
import { LoginComponent }               from './login/login.component';
import { LeerlingOverzichtComponent }   from "./docent/leerlingoverzicht.component";
import { LeerlingAanmakenComponent }    from "./docent/leerlingaanmaken.component";
import { LogoutComponent }              from './login/logout.component';
import { VerzoekComponent }             from "./verzoek/verzoek.component";


@NgModule({
  declarations: [
    AppComponent,
    BladmuziekComponent,
    LoginComponent,
    MuziekstukComponent,
    DocentComponent,
    LeerlingComponent,
    HomeComponent,
    LeerlingOverzichtComponent,
    LogoutComponent,
    NotenbalkComponent,
    LeerlingAanmakenComponent,
    VerzoekComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
