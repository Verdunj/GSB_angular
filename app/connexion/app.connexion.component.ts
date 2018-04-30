import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../service/app.service.data';
import {Sha1Service} from '../service/app.service.crypto';

@Component({
    moduleId: module.id,
    selector: 'my-connexion',
    templateUrl: 'app.connexion.html',
    styleUrls: ['app.connexion.css']
})

export class ConnexionComponent {

    titre: string = "Connexion";
    login: string;
    mdp: string;
    hide: boolean = true;
    errorMessage: string;
//    visiteur : any;

    constructor(private router: Router, private dataService: DataService, private sha1Service : Sha1Service) {}

    valider(): void {
        this.dataService.login(this.login)
            .subscribe(
                (data) => {
                    this.dataService.ticket = data;
                    this.connexion();
                },
                (error) => {
                    this.errorMessage = "Erreur de login";
                    this.hide = false;
                }
            );
    }
    
    private connexion(): void {
        let mdpHache : string = this.sha1Service.hash(this.dataService.ticket + this.mdp);
        
        this.dataService.connexion(this.login, mdpHache)
            .subscribe(
                (data) => {
                    this.dataService.ticket = data;
                    this.hide = true;
                    this.router.navigate(['accueil']);
                },
                (error) => {
                    this.errorMessage = "Erreur de mot de passe";
                    this.hide = false;
                }
            );
    }
}
