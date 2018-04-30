import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../service/app.service.data';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'my-medecins',
    templateUrl: 'app.medecins.html'
})

export class MedecinsComponent {

    titre: string = "Gestion des medecins";
    hide_menu: boolean = true;
    hide_list: boolean = true;
    hide_modif: boolean = true;
    lesMedecins: Array<any>;
    nomMedecin: string;
    myMedecin: any;
    lesRapports: Array<any>;
    afficherRapports: boolean = false;
    afficherMedecin: boolean = false;
    afficherMessage: boolean = false;
    message: string;
    class_response: string;

    constructor(private dataService: DataService, private router: Router) {}

    charger(): void {

        this.hide_menu = true;
        this.afficherRapports = false;
        this.afficherMedecin = false;
        this.afficherMessage = false;

        if (this.nomMedecin != "") {
            this.dataService.chargerMedecins(this.nomMedecin)
                .subscribe(
                    (data) => {
                        this.hide_list = false;
                        this.lesMedecins = data['medecins'];
                        this.dataService.ticket = data['ticket'];
                    },
                    (error) => {
//                        this.router.navigate(['']);
                    }
                );
        } else {
            this.hide_list = true;
        }
    }


    selectionner(medecin): void {
        this.hide_list = true;
        this.hide_menu = false;
        this.nomMedecin = medecin.nom + " " + medecin.prenom + " / département : " + medecin.departement;
        this.myMedecin = medecin;
    }


    derniersRapports(): void {

        this.afficherMedecin = false;
        this.afficherMessage = false;
        this.dataService.chargerRapports(this.myMedecin.id)
            .subscribe(
                (data) => {
                    this.afficherRapports = true;
                    this.lesRapports = data['rapports'];
                    this.dataService.ticket = data['ticket'];
                },
                (error) => {
//                    this.router.navigate(['']);
                }
            );
    }


    valider(): void {
        this.afficherMessage = true;
        this.dataService.majMedecin(this.myMedecin.id, this.myMedecin.adresse, this.myMedecin.tel, this.myMedecin.specialitecomplementaire)
            .subscribe(
                (data) => {
                    this.dataService.ticket = data;
                    this.message = "Enregistrement effectué"
                    this.class_response = "success"
                },
                (error) => {
                    this.message = "Enregistrement non effectué"
                    this.class_response = "danger"
                }
            );
    }


    majMedecin(): void {
        this.afficherRapports = false;
        this.afficherMedecin = true;
    }



}