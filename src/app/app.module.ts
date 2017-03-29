import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import { RouterModule, Routes }   from '@angular/router';
import { AppRoutingModule }       from './app-routing.module';

// voor Observable is deze import nodig. Het bestand rxjs-extenstions.ts moet in dezelfde map staan als waar de app.module.ts staat (app).
// Later import verplaatsen na implementeren van routing.
import './rxjs-extensions';

import { AppComponent }           from './app.component';
import { BladmuziekComponent }    from './bladmuziek/bladmuziek.component';
import { LoginComponent }         from './login/login.component';
import { AlertModule }            from 'ng2-bootstrap';
import { DocentComponent }        from "app/Docent/docent.component";
import { LeerlingComponent }      from "app/leerling/leerling.component";
import { HomeComponent }                 from "app/home/Home.component";
import { LeerlingOverzichtComponent }    from "app/docent/leerlingoverzicht.component";
import { LogoutComponent }                from 'app/login/logout.component';
import { LeerlingAanmakenComponent }                from "app/docent/leerlingaanmaken.component";


@NgModule({
  declarations: [
    AppComponent,
    BladmuziekComponent,
    LoginComponent,
    DocentComponent,
    LeerlingComponent,
    HomeComponent,
    LeerlingOverzichtComponent,
    LogoutComponent,
    LeerlingAanmakenComponent,
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
