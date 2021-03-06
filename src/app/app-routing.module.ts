import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule }          from '@angular/router';


import { BladmuziekComponent }           from 'app/bladmuziek/bladmuziek.component';
import { LeerlingComponent }             from 'app/leerling/leerling.component';
import { DocentComponent }               from "app/docent/docent.component";
import { HomeComponent }                 from "app/home/home.component";
import { LeerlingOverzichtComponent }    from "app/docent/leerlingoverzicht.component";
import { LogoutComponent }               from "app/home/logout.component";
import { LoginComponent }                from "app/home/login.component";
import { LeerlingAanmakenComponent }     from "app/docent/leerlingaanmaken.component";
import { DocentAanmakenComponent }       from "app/docent/docentaanmaken.component";
import { VerzoekComponent }              from "app/verzoek/verzoek.component";
import { MuziekstukComponent }           from "app/muziekstuk/muziekstuk.component";
import { MuziekstukoverzichtComponent }  from "app/muziekstuk/muziekstukoverzicht.component";
import './rxjs-extensions';


// Route Configuratie van de menu's
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home'            , component: HomeComponent      },

  { path: 'login'           , component: LoginComponent     },
  { path: 'loguit'          , component: LogoutComponent    },
  { path: 'verzoek'         , component: VerzoekComponent   },
  { path: 'leerling'        , component: LeerlingComponent,  children: [

      { path: 'leerlingoverzicht'       ,   component: MuziekstukoverzichtComponent   },
      { path: 'muziekles'               ,   component: MuziekstukoverzichtComponent   },
      { path: 'huiswerkleerling'        ,   component: MuziekstukoverzichtComponent   },
      { path: 'muziekoverzichtleerling' ,   component: MuziekstukoverzichtComponent   },
  ]},
  { path: 'docent'               ,     component: DocentComponent,  children: [

      { path: 'leerlingoverzicht'       ,   component: LeerlingOverzichtComponent     },
      { path: 'leerlingaanmaken'        ,   component: LeerlingAanmakenComponent      },
      { path: 'docentaanmaken'          ,   component: DocentAanmakenComponent        },
      { path: 'muziekupload'            ,   component: MuziekstukComponent            },
      { path: 'muziekoverzicht'         ,   component: MuziekstukoverzichtComponent   },
  ]},
         { path: '**'                   , redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


