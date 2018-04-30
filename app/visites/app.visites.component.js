"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_data_1 = require("../service/app.service.data");
var VisitesComponent = /** @class */ (function () {
    // compléter en ajoutant les champs présent dans le fichier HTML
    function VisitesComponent(dataService) {
        this.dataService = dataService;
        this.lesMedicamentsSelectionner = new Array();
        this.qteSelect = 1;
        this.messageMAJ = "";
        this.classMaj = "";
        this.gestionMajRapport = false;
        this.gestionAjoutRapport = false;
        this.afficherRapport = false;
        this.afficherRapportMAJ = false;
        this.printLesMedecins = false;
        this.printLesMedicaments = false;
    }
    VisitesComponent.prototype.chargerMedecins = function () {
        var _this = this;
        if (this.nomMedecin != "") {
            this.printLesMedecins = true;
            this.dataService.chargerMedecins(this.nomMedecin)
                .subscribe(function (data) {
                _this.lesMedecins = data['medecins'];
                _this.dataService.ticket = data['ticket'];
            }, function (error) { });
        }
        else {
            this.printLesMedecins = false;
        }
    };
    VisitesComponent.prototype.selectionnerMedecin = function (leMedecin) {
        this.classMaj = this.messageMAJ = "";
        this.medecin = leMedecin;
        this.printLesMedecins = false;
        this.nomMedecin = leMedecin.nom + " " + leMedecin.prenom + " / département : " + leMedecin.departement;
    };
    VisitesComponent.prototype.modifierRapport = function () {
        this.gestionAjoutRapport = false;
        this.gestionMajRapport = true;
    };
    VisitesComponent.prototype.chargerVisites = function () {
        var _this = this;
        this.afficherRapport = false;
        this.dataService.chargerRapportsAuneDate(this.dateVisite)
            .subscribe(function (data) {
            _this.lesRapports = data['rapports'];
            _this.dataService.ticket = data['ticket'];
        }, function (error) { });
    };
    VisitesComponent.prototype.selectionner = function (rapport) {
        this.leRapport = rapport;
        this.afficherRapport = true;
        this.afficherRapportMAJ = false;
    };
    VisitesComponent.prototype.valider = function () {
        var _this = this;
        this.afficherRapportMAJ = true;
        this.dataService.majRapport(this.leRapport.idRapport, this.leRapport.motif, this.leRapport.bilan)
            .subscribe(function (data) {
            _this.messageMAJ = "Mise à jour effectué";
            _this.dataService.ticket = data;
            _this.classMaj = "success";
        }, function (error) {
            _this.messageMAJ = "Mise à jour non effectué";
            _this.classMaj = "danger";
        });
    };
    VisitesComponent.prototype.initNouveauRapport = function () {
        this.nomMedecin = this.motif = this.bilan = "";
        this.lesMedicamentsSelectionner = new Array();
        this.dateNouveauRapport = new Date();
        this.medecin = null;
    };
    VisitesComponent.prototype.ajouterRapport = function () {
        this.initNouveauRapport();
        this.gestionAjoutRapport = true;
        this.gestionMajRapport = false;
    };
    VisitesComponent.prototype.chargerMedicaments = function () {
        var _this = this;
        if (this.nomMedicament != "") {
            this.printLesMedicaments = true;
            this.dataService.chargerMedicaments(this.nomMedicament)
                .subscribe(function (data) {
                _this.lesMedicaments = data['medicaments'];
                _this.dataService.ticket = data['ticket'];
            }, function (error) { });
        }
        else {
            this.printLesMedicaments = false;
        }
    };
    VisitesComponent.prototype.choisirMedicament = function (medicament) {
        if (this.qteSelect == null) {
            this.qteSelect = 1;
        }
        this.lesMedicamentsSelectionner.push({
            id: medicament.id, nom: medicament.nomCommercial, qte: this.qteSelect
        });
        this.nomMedicament = "";
        this.printLesMedicaments = false;
    };
    VisitesComponent.prototype.retirer = function (medicament) {
        this.lesMedicamentsSelectionner.splice(medicament, 1);
    };
    VisitesComponent.prototype.enregistrer = function () {
        var _this = this;
        this.dataService.enregistrerRapport(this.medecin.id, this.motif, this.dateNouveauRapport, this.bilan, this.lesMedicamentsSelectionner)
            .subscribe(function (data) {
            _this.messageMAJ = "Enregistrement effectué";
            _this.classMaj = "success";
            _this.dataService.ticket = data;
            _this.initNouveauRapport();
        }, function (error) {
            _this.messageMAJ = "Enregistrement non effectué";
            _this.classMaj = "danger";
        });
    };
    VisitesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-visites',
            templateUrl: 'app.visites.html'
        }),
        __metadata("design:paramtypes", [app_service_data_1.DataService])
    ], VisitesComponent);
    return VisitesComponent;
}());
exports.VisitesComponent = VisitesComponent;
//# sourceMappingURL=app.visites.component.js.map