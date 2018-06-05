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
var router_1 = require("@angular/router");
var app_service_data_1 = require("../services/app.service.data");
var MedecinsComponent = /** @class */ (function () {
    function MedecinsComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.legende = "Rechercher le médecin";
        this.estCacheMenu = true;
        this.afficherRapports = false;
        this.afficherMedecin = false;
        this.afficherMessage = false;
        this.lblMessage = "";
    }
    MedecinsComponent.prototype.charger = function () {
        var _this = this;
        this.dataService.chargerMedecins(this.nomMedecin)
            .subscribe(function (data) {
            _this.lesMedecins = data['medecins'];
            _this.dataService.ticket = data['ticket'];
        }, function (error) { _this.router.navigate(['']); });
    };
    MedecinsComponent.prototype.selectionner = function (med) {
        this.medecin = med;
        this.afficherRapports = false;
        this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
        this.lesMedecins = null;
        this.legende = "";
        this.estCacheMenu = false;
    };
    MedecinsComponent.prototype.derniersRapports = function () {
        var _this = this;
        this.afficherRapports = true;
        this.afficherMedecin = false;
        this.dataService.chargerRapports(this.medecin.id)
            .subscribe(function (data) {
            _this.lesRapports = data['rapports'];
            _this.nomMedecin = "";
            _this.dataService.ticket = data['ticket'];
        }, function (error) { _this.router.navigate(['']); });
    };
    MedecinsComponent.prototype.majMedecin = function () {
        this.afficherRapports = false;
        this.afficherMedecin = true;
        this.afficherMessage = false;
    };
    MedecinsComponent.prototype.valider = function () {
        var _this = this;
        this.afficherMessage = true;
        this.dataService.majMedecin(this.medecin.id, this.medecin.adresse, this.medecin.tel, this.medecin.specialitecomplementaire)
            .subscribe(function (data) {
            _this.lblMessage = "Enregistrement effectué";
            _this.dataService.ticket = data;
        }, function (error) { _this.router.navigate(['']); });
    };
    MedecinsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-medecins',
            templateUrl: 'app.medecins.html'
        }),
        __metadata("design:paramtypes", [app_service_data_1.DataService, router_1.Router])
    ], MedecinsComponent);
    return MedecinsComponent;
}());
exports.MedecinsComponent = MedecinsComponent;
//# sourceMappingURL=app.medecins.component.js.map