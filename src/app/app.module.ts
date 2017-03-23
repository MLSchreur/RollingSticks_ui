import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';

// voor Observable is deze import nodig. Het bestand rxjs-extenstions.ts moet in dezelfde map staan als waar de app.module.ts staat (app).
// Later import verplaatsen na implementeren van routing.
import './rxjs-extensions';

import { AppComponent }           from './app.component';
import { BladmuziekComponent }    from './bladmuziek/bladmuziek.component';

@NgModule({
  declarations: [
    AppComponent,
    BladmuziekComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
