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
import { MuziekstukComponent }    from './muziekstuk/muziekstuk.component';
import { AlertModule }            from 'ng2-bootstrap';
import { FileSelectDirective,
         FileDropDirective }      from 'ng2-file-upload';
import { DocentComponent }        from "./Docent/docent.component";
import { LeerlingComponent }      from "./leerling/leerling.component";
import { HomeComponent }          from "./home/Home.component";
import { DocentmenuComponent }    from "./docentmenu/docentmenu.component";
import { LogoutComponent }         from './login/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    BladmuziekComponent,
    LoginComponent,
    MuziekstukComponent,
    FileSelectDirective,
    DocentComponent,
    LeerlingComponent,
    HomeComponent,
    DocentmenuComponent,
    LogoutComponent,
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
