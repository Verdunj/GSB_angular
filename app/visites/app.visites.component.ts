import {Component} from '@angular/core';
import {DataService} from '../service/app.service.data';
import {Observable} from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'my-visites',
    templateUrl: 'app.visites.html'

})
export class VisitesComponent {
    nomMedecin: string;
    nomMedicament: string;
    lesMedecins: Array<any>;
    lesMedicaments: Array<any>;
    lesMedicamentsSelectionner: Array<any> = new Array();
    medecin: any;
    qteSelect: number = 1;
    medicament: any;
    messageMAJ: string = "";
    classMaj: string = "";
    leRapport: any;
    motif: string;
    bilan: string;
    lesRapports: Array<any>;
    dateVisite: Date;
    dateNouveauRapport: Date;
    gestionMajRapport: boolean = false;
    gestionAjoutRapport: boolean = false;
    afficherRapport: boolean = false;
    afficherRapportMAJ: boolean = false;
    printLesMedecins: boolean = false;
    printLesMedicaments: boolean = false;


    // compléter en ajoutant les champs présent dans le fichier HTML
    constructor(private dataService: DataService) {

    }
    chargerMedecins() {
        if (this.nomMedecin != "") {
            this.printLesMedecins = true;
            this.dataService.chargerMedecins(this.nomMedecin)
                .subscribe(
                    (data) => {
                        this.lesMedecins = data['medecins'];
                        this.dataService.ticket = data['ticket'];
                    },
                    (error) => {}
                );
        } else {
            this.printLesMedecins = false;
        }
    }
    selectionnerMedecin(leMedecin): void {
        this.classMaj = this.messageMAJ = "";
        this.medecin = leMedecin;
        this.printLesMedecins = false;
        this.nomMedecin = leMedecin.nom + " " + leMedecin.prenom + " / département : " + leMedecin.departement;
    }
    modifierRapport(): void {
        this.gestionAjoutRapport = false;
        this.gestionMajRapport = true;
    }
    chargerVisites(): void {
        this.afficherRapport = false;
        this.dataService.chargerRapportsAuneDate(this.dateVisite)
            .subscribe(
                (data) => {
                    this.lesRapports = data['rapports'];
                    this.dataService.ticket = data['ticket'];
                },
                (error) => {}
            );
    }
    selectionner(rapport) {
        this.leRapport = rapport;
        this.afficherRapport = true;
        this.afficherRapportMAJ = false;
    }
    valider(): void {
        this.afficherRapportMAJ = true;
        this.dataService.majRapport(this.leRapport.idRapport, this.leRapport.motif, this.leRapport.bilan)
            .subscribe(
                (data) => {
                    this.messageMAJ = "Mise à jour effectué";
                    this.dataService.ticket = data;  
                    this.classMaj = "success";
                },
                (error) => {
                    this.messageMAJ = "Mise à jour non effectué"
                    this.classMaj = "danger"
                }
            );
    }
    initNouveauRapport() {
        this.nomMedecin = this.motif = this.bilan = "";
        this.lesMedicamentsSelectionner = new Array();
        this.dateNouveauRapport = new Date();
        this.medecin = null;
    }
    ajouterRapport(): void {
        this.initNouveauRapport();
        this.gestionAjoutRapport = true;
        this.gestionMajRapport = false;
    }
    chargerMedicaments() {
        if (this.nomMedicament != "") {
            this.printLesMedicaments = true;
            this.dataService.chargerMedicaments(this.nomMedicament)
                .subscribe(
                    (data) => {
                        this.lesMedicaments = data['medicaments'];
                        this.dataService.ticket = data['ticket'];
                    },
                    (error) => {}
                );
        } else {
            this.printLesMedicaments = false;
        }
    }
    choisirMedicament(medicament: any) {
        if (this.qteSelect == null) {
            this.qteSelect = 1;
        }
        this.lesMedicamentsSelectionner.push({
            id: medicament.id, nom:
                medicament.nomCommercial, qte: this.qteSelect
        });
        this.nomMedicament = "";
        this.printLesMedicaments = false;
    }

    retirer(medicament: any): void {
        this.lesMedicamentsSelectionner.splice(medicament, 1);
    }

    enregistrer(): void {
        this.dataService.enregistrerRapport(this.medecin.id, this.motif, this.dateNouveauRapport, this.bilan, this.lesMedicamentsSelectionner)
            .subscribe(
                (data) => {
                    this.messageMAJ = "Enregistrement effectué";
                    this.classMaj = "success";
                    this.dataService.ticket = data;
                    this.initNouveauRapport();
                },
                (error) => {
                    this.messageMAJ = "Enregistrement non effectué"
                    this.classMaj = "danger"
                }
            );
    }

}