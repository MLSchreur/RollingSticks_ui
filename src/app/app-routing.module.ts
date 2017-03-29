import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule }          from '@angular/router';
import { BladmuziekComponent }           from 'app/bladmuziek/bladmuziek.component';
import { LeerlingComponent }             from 'app/leerling/leerling.component';
import { DocentComponent }               from 'app/Docent/docent.component';
import { HomeComponent }                 from 'app/home/Home.component';
import { DocentmenuComponent }           from 'app/docent/docentmenu.component';
import { LogoutComponent }               from 'app/login/logout.component';
import { LoginComponent }                from 'app/login/login.component';


// Route Confiratie van de menu's
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home'    , component: HomeComponent },
  { path: 'leerling', component: LeerlingComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'loguit'  , component: LogoutComponent },
  { path: 'docent'  , component: DocentComponent,  children: [
      { path: '', redirectTo: 'docentmenu', pathMatch: 'full' },
      { path: 'docentmenu', component: DocentmenuComponent }
//    { path: 'docentmenu', component: DocentmenuComponent, outlet: 'sidemenu' }
  ]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


