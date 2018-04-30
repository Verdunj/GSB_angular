import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';

import {ConnexionComponent} from './connexion/app.connexion.component';
import {MedecinsComponent} from './medecins/app.medecins.component';
import {VisitesComponent} from './visites/app.visites.component';
import {NavbarComponent} from './navbar/app.navbar.component';
import {AppComponent} from './app.component';
import {DataService} from './service/app.service.data';
import {Sha1Service} from './service/app.service.crypto';


const appRoutes: Routes = [
    {path: '', component: ConnexionComponent},
    {path: 'connexion', component: ConnexionComponent},
    {path: 'medecins', component: MedecinsComponent},
    {path: 'visites', component: VisitesComponent},
    {path: 'accueil', component: NavbarComponent}
];


@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes), HttpModule],
    declarations: [AppComponent, ConnexionComponent, NavbarComponent, MedecinsComponent, VisitesComponent],
    providers: [DataService, Sha1Service],
    bootstrap: [AppComponent]
})


export class AppModule {}
