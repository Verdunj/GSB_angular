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
var app_service_data_1 = require("../service/app.service.data");
var MedecinsComponent = /** @class */ (function () {
    function MedecinsComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.titre = "Gestion des medecins";
        this.hide_menu = true;
        this.hide_list = true;
        this.hide_modif = true;
        this.afficherRapports = false;
        this.afficherMedecin = false;
        this.afficherMessage = false;
    }
    MedecinsComponent.prototype.charger = function () {
        var _this = this;
        this.hide_menu = true;
        this.afficherRapports = false;
        this.afficherMedecin = false;
        this.afficherMessage = false;
        if (this.nomMedecin != "") {
            this.dataService.chargerMedecins(this.nomMedecin)
                .subscribe(function (data) {
                _this.hide_list = false;
                _this.lesMedecins = data['medecins'];
                _this.dataService.ticket = data['ticket'];
            }, function (error) {
                //                        this.router.navigate(['']);
            });
        }
        else {
            this.hide_list = true;
        }
    };
    MedecinsComponent.prototype.selectionner = function (medecin) {
        this.hide_list = true;
        this.hide_menu = false;
        this.nomMedecin = medecin.nom + " " + medecin.prenom + " / département : " + medecin.departement;
        this.myMedecin = medecin;
    };
    MedecinsComponent.prototype.derniersRapports = function () {
        var _this = this;
        this.afficherMedecin = false;
        this.afficherMessage = false;
        this.dataService.chargerRapports(this.myMedecin.id)
            .subscribe(function (data) {
            _this.afficherRapports = true;
            _this.lesRapports = data['rapports'];
            _this.dataService.ticket = data['ticket'];
        }, function (error) {
            //                    this.router.navigate(['']);
        });
    };
    MedecinsComponent.prototype.valider = function () {
        var _this = this;
        this.afficherMessage = true;
        this.dataService.majMedecin(this.myMedecin.id, this.myMedecin.adresse, this.myMedecin.tel, this.myMedecin.specialitecomplementaire)
            .subscribe(function (data) {
            _this.dataService.ticket = data;
            _this.message = "Enregistrement effectué";
            _this.class_response = "success";
        }, function (error) {
            _this.message = "Enregistrement non effectué";
            _this.class_response = "danger";
        });
    };
    MedecinsComponent.prototype.majMedecin = function () {
        this.afficherRapports = false;
        this.afficherMedecin = true;
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