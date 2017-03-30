import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule }          from '@angular/router';
import { BladmuziekComponent }           from 'app/bladmuziek/bladmuziek.component';
import { LeerlingComponent }             from 'app/leerling/leerling.component';
import { DocentComponent }               from "app/docent/docent.component";
import { HomeComponent }                 from "app/home/home.component";
import { LeerlingOverzichtComponent }    from "app/docent/leerlingoverzicht.component";
import { LogoutComponent }               from "app/login/logout.component";
import { LoginComponent }                from "app/login/login.component";
import { LeerlingAanmakenComponent }     from "app/docent/leerlingaanmaken.component";
// voor Observable is deze import nodig. Het bestand rxjs-extenstions.ts moet in dezelfde map staan als waar de app.module.ts staat (app).
// Later import verplaatsen na implementeren van routing.
import './rxjs-extensions';

// Route Confiratie van de menu's
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home'    , component: HomeComponent },
  { path: 'leerling', component: LeerlingComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'loguit'  , component: LogoutComponent },
  { path: 'docent'  , component: DocentComponent,  children: [
      { path: '',                   component: DocentComponent},
      { path: 'leerlingoverzicht',  component: LeerlingOverzichtComponent},
      { path: 'leerlingaanmaken',   component: LeerlingAanmakenComponent}
  ]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


