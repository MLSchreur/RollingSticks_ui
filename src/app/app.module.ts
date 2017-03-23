import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';

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
